import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

const FOR_EACH = { id: "for-each", shortcuts: "fe", voiceCommands: "for each" } as const;
const FOR_EACH_INDEX = { id: "for-each-index", shortcuts: "fei", voiceCommands: "for each index" } as const;
const FOR_EACH_KEY = { id: "for-each-key", shortcuts: "fek", voiceCommands: "for each key" } as const;
const FOR_EACH_VALUE = { id: "for-each-value", shortcuts: "fev", voiceCommands: "for each value" } as const;

//----------------------------------------------------------------------------------------------------------------------
// AutoHotKey
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.ahk,
    {
        ...FOR_EACH,
        body: body //
            .line("for ", VARIABLE(1, "key"), ", ", VARIABLE(2, "value"), " in ", VARIABLE(3, "object"), " {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line("Loop ", VARIABLE(1, "100"), " {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for ", VARIABLE(1, "key"), ", ", VARIABLE(2, "value"), " in ", VARIABLE(3, "object"), " {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for ", VARIABLE(1, "key"), ", ", VARIABLE(2, "value"), " in ", VARIABLE(3, "object"), " {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// AWK
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.awk,
    {
        ...FOR_EACH,
        body: body //
            .line("for (", VARIABLE(1, "key"), " in ", VARIABLE(2, "object"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line(
                "for (",
                VARIABLE(1, "idx"),
                " = ",
                VARIABLE(2, "0"),
                "; ",
                VARIABLE(1),
                " < ",
                VARIABLE(3, "100"),
                "; ",
                VARIABLE(1),
                "++) {"
            )
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for (", VARIABLE(1, "key"), " in ", VARIABLE(2, "object"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// C + C++
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.c.cpp,
    {
        ...FOR_EACH,
        body: body //
            .line("for (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line(
                "for (int ",
                VARIABLE(1, "index"),
                " = ",
                VARIABLE(2, "0"),
                "; ",
                VARIABLE(1),
                " < ",
                VARIABLE(3, "100"),
                "; ",
                VARIABLE(1),
                "++) {"
            )
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for (", VARIABLE(1), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Java
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.java,
    {
        ...FOR_EACH,
        body: body //
            .line("for (", VARIABLE(1, "Object object"), " : ", VARIABLE(2, "collection"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line(
                "for (int ",
                VARIABLE(1, "index"),
                " = ",
                VARIABLE(2, "0"),
                "; ",
                VARIABLE(1),
                " < ",
                VARIABLE(3, "100"),
                "; ",
                VARIABLE(1),
                "++) {"
            )
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for (", VARIABLE(1, "Object object"), " : ", VARIABLE(2, "collection.keys()"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for (", VARIABLE(1, "Object object"), " : ", VARIABLE(2, "collection"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// JavaScript + TypeScript
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        ...FOR_EACH,
        body: body //
            .line("for (const ", VARIABLE(1, "key"), " of ", VARIABLE(2, "object"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line(
                "for (let ",
                VARIABLE(1, "index"),
                " = ",
                VARIABLE(2, "0"),
                "; ",
                VARIABLE(1),
                " < ",
                VARIABLE(3, "100"),
                "; ",
                VARIABLE(1),
                "++) {"
            )
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for (const ", VARIABLE(1, "key"), " in ", VARIABLE(2, "object"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for (const ", VARIABLE(1, "key"), " of ", VARIABLE(2, "object"), ") {")
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
        ...FOR_EACH,
        body: body.line("$(foreach ", VARIABLE(1, "VARIABLE"), ", ", SELECTED_TEXT, CURSOR, ", $(", VARIABLE(1), "))"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body.line("$(foreach ", VARIABLE(1, "VARIABLE"), ", ", SELECTED_TEXT, CURSOR, ", $(", VARIABLE(1), "))"),
    },
    {
        ...FOR_EACH_KEY,
        body: body.line("$(foreach ", VARIABLE(1, "VARIABLE"), ", ", SELECTED_TEXT, CURSOR, ", $(", VARIABLE(1), "))"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body.line("$(foreach ", VARIABLE(1, "VARIABLE"), ", ", SELECTED_TEXT, CURSOR, ", $(", VARIABLE(1), "))"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.rb,
    {
        ...FOR_EACH,
        body: body //
            .line("for ", VARIABLE(1, "variable"), " in ", VARIABLE(2, "object.keys"), " do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line("for ", VARIABLE(1, "variable"), " in ", VARIABLE(2, "1"), "..", VARIABLE(3, "100"), " do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for ", VARIABLE(1, "variable"), " in ", VARIABLE(2, "object"), ".keys do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for ", VARIABLE(1, "variable"), " in ", VARIABLE(2, "collection"), " do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Shell
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.sh,
    {
        ...FOR_EACH,
        body: body //
            .line("for ", VARIABLE(1, "VARIABLE"), " in ", VARIABLE(2, "value1 value2 value3"), "; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("done"),
    },
    {
        ...FOR_EACH_INDEX,
        body: body //
            .line("for ", VARIABLE(1, "VARIABLE"), " in {", VARIABLE(2, "1"), "..", VARIABLE(3, "100"), "}; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("done"),
    },
    {
        ...FOR_EACH_KEY,
        body: body //
            .line("for ", VARIABLE(1, "VARIABLE"), " in ", VARIABLE(2, "key1 key2 key3"), "; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("done"),
    },
    {
        ...FOR_EACH_VALUE,
        body: body //
            .line("for ", VARIABLE(1, "VARIABLE"), " in ", VARIABLE(2, "value1 value2 value3"), "; do")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("done"),
    }
);
