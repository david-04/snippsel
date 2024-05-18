import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";

const DO_WHILE = { id: "do-while", shortcuts: "dw", voiceCommands: "do while" } as const;
const DO_UNTIL = { id: "do-until", shortcuts: "du", voiceCommands: "do until" } as const;
const WHILE_DO = { id: "while-do", shortcuts: "w,wd", voiceCommands: "while, while do" } as const;
const UNTIL_DO = { id: "until-do", shortcuts: "ud", voiceCommands: "until, until do" } as const;

//----------------------------------------------------------------------------------------------------------------------
// C-style languages
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.ahk.awk.c.cpp.java.js.jsx.ts.tsx,
    {
        ...DO_WHILE,
        body: body //
            .line("do {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} while (", VARIABLE(1), ");"),
    },
    {
        ...DO_UNTIL,
        body: body //
            .line("do {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} while (!", VARIABLE(1), ");"),
    },
    {
        ...WHILE_DO,
        body: body //
            .line("while (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...UNTIL_DO,
        body: body //
            .line("while (!", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.rb,
    {
        ...DO_WHILE,
        body: body //
            .line("loop do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("\tbreak unless ", VARIABLE(1))
            .line("end"),
    },
    {
        ...DO_UNTIL,
        body: body //
            .line("loop do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("\tbreak if ", VARIABLE(1))
            .line("end"),
    },
    {
        ...WHILE_DO,
        body: body //
            .line("loop do")
            .line("\tbreak unless ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        ...UNTIL_DO,
        shortcuts: "ud",
        body: body //
            .line("loop do")
            .line("\tbreak unless ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Shell
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.sh,
    {
        ...DO_WHILE,
        body: body //
            .line("while : ; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("    [[ ", VARIABLE(1), " ]] || break")
            .line("done"),
    },
    {
        ...DO_UNTIL,
        body: body //
            .line("while : ; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("\t[[ ", VARIABLE(1), " ]] && break")
            .line("done"),
    },
    {
        ...WHILE_DO,
        body: body //
            .line("while [[ ", VARIABLE(1), " ]]; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("done"),
    },
    {
        ...UNTIL_DO,
        body: body //
            .line("while : ; do")
            .line("\t[[ ", VARIABLE(1), " ]] && break")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("done"),
    }
);
