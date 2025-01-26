import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment } from "../../../../compiler/data/snippet-fragment.js";

export const identifierPlaceholder = fragment({
    id: "[identifier]",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    body: body.line(VARIABLE(1)),
});

export const valuePlaceholder = fragment({
    id: "[value]",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    body: body.line(VARIABLE(1)),
});
