import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment } from "../../../../compiler/data/snippet-fragment.js";

export const typePlaceholder = fragment({
    id: "[TYPE]",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "",
    voiceCommands: "",
    leadingSeparator: "",
    body: body.line(VARIABLE(1)),
});
