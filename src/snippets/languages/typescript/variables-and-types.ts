import { LANGUAGES } from "../../../compiler/data/language.js";
import { VARIABLE, placeholder } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { explicitOrImplied, fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { as, colon, is } from "./fragments/conjunctions.js";
import { _satisfies, asConst, asConstSatisfies } from "./fragments/inference-hints.js";
import { _export } from "./fragments/modifiers.js";
import {
    arrowFunctionAndContainerValues,
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

//---------------------------------------------------------------------------------------------------------------------
// [export] type _<_> = _
//----------------------------------------------------------------------------------------------------------------------

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
// [variable|property _] [: _] [= _]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    oneOf(
        sequence(variableDeclaration, optional(sequence(colon, placeholder())), explicitOrImplied(is), placeholder()),
        sequence(propertyDeclaration, optional(sequence(colon, placeholder())), optional(sequence(is, placeholder())))
    ),
    [
        { removeLeadingPlaceholder: true },
        { removeShortcut: "a" }, //         "array" wins over "as"
        { removeShortcut: "i" }, //         "if" wins over "is"
        { removeShortcut: "ip" }, //        "interpolation" wins over "private-property"
        { removeShortcut: "p" }, //         "print" wins over "property"
        { removeShortcut: "pi" }, //        "print-interpolated" wins over "property-is"
        { removeShortcut: "s" }, //         "string" wins over "static"
        { removeShortcut: "ia" }, //        "is-array" wins over "private-as"
        { removeShortcut: "ra" }, //        "readonly-array" wins over "readonly-as"
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [variable|property _] : type [= _]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequence(variableOrPropertyDeclaration, colon, oneOf(...types), optional(sequence(is, placeholder()))),
    [
        { removeLeadingPlaceholder: true },
        { removeShortcut: "iaae" }, //      "is-async-arrow-expression" wins over "private-as-arrow-expression"
        { removeShortcut: "iaaf" }, //      "is-async-arrow-function" wins over "private-as-arrow-function"
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [variable|property _] : type = value
//----------------------------------------------------------------------------------------------------------------------

for (const [type, value] of scalarAndContainerTypesAndValues) {
    snippetRepository.add(sequence(variableOrPropertyDeclaration, colon, type, is, value), [
        { removeLeadingPlaceholder: true },
    ]);
}

//----------------------------------------------------------------------------------------------------------------------
// [variable|property _] [: _] = value
//----------------------------------------------------------------------------------------------------------------------

for (const value of values) {
    snippetRepository.add(
        sequence(variableOrPropertyDeclaration, optional(sequence(colon, placeholder())), is, value),
        [
            { removeLeadingPlaceholder: true },
            { removeShortcut: "it" }, //        "it" wins over "is-true"
            { removeShortcut: "if" }, //        "if" wins over "is-false"
            { removeShortcut: "is" }, //        "private-static" wins over "is-string"
            { removeShortcut: "pis" }, //       "print-interpolated-string" wins over "property-is-string"
        ]
    );
}

//----------------------------------------------------------------------------------------------------------------------
// [variable|property _] = value as type
//----------------------------------------------------------------------------------------------------------------------

for (const [type, value] of scalarAndContainerTypesAndValues) {
    snippetRepository.add(sequence(variableOrPropertyDeclaration, is, value, as, type), [
        { removeLeadingPlaceholder: true },
        { removeShortcut: "isas" }, //          "private-static-as-string" wins over "is-string-as-string"
    ]);
}

//----------------------------------------------------------------------------------------------------------------------
// value
//----------------------------------------------------------------------------------------------------------------------

for (const value of arrowFunctionAndContainerValues) {
    snippetRepository.add(value, [
        { removeLeadingPlaceholder: true },
        { ifId: "empty-array", removeShortcut: "a" }, // "array" and "empty-array" have the same shortcut
        { removeShortcut: "aae" }, //           "async-arrow-expression" wins over "as-arrow-expression"
        { removeShortcut: "aaf" }, //           "async-arrow-function" wins over "as-arrow-function"
    ]);
}

//----------------------------------------------------------------------------------------------------------------------
// [as const] [satisfies _]
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(oneOf(asConst, asConstSatisfies, _satisfies));
