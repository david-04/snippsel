import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

//----------------------------------------------------------------------------------------------------------------------
// Shell script
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.bat,
    {
        id: "cd",
        shortcuts: "cd",
        voiceCommands: "c d",
        body: body.line('cd /d "%~dp0"'),
    },
    {
        id: "echo-off",
        shortcuts: "eo,sb",
        voiceCommands: "echo off,shebang",
        body: body.line("@echo off"),
    },
    {
        id: "if",
        shortcuts: "i",
        voiceCommands: "if",
        body: body //
            .line("if ", VARIABLE(1), " (")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line(")"),
    },
    {
        id: "else",
        shortcuts: "e",
        voiceCommands: "else",
        body: body //
            .line("else (")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line(")"),
    },
    {
        id: "else-if",
        shortcuts: "ei",
        voiceCommands: "else if",
        body: body //
            .line("else if ", VARIABLE(1), " (")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line(")"),
    }
);
