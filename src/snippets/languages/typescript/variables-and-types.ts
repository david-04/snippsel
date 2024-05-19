import { LANGUAGES } from "../../../compiler/data/language.js";
import { VARIABLE, placeholder } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { explicitOrImplied, fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { colon, is } from "./fragments/conjunctions.js";
import { _export } from "./fragments/modifiers.js";
import { propertyDeclaration, variableDeclaration } from "./fragments/variable-parameter-property.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] type _ = _
// [export] type _<_> = _
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequence(
        optional(_export),
        fragment({
            languages: LANGUAGES.ts.tsx,
            id: "type",
            shortcuts: "t",
            voiceCommands: "type",
            body: body.line("type ", VARIABLE(1)),
        }),
        explicitOrImplied(is),
        placeholder()
    )
);

snippetRepository.add(
    sequence(
        optional(_export),
        fragment({
            languages: LANGUAGES.ts.tsx,
            id: "generic-type",
            shortcuts: "gt",
            voiceCommands: "generic type",
            body: body.line("type ", VARIABLE(1), "<", VARIABLE(2, "T"), ">"),
            aliases: [
                { id: "generic-type-of", shortcuts: "gto", voiceCommands: "generic type of" },
                { id: "type-of", shortcuts: "to", voiceCommands: "type of" },
            ],
        }),
        explicitOrImplied(is),
        placeholder()
    )
);

//----------------------------------------------------------------------------------------------------------------------
// variable _ [: _] = _
// property _ [: _] [= _]
//          _ [: _] [= _]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    oneOf(
        sequence(variableDeclaration, optional(sequence(colon, placeholder())), explicitOrImplied(is), placeholder()),
        sequence(propertyDeclaration, optional(sequence(colon, placeholder())), optional(sequence(is, placeholder())))
    ),
    [
        { removeShortcut: "a" }, //     conflicts with array
        { removeShortcut: "i" }, //     conflicts with if
        { removeShortcut: "ip" }, //    conflicts with interpolation
        { removeShortcut: "p" }, //     conflicts with print
        { removeShortcut: "pi" }, //    conflicts with print-interpolated
    ]
);

// //----------------------------------------------------------------------------------------------------------------------
// // variable|property _ : type [=]
// //----------------------------------------------------------------------------------------------------------------------

// snippetRepository.add(
//     sequence(variableOrPropertyDeclaration, colon, oneOf(...types), optional(sequence(is, placeholder()))),
//     [
//         { removeShortcut: "ps" }, // conflicts with print-string
//     ]
// );

// //----------------------------------------------------------------------------------------------------------------------
// // variable|property : type = value
// //----------------------------------------------------------------------------------------------------------------------

// for (const [type, value] of scalarAndContainerTypesAndValues) {
//     snippetRepository.add(sequence(variableOrPropertyDeclaration, colon, type, is, value));
// }

// //----------------------------------------------------------------------------------------------------------------------
// // variable|property [: _] = value
// //----------------------------------------------------------------------------------------------------------------------

// for (const value of values) {
//     snippetRepository.add(
//         sequence(variableOrPropertyDeclaration, optional(sequence(colon, placeholder())), is, value),
//         [
//             { removeShortcut: "pis" }, // conflicts with print-interpolated-string
//         ]
//     );
// }

// //----------------------------------------------------------------------------------------------------------------------
// // variable|property = value as type
// //----------------------------------------------------------------------------------------------------------------------

// for (const [type, value] of scalarAndContainerTypesAndValues) {
//     snippetRepository.add(sequence(variableOrPropertyDeclaration, is, value, as, type));
// }

// //----------------------------------------------------------------------------------------------------------------------
// // [:] type [=]
// //----------------------------------------------------------------------------------------------------------------------

// snippetRepository.add(
//     oneOf(
//         // type
//         oneOf(...scalarAndContainerTypes),
//         // : type
//         sequence(colon, oneOf(...types)),
//         // type =
//         sequence(oneOf(...types), is),
//         // : type =
//         sequence(colon, oneOf(...types), is)
//     ),
//     [
//         { removeShortcut: "aae" }, // conflicts with async-arrow-expression
//         { removeShortcut: "aaf" }, // conflicts with async-arrow-function
//     ]
// );

// //----------------------------------------------------------------------------------------------------------------------
// // [:] type = value
// //----------------------------------------------------------------------------------------------------------------------

// for (const [type, value] of scalarAndContainerTypesAndValues) {
//     snippetRepository.add(sequence(optional(colon), type, is, value));
// }

// //----------------------------------------------------------------------------------------------------------------------
// // [=] value
// //----------------------------------------------------------------------------------------------------------------------

// for (const value of values) {
//     snippetRepository.add(sequence(optional(is), value), [
//         { removeShortcut: "a" }, // conflicts with array
//         { removeShortcut: "if" }, // conflicts with interface
//         { removeShortcut: "it" }, // conflicts with it (test case)
//         { removeShortcut: "t" }, // conflicts with type
//         { removeShortcut: "s", removeVoiceCommand: "string" }, // conflicts with string (type vs literal)
//     ]);
// }

// //----------------------------------------------------------------------------------------------------------------------
// // [=] value as type
// //----------------------------------------------------------------------------------------------------------------------

// for (const [type, value] of scalarAndContainerTypesAndValues) {
//     snippetRepository.add(sequence(optional(is), value, as, type));
// }

// //----------------------------------------------------------------------------------------------------------------------
// // = _ as type
// //----------------------------------------------------------------------------------------------------------------------

// for (const type of types) {
//     snippetRepository.add(sequence(is, placeholder(), as, type), [
//         { removeShortcut: ["=aae", "iaae"] }, // conflicts with =-async-arrow-expression
//         { removeShortcut: ["=aaf", "iaaf"] }, // conflicts with =-async-arrow-function
//     ]);
// }
