import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

const TRY = { id: "try", shortcuts: "try", voiceCommands: "try" } as const;
const CATCH = { id: "catch", shortcuts: "catch", voiceCommands: "catch" } as const;
const FINALLY = { id: "finally", shortcuts: "finally", voiceCommands: "finally" } as const;
const TRY_CATCH = { id: "try-catch", shortcuts: "tc", voiceCommands: "try catch" } as const;
const TRY_CATCH_FINALLY = { id: "try-catch-finally", shortcuts: "tcf", voiceCommands: "try catch finally" } as const;
const TRY_FINALLY = { id: "try-finally", shortcuts: "tf", voiceCommands: "try finally" } as const;

//----------------------------------------------------------------------------------------------------------------------
// AutoHotkey
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.ahk,
    {
        ...TRY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...CATCH,
        body: body //
            .line("catch (Any as ", VARIABLE(1, "Error"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FINALLY,
        body: body //
            .line("finally {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...TRY_CATCH,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} catch (Any as ", VARIABLE(1, "error"), ") {")
            .line("\t")
            .line("}"),
    },
    {
        ...TRY_CATCH_FINALLY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} catch (Any as ", VARIABLE(1, "error"), ") {")
            .line("\t")
            .line("} finally {")
            .line("\t")
            .line("} "),
    },
    {
        ...TRY_FINALLY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} finally {")
            .line("\t")
            .line("} "),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Java
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.java,
    {
        ...TRY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...CATCH,
        body: body //
            .line("catch (", VARIABLE(1, "Exception"), " ", VARIABLE(2, "exception"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FINALLY,
        body: body //
            .line("finally {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...TRY_CATCH,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("catch (", VARIABLE(1, "Exception"), " ", VARIABLE(2, "exception"), ") {")
            .line("\t")
            .line("}"),
    },
    {
        ...TRY_CATCH_FINALLY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("catch (", VARIABLE(1, "Exception"), " ", VARIABLE(2, "exception"), ") {")
            .line("\t")
            .line("} finally {")
            .line("\t")
            .line("} "),
    },
    {
        ...TRY_FINALLY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} finally {")
            .line("\t")
            .line("} "),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// JavaScript and TypeScript
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        ...TRY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...CATCH,
        body: body //
            .line("catch (", VARIABLE(1, "error"), ") {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...FINALLY,
        body: body //
            .line("finally {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("}"),
    },
    {
        ...TRY_CATCH,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} catch (", VARIABLE(1, "error"), ") {")
            .line("\t")
            .line("}"),
    },
    {
        ...TRY_CATCH_FINALLY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} catch (", VARIABLE(1, "error"), ") {")
            .line("\t")
            .line("} finally {")
            .line("\t")
            .line("} "),
    },
    {
        ...TRY_FINALLY,
        body: body //
            .line("try {")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("} finally {")
            .line("\t")
            .line("} "),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Python
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.py,
    {
        ...TRY,
        body: body //
            .line("try:")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...CATCH,
        body: body //
            .line("except ", VARIABLE(1, "ExceptionType"), " as ", VARIABLE(2, "error"), ":")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...FINALLY,
        body: body //
            .line("finally:")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...TRY_CATCH,
        body: body //
            .line("try:")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("except ", VARIABLE(1, "ExceptionType"), " as ", VARIABLE(2, "error"), ":")
            .line("\t"),
    },
    {
        ...TRY_CATCH_FINALLY,
        body: body //
            .line("try:")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("except ", VARIABLE(1, "ExceptionType"), " as ", VARIABLE(2, "error"), ":")
            .line("\t")
            .line("finally:")
            .line("\t"),
    },
    {
        ...TRY_FINALLY,
        body: body //
            .line("try:")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("finally:")
            .line("\t"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.rb,
    {
        ...TRY,
        body: body //
            .line("begin")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("end"),
    },
    {
        ...CATCH,
        body: body //
            .line("rescue ", VARIABLE(1, "Exception"), " => ", VARIABLE(2, "exception"), "")
            .line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...TRY_CATCH,
        body: body //
            .line("begin")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("rescue ", VARIABLE(1, "Exception"), " => ", VARIABLE(2, "exception"), "")
            .line("\t")
            .line("end"),
    },
    {
        ...TRY_CATCH_FINALLY,
        body: body //
            .line("begin")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("rescue ", VARIABLE(1, "Exception"), " => ", VARIABLE(2, "exception"), "")
            .line("\t")
            .line("end"),
    },
    {
        ...TRY_FINALLY,
        body: body //
            .line("begin")
            .line("\t", CURSOR, SELECTED_TEXT)
            .line("rescue ", VARIABLE(1, "Exception"), " => ", VARIABLE(2, "exception"), "")
            .line("\t")
            .line("end"),
    }
);
