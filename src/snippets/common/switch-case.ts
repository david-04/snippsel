import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

const SWITCH_CASE = { id: "switch-case", shortcuts: "sc", voiceCommands: "switch case" } as const;

//----------------------------------------------------------------------------------------------------------------------
// C-style languages
//----------------------------------------------------------------------------------------------------------------------

addSnippets(LANGUAGES.ahk.awk.c.cpp.java.js.jsx.ts.tsx, {
    ...SWITCH_CASE,
    body: body //
        .line("switch (", VARIABLE(1, "variable"), ") {")
        .line("\tcase ", VARIABLE(2, "123"), ":")
        .line("\t\t", CURSOR, SELECTED_TEXT)
        .line("\t\tbreak;")
        .line("\tdefault:")
        .line("\t\t")
        .line("}"),
});

//----------------------------------------------------------------------------------------------------------------------
// Python
//----------------------------------------------------------------------------------------------------------------------

addSnippets(LANGUAGES.py, {
    ...SWITCH_CASE,
    body: body //
        .line("if ", VARIABLE(1, "value == 1"), ":")
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("else:")
        .line("\t"),
});

//----------------------------------------------------------------------------------------------------------------------
// Shell
//----------------------------------------------------------------------------------------------------------------------

addSnippets(LANGUAGES.sh, {
    ...SWITCH_CASE,
    body: body //
        .line(`case \${`, VARIABLE(1, "VARIABLE"), "?} in")
        .line(VARIABLE(2, "value1 | value2"), ")")
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("\t;;")
        .line("*)")
        .line("\t")
        .line("\t;;")
        .line("esac"),
});

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

addSnippets(LANGUAGES.rb, {
    ...SWITCH_CASE,
    body: body //
        .line("case ", VARIABLE(1, "variable"))
        .line("when ", VARIABLE(2, "123"))
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("else")
        .line("\t")
        .line("end"),
});
