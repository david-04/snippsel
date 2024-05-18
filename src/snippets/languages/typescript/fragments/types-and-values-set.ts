import { LANGUAGES } from "../../../../compiler/data/language.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf, sequenceAll } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";
import { brackets, typeAnnotation } from "./conjunctions.js";
import { typePlaceholder } from "./placeholders.js";
import { scalarTypes } from "./types-and-values-scalar.js";

//----------------------------------------------------------------------------------------------------------------------
// Fragments
//----------------------------------------------------------------------------------------------------------------------

const set = fragment({ ...FRAGMENT_ID.set, languages: LANGUAGES.js.jsx.ts.tsx, body: body.line("Set") });

const readonlySet = fragment({
    ...FRAGMENT_ID.readonlySet,
    languages: LANGUAGES.ts.tsx,
    body: body.line("ReadonlySet"),
});

const newSet = fragment({
    id: "new-set",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "ns",
    voiceCommands: "new set",
    body: body.line("new Set"),
});

//----------------------------------------------------------------------------------------------------------------------
// Set types
//----------------------------------------------------------------------------------------------------------------------

export const setTypes = [
    // Set<_>
    sequenceAll(set, typeAnnotation["<"], typePlaceholder, typeAnnotation[">"]),
    // ReadonlySet<_>
    sequenceAll(
        readonlySet,
        oneOf(typeAnnotation["<"], typeAnnotation["< (no shortcut)"]),
        typePlaceholder.withoutLeadingSeparator(),
        typeAnnotation[">"]
    ),
    // Set<boolean|number|string>
    ...scalarTypes.map(type =>
        sequenceAll(set, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"])
    ),
    // ReadonlySet<boolean|number|string>
    ...scalarTypes.map(type =>
        sequenceAll(readonlySet, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"])
    ),
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Set values
//----------------------------------------------------------------------------------------------------------------------

export const setValues = [
    // new Set<_>()
    sequenceAll(
        newSet,
        oneOf(typeAnnotation["<"], typeAnnotation["< (no shortcut)"]),
        typePlaceholder.withoutLeadingSeparator(),
        typeAnnotation[">"],
        brackets
    ),
    // new Set<boolean|number|string>()
    ...scalarTypes.map(type =>
        sequenceAll(newSet, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"], brackets)
    ),
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Set type-value pairs
//----------------------------------------------------------------------------------------------------------------------

export const setTypesAndValues = [
    [
        oneOf(...setTypes),
        // new Set()
        sequenceAll(newSet, brackets),
    ],
    [
        // ReadonlySet<_>
        sequenceAll(readonlySet, typeAnnotation["<"], typePlaceholder.withoutLeadingSeparator(), typeAnnotation[">"]),
        // new Set<_>()
        sequenceAll(
            newSet,
            typeAnnotation["<"],
            typePlaceholder.withoutLeadingSeparator(),
            typeAnnotation[">"],
            brackets
        ),
    ],
    ...scalarTypes.map(
        type =>
            [
                // ReadonlySet<boolean|number|string>
                sequenceAll(readonlySet, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"]),
                // new Set<boolean|number|string>()
                sequenceAll(newSet, typeAnnotation["<"], type.withoutLeadingSeparator(), typeAnnotation[">"], brackets),
            ] as const
    ),
] as const;
