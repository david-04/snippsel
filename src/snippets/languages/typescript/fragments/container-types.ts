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

export const arrayOf = oneOf(
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

export const readonlyArrayOf = oneOf(
    fragment({
        id: "readonly-array-[of]",
        languages: LANGUAGES.ts.tsx,
        shortcuts: ["ra", "roa", "rao", "roao"],
        voiceCommands: ["readonly array", "readonly array of"],
        body: body.line("ReadonlyArray<", VARIABLE(10), ">"),
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

//----------------------------------------------------------------------------------------------------------------------
// Sets
//----------------------------------------------------------------------------------------------------------------------

export const set = { id: "set", shortcuts: "s", voiceCommands: "set" } as const;

export const setOf = oneOf(
    fragment({
        id: "set-[of]",
        languages: LANGUAGES.ts.tsx,
        shortcuts: ["s", "so"],
        voiceCommands: ["set", "set of"],
        body: body.line("Set<", VARIABLE(10), ">"),
    }),
    ...scalarDataTypes
        .filter(type => type.id !== "boolean")
        .map(type =>
            fragment({
                id: `set-[of]-${type.id}`,
                languages: LANGUAGES.ts.tsx,
                shortcuts: ["s", "so"].map(shortcut => `${shortcut}${type.shortcut}`),
                voiceCommands: ["set", "set of"].map(voiceCommand => `${voiceCommand} ${type.voiceCommand}`),
                body: body.line(`Set<${type.body}>`),
            })
        )
);

export const readonlySetOf = oneOf(
    fragment({
        id: "readonly-set-[of]",
        languages: LANGUAGES.ts.tsx,
        shortcuts: ["rs", "ros", "rso", "roso"],
        voiceCommands: ["readonly set", "readonly set of"],
        body: body.line("ReadonlySet<", VARIABLE(10), ">"),
    }),
    ...scalarDataTypes.map(type =>
        fragment({
            id: `readonly-set-[of]-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: ["rs", "ros", "rso", "roso"].map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: ["set", "set of"].map(voiceCommand => `readonly ${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`ReadonlySet<${type.body}>`),
        })
    )
);
