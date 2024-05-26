import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

//----------------------------------------------------------------------------------------------------------------------
// Array
//----------------------------------------------------------------------------------------------------------------------

const ARRAY = { id: "array", shortcuts: "a", voiceCommands: "array" } as const;

addSnippets(
    {
        ...ARRAY,
        languages: LANGUAGES.c.cpp.json.js.jsx.ts.tsx.rb,
        body: body.line("[", CURSOR, SELECTED_TEXT, "]"),
    },
    {
        ...ARRAY,
        languages: LANGUAGES.java,
        body: body.line("{", CURSOR, SELECTED_TEXT, "}"),
    },
    {
        ...ARRAY,
        languages: LANGUAGES.sh,
        body: body.line("(", CURSOR, SELECTED_TEXT, ")"),
    }
);
