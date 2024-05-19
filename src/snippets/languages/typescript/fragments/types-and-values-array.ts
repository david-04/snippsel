import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf, sequence } from "../../../../compiler/data/snippet-fragment.js";
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
    sequence(array, typeAnnotation["<"], typePlaceholder.withoutLeadingSeparator(), typeAnnotation[">"]),
    // ReadonlyArray<_>
    sequence(
        readonlyArray,
        oneOf(typeAnnotation["<"], typeAnnotation["< (no shortcut)"]),
        typePlaceholder.withoutLeadingSeparator(),
        typeAnnotation[">"]
    ),
    // Array<boolean|number|string>
    ...scalarTypes.map(type =>
        sequence(array, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"])
    ),
    // ReadonlyArray<boolean|number|string>
    ...scalarTypes.map(type =>
        sequence(readonlyArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"])
    ),
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Array values
//----------------------------------------------------------------------------------------------------------------------

export const arrayValues = [
    // []
    emptyArray,
    // [] as const
    sequence(emptyArray, as, _const),
    // new Array<_>()
    sequence(
        newArray,
        oneOf(typeAnnotation["<"], typeAnnotation["< (no shortcut)"]),
        typePlaceholder.withoutLeadingSeparator(),
        typeAnnotation[">"],
        brackets
    ),
    // new Array<boolean|number|string>()
    ...scalarTypes.map(type =>
        sequence(newArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"], brackets)
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
            sequence(newArray, brackets)
        ),
    ],
    [
        // ReadonlyArray<_>
        sequence(readonlyArray, typeAnnotation["<"], typePlaceholder, typeAnnotation[">"]),
        // new Array<_>()
        sequence(newArray, typeAnnotation["<"], typePlaceholder, typeAnnotation[">"], brackets),
    ],
    ...scalarTypes.map(
        type =>
            [
                // ReadonlyArray<boolean|number|string>
                sequence(readonlyArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"]),
                // new Array<boolean|number|string>()
                sequence(newArray, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"], brackets),
            ] as const
    ),
] as const;
