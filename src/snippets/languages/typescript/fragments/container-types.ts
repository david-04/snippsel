import { LANGUAGES } from "../../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf } from "../../../../compiler/data/snippet-fragment.js";
import { scalarDataTypes } from "./scalar-data-types.js";

//----------------------------------------------------------------------------------------------------------------------
// Utilities
//----------------------------------------------------------------------------------------------------------------------

export const brackets = fragment({
    id: "",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    leadingSeparator: "",
    body: body.line("(", CURSOR, SELECTED_TEXT, ")"),
});

//----------------------------------------------------------------------------------------------------------------------
// Arrays
//----------------------------------------------------------------------------------------------------------------------

export const array = { id: "array", shortcuts: "a", voiceCommands: "array" } as const;

export const arrayOfType = oneOf(
    fragment({
        id: "array-[of]",
        languages: LANGUAGES.ts.tsx,
        shortcuts: ["a", "ao"],
        voiceCommands: ["array", "array of"],
        body: body.line("Array<", VARIABLE(10), ">"),
    }),
    ...scalarDataTypes.map(type =>
        fragment({
            id: `array-[of]-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: ["a", "ao"].map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: ["array", "array of"].map(voiceCommand => `${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`Array<${type.body}>`),
        })
    )
);

export const readonlyArrayOfType = oneOf(
    fragment({
        id: "readonly-array-[of]",
        languages: LANGUAGES.ts.tsx,
        shortcuts: ["ra", "roa", "rao", "roao"],
        voiceCommands: ["readonly array", "readonly array of"],
        body: body.line("Array<", VARIABLE(10), ">"),
    }),
    ...scalarDataTypes.map(type =>
        fragment({
            id: `readonly-array-[of]-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: ["ra", "roa", "rao", "roao"].map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: ["array", "array of"].map(voiceCommand => `readonly ${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`ReadonlyArray<${type.body}>`),
        })
    )
);
