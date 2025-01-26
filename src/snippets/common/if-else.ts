import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

const IF = { id: "if", shortcuts: "i", voiceCommands: "if" } as const;
const IF_ELSE = { id: "if-else", shortcuts: "ie", voiceCommands: "if else" } as const;
const ELSE = { id: "else", shortcuts: "e", voiceCommands: "else" } as const;
const ELSE_IF = { id: "else-if", shortcuts: "ei", voiceCommands: "else if" } as const;

//----------------------------------------------------------------------------------------------------------------------
// C-style languages
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.ahk.awk.c.cpp.java.js.jsx.ts.tsx,
    {
        ...IF,
        body: body //
            .line("if (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...IF_ELSE,
        body: body //
            .line("if (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} else {")
            .line("\t")
            .line("}"),
    },
    {
        ...ELSE,
        body: body //
            .line("else {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...ELSE_IF,
        body: body //
            .line("else if (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Make
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.make,
    {
        id: "if",
        shortcuts: "i",
        voiceCommands: "if",
        body: body.line("$(if $(", CURSOR, "), ", SELECTED_TEXT, ")"),
    },
    {
        id: "if-equal",
        shortcuts: "ie,ieq",
        voiceCommands: "if equal",
        body: body
            .line('ifeq "$(', VARIABLE(1, "VARIABLE"), ')" "', VARIABLE(2, "VALUE"), '"')
            .line(CURSOR, SELECTED_TEXT)
            .line("endif"),
    },
    {
        id: "if-not-equal",
        shortcuts: "ine,ineq",
        voiceCommands: "if not equal",
        body: body
            .line('ifneq "$(', VARIABLE(1, "VARIABLE"), ')" "', VARIABLE(2, "VALUE"), '"')
            .line(CURSOR, SELECTED_TEXT)
            .line("endif"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Python
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.py,
    {
        ...IF,
        body: body //
            .line("if ", VARIABLE(1), ":")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...IF_ELSE,
        body: body //
            .line("if ", VARIABLE(1), ":")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("else:")
            .line("\t"),
    },
    {
        ...ELSE,
        body: body //
            .line("else:")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...ELSE_IF,
        body: body //
            .line("elif ", VARIABLE(1), ":")
            .line("\t", CURSOR, SELECTED_TEXT),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.rb,
    {
        ...IF,
        body: body //
            .line("if ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        ...IF_ELSE,
        body: body //
            .line("if ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("else")
            .line("\t")
            .line("end"),
    },
    {
        ...ELSE,
        body: body //
            .line("else")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...ELSE_IF,
        body: body //
            .line("elsif ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT),
    }
);

addSnippets(
    LANGUAGES.rb,
    {
        id: "unless",
        shortcuts: "u,ul",
        voiceCommands: "unless",
        body: body //
            .line("unless ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        id: "unless-else",
        shortcuts: "ue",
        voiceCommands: "unless else",
        body: body //
            .line("unless ", VARIABLE(1))
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("else")
            .line("\t")
            .line("end"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Shell
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.sh,
    {
        ...IF,
        body: body //
            .line("if [[ ", VARIABLE(1), " ]]; then")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("fi"),
    },
    {
        ...IF_ELSE,
        body: body //
            .line("if [[ ", VARIABLE(1), " ]]; then")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("else")
            .line("\t")
            .line("fi"),
    },
    {
        ...ELSE,
        body: body //
            .line("else")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...ELSE_IF,
        body: body //
            .line("elif [[ ", VARIABLE(1), " ]]; then")
            .line("\t", CURSOR, SELECTED_TEXT),
    }
);
