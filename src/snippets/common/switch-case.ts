import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";

const SWITCH_CASE = { id: "switch-case", shortcuts: "sc", voiceCommands: "switch case" } as const;

//----------------------------------------------------------------------------------------------------------------------
// C-style languages
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(LANGUAGES.ahk.awk.c.cpp.java.js.jsx.ts.tsx, {
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
// Shell
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(LANGUAGES.sh, {
    ...SWITCH_CASE,
    body: body //
        .line("case ", VARIABLE(1, "VARIABLE"), " in")
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

snippetRepository.add(LANGUAGES.rb, {
    ...SWITCH_CASE,
    body: body //
        .line("case ", VARIABLE(1, "variable"))
        .line("when ", VARIABLE(2, "123"))
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("else")
        .line("\t")
        .line("end"),
});
