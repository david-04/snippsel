import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// Keywords
//----------------------------------------------------------------------------------------------------------------------

export const _export = fragment({ languages: LANGUAGES.js.jsx.ts.tsx, ...FRAGMENT_ID.export });
export const _const = fragment({ ...FRAGMENT_ID.const, languages: LANGUAGES.js.jsx.ts.tsx, body: body.line("const") });
export const _let = fragment({ ...FRAGMENT_ID.let, languages: LANGUAGES.js.jsx.ts.tsx, body: body.line("let") });

export const _public = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.public });
export const _protected = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.protected });
export const _private = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.private });
export const publicProtectedPrivate = oneOf(_public, _protected, _private);

export const _static = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.static });
export const _abstract = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.abstract });
export const _readonly = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.readonly });
export const _async = fragment({ languages: LANGUAGES.js.jsx.ts.tsx, ...FRAGMENT_ID.async });

export const _new = fragment({ ...FRAGMENT_ID.new, languages: LANGUAGES.js.jsx.ts.tsx });

//----------------------------------------------------------------------------------------------------------------------
// Data type descriptors
//----------------------------------------------------------------------------------------------------------------------

export const boolean = { id: "boolean", shortcut: "b", voiceCommand: "boolean", body: "boolean" } as const;
export const number = { id: "number", shortcut: "n", voiceCommand: "number", body: "number" } as const;
export const string = { id: "string", shortcut: "s", voiceCommand: "string", body: "string" } as const;

//----------------------------------------------------------------------------------------------------------------------
// =
//----------------------------------------------------------------------------------------------------------------------

export const is = fragment({
    id: "[is]",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    body: body.line("="),
});

//----------------------------------------------------------------------------------------------------------------------
// ()
//----------------------------------------------------------------------------------------------------------------------

export const brackets = fragment({
    id: "",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    leadingSeparator: "",
    body: body.line("(", CURSOR, SELECTED_TEXT, ")"),
});
