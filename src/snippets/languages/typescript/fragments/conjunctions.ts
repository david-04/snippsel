import { LANGUAGES } from "../../../../compiler/data/language.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment } from "../../../../compiler/data/snippet-fragment.js";

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
