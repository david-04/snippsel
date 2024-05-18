import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf, sequenceAll } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";
import { as, brackets, typeAnnotation } from "./conjunctions.js";
import { _const } from "./modifiers.js";
import { typePlaceholder } from "./placeholders.js";
import { scalarTypes } from "./types-and-values-scalar.js";

//----------------------------------------------------------------------------------------------------------------------
// Fragments
//----------------------------------------------------------------------------------------------------------------------

const array = fragment({ ...FRAGMENT_ID.array, languages: LANGUAGES.js.jsx.ts.tsx, body: body.line("Array") });
const readonlyArray = fragment({
    ...FRAGMENT_ID.readonlyArray,
    languages: LANGUAGES.ts.tsx,
    body: body.line("ReadonlyArray"),
});
const newArray = fragment({
    id: "new-array",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "na",
    voiceCommands: "new array",
    body: body.line("new Array"),
});

const emptyArray = fragment({
    id: "empty-array",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: ["a", "ea"],
    voiceCommands: "empty array",
    body: body.line("[", VARIABLE(1), "]"),
});

//----------------------------------------------------------------------------------------------------------------------
// Array types
//----------------------------------------------------------------------------------------------------------------------

export const arrayTypes = [
    // Array<_>
    sequenceAll(array, typeAnnotation["<"], typePlaceholder.withoutLeadingSeparator(), typeAnnotation[">"]),
    // ReadonlyArray<_>
    sequenceAll(
        readonlyArray,
        oneOf(typeAnnotation["<"], typeAnnotation["< (no shortcut)"]),
        typePlaceholder.withoutLeadingSeparator(),
        typeAnnotation[">"]
    ),
    // Array<boolean|number|string>
    ...scalarTypes.map(type =>
        sequenceAll(array, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"])
    ),
    // ReadonlyArray<boolean|number|string>
    ...scalarTypes.map(type =>
        sequenceAll(readonlyArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"])
    ),
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Array values
//----------------------------------------------------------------------------------------------------------------------

export const arrayValues = [
    // []
    emptyArray,
    // [] as const
    sequenceAll(emptyArray, as, _const),
    // new Array<_>()
    sequenceAll(
        newArray,
        oneOf(typeAnnotation["<"], typeAnnotation["< (no shortcut)"]),
        typePlaceholder.withoutLeadingSeparator(),
        typeAnnotation[">"],
        brackets
    ),
    // new Array<boolean|number|string>()
    ...scalarTypes.map(type =>
        sequenceAll(newArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"], brackets)
    ),
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Array type-value pairs
//----------------------------------------------------------------------------------------------------------------------

export const arrayTypesAndValues = [
    [
        oneOf(...arrayTypes),
        oneOf(
            // []
            emptyArray,
            // new Array()
            sequenceAll(newArray, brackets)
        ),
    ],
    [
        // ReadonlyArray<_>
        sequenceAll(readonlyArray, typeAnnotation["<"], typePlaceholder, typeAnnotation[">"]),
        // new Array<_>()
        sequenceAll(newArray, typeAnnotation["<"], typePlaceholder, typeAnnotation[">"], brackets),
    ],
    ...scalarTypes.map(
        type =>
            [
                // ReadonlyArray<boolean|number|string>
                sequenceAll(readonlyArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"]),
                // new Array<boolean|number|string>()
                sequenceAll(
                    newArray,
                    typeAnnotation["<"],
                    type.withoutLeadingSeparator(),
                    typeAnnotation[">"],
                    brackets
                ),
            ] as const
    ),
] as const;
