import { LANGUAGES } from "../../../compiler/data/language.js";
import { VARIABLE, placeholderFragment } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequenceAll } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { as, colon, is, isNoShortcut } from "./fragments/conjunctions.js";
import { _export } from "./fragments/modifiers.js";
import {
    scalarAndContainerTypes,
    scalarAndContainerTypesAndValues,
    types,
    values,
} from "./fragments/types-and-values.js";
import {
    propertyDeclaration,
    variableDeclaration,
    variableOrPropertyDeclaration,
} from "./fragments/variable-parameter-property.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] type _ = _
// [export] type _<_> = _
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        optional(_export),
        oneOf(
            fragment({
                languages: LANGUAGES.ts.tsx,
                id: "type",
                shortcuts: "t",
                voiceCommands: "type",
                body: body.line("type ", VARIABLE(1)),
            }),
            fragment({
                languages: LANGUAGES.ts.tsx,
                id: "type<T>",
                shortcuts: ["gt", "gto", "gtot", "to", "tot"],
                voiceCommands: ["generic type", "type of", "type of T", "generic type of T"],
                body: body.line("type ", VARIABLE(1), "<", VARIABLE(2, "T"), ">"),
            })
        ),
        oneOf(is, isNoShortcut),
        placeholderFragment()
    )
);

//----------------------------------------------------------------------------------------------------------------------
// variable _ [: _] = _
// property _ [: _] [= _]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        variableDeclaration,
        optional(sequenceAll(colon, placeholderFragment())),
        oneOf(is, isNoShortcut),
        placeholderFragment()
    )
);

snippetRepository.add(
    sequenceAll(
        propertyDeclaration,
        optional(sequenceAll(colon, placeholderFragment())),
        optional(sequenceAll(is, placeholderFragment()))
    ),
    [
        { ifId: "parameter|property", discardSnippet: true },
        { removeShortcut: "p" }, // conflicts with print
        { removeShortcut: "ip" }, // conflicts with interpolation
        { removeShortcut: "pi" }, // conflicts with print-interpolated
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// variable|property _ : type [=]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        variableOrPropertyDeclaration,
        colon,
        oneOf(...types),
        optional(sequenceAll(is, placeholderFragment()))
    ),
    [
        { removeShortcut: "ps" }, // conflicts with print-string
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// variable|property : type = value
//----------------------------------------------------------------------------------------------------------------------

for (const [type, value] of scalarAndContainerTypesAndValues) {
    snippetRepository.add(sequenceAll(variableOrPropertyDeclaration, colon, type, is, value));
}

//----------------------------------------------------------------------------------------------------------------------
// variable|property [:] = value
//----------------------------------------------------------------------------------------------------------------------

for (const value of values) {
    snippetRepository.add(
        sequenceAll(variableOrPropertyDeclaration, optional(sequenceAll(colon, placeholderFragment())), is, value),
        [
            { removeShortcut: "pis" }, // conflicts with print-interpolated-string
        ]
    );
}

//----------------------------------------------------------------------------------------------------------------------
// variable|property = value as type
//----------------------------------------------------------------------------------------------------------------------

for (const [type, value] of scalarAndContainerTypesAndValues) {
    snippetRepository.add(sequenceAll(variableOrPropertyDeclaration, is, value, as, type));
}

//----------------------------------------------------------------------------------------------------------------------
// [:] type [=]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    oneOf(
        // type
        oneOf(...scalarAndContainerTypes),
        // : type
        sequenceAll(colon, oneOf(...types)),
        // type =
        sequenceAll(oneOf(...types), is),
        // : type =
        sequenceAll(colon, oneOf(...types), is)
    ),
    [
        { removeShortcut: "aae" }, // conflicts with async-arrow-expression
        { removeShortcut: "aaf" }, // conflicts with async-arrow-function
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [:] type = value
//----------------------------------------------------------------------------------------------------------------------

for (const [type, value] of scalarAndContainerTypesAndValues) {
    snippetRepository.add(sequenceAll(optional(colon), type, is, value));
}

//----------------------------------------------------------------------------------------------------------------------
// [=] value
//----------------------------------------------------------------------------------------------------------------------

for (const value of values) {
    snippetRepository.add(sequenceAll(optional(is), value), [
        { removeShortcut: "a" }, // conflicts with array
        { removeShortcut: "if" }, // conflicts with interface
        { removeShortcut: "it" }, // conflicts with it (test case)
        { removeShortcut: "t" }, // conflicts with type
        { removeShortcut: "s", removeVoiceCommand: "string" }, // conflicts with string (type vs literal)
    ]);
}

//----------------------------------------------------------------------------------------------------------------------
// [=] value as type
//----------------------------------------------------------------------------------------------------------------------

for (const [type, value] of scalarAndContainerTypesAndValues) {
    snippetRepository.add(sequenceAll(optional(is), value, as, type));
}

//----------------------------------------------------------------------------------------------------------------------
// = _ as type
//----------------------------------------------------------------------------------------------------------------------

for (const type of types) {
    snippetRepository.add(sequenceAll(is, placeholderFragment(), as, type), [
        { removeShortcut: ["=aae", "iaae"] }, // conflicts with =-async-arrow-expression
        { removeShortcut: ["=aaf", "iaaf"] }, // conflicts with =-async-arrow-function
    ]);
}
