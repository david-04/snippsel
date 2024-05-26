import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { EMPTY_SHORTCUT } from "../../compiler/utils/constants.js";

//----------------------------------------------------------------------------------------------------------------------
// Curly brackets
//----------------------------------------------------------------------------------------------------------------------

const CURLY_BRACKETS = { id: "curly-brackets", shortcuts: EMPTY_SHORTCUT, voiceCommands: "curly brackets" } as const;

addSnippets(
    {
        ...CURLY_BRACKETS,
        languages: LANGUAGES.ahk.awk.java.json.js.jsx.ts.tsx.rb,
        body: body.line("{ ", CURSOR, SELECTED_TEXT, " }"),
    },
    {
        ...CURLY_BRACKETS,
        languages: LANGUAGES.make,
        body: body.line("$(", CURSOR, SELECTED_TEXT, ")"),
    },
    {
        ...CURLY_BRACKETS,
        languages: LANGUAGES.sh,
        body: body.line("${", CURSOR, SELECTED_TEXT, "?}"),
    },
    {
        ...CURLY_BRACKETS,
        languages: LANGUAGES.md,
        body: body.line("[", CURSOR, "](", SELECTED_TEXT, ")"),
    }
);
