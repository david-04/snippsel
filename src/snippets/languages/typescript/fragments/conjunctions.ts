import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// |
//----------------------------------------------------------------------------------------------------------------------

export const or = fragment({ ...FRAGMENT_ID.or, languages: LANGUAGES.ts.tsx, body: body.line("|") });

//----------------------------------------------------------------------------------------------------------------------
// :
//----------------------------------------------------------------------------------------------------------------------

export const colon = fragment({
    id: "colon",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: [":", "a"],
    voiceCommands: "as",
    body: body.line(":"),
});

//----------------------------------------------------------------------------------------------------------------------
// =
//----------------------------------------------------------------------------------------------------------------------

export const is = fragment({
    id: "is",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: ["=", "i"],
    voiceCommands: "is",
    body: body.line("="),
});

export const isNoShortcut = fragment({
    id: "is (no shortcut)",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    body: body.line("="),
});

//----------------------------------------------------------------------------------------------------------------------
// as
//----------------------------------------------------------------------------------------------------------------------

export const as = fragment({
    id: "as",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "a",
    voiceCommands: "as",
    body: body.line("as"),
});

//----------------------------------------------------------------------------------------------------------------------
// <>
//----------------------------------------------------------------------------------------------------------------------

export const typeAnnotation = {
    "<": fragment({
        ...FRAGMENT_ID.of,
        id: "<",
        languages: LANGUAGES.ts.tsx,
        shortcuts: "o",
        voiceCommands: "of",
        leadingSeparator: "",
        body: body.line("<"),
    }),
    "< (no shortcut)": fragment({
        ...FRAGMENT_ID.of,
        id: "_<",
        languages: LANGUAGES.ts.tsx,
        shortcuts: "",
        voiceCommands: "",
        leadingSeparator: "",
        body: body.line("<"),
    }),
    ">": fragment({
        id: ">",
        languages: LANGUAGES.ts.tsx,
        shortcuts: "",
        voiceCommands: "",
        leadingSeparator: "",
        body: body.line(">"),
    }),
};

//----------------------------------------------------------------------------------------------------------------------
// ()
//----------------------------------------------------------------------------------------------------------------------

export const brackets = fragment({
    id: "()",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    leadingSeparator: "",
    body: body.line("(", VARIABLE(1), ")"),
});
