import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";

const THROW_ERROR = {
    id: "throw-error",
    shortcuts: "te,tne",
    voiceCommands: [
        "throw error",
        "throw exception",
        "throw new error",
        "throw new exception",
        "raise error",
        "raise exception",
        "raise new error",
        "raise new exception",
    ],
} as const;

//----------------------------------------------------------------------------------------------------------------------
// AutoHotkey
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...THROW_ERROR,
    languages: LANGUAGES.ahk,
    body: body.line('throw Error("', SELECTED_TEXT, CURSOR, '")'),
});

//----------------------------------------------------------------------------------------------------------------------
// C++, Java, JavaScript, TypeScript
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...THROW_ERROR,
    languages: LANGUAGES.cpp.java.js.jsx.ts.tsx,
    body: body.line("throw new ", VARIABLE(1, "Error"), '("', SELECTED_TEXT, CURSOR, '")'),
});

//----------------------------------------------------------------------------------------------------------------------
// Make
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...THROW_ERROR,
    languages: LANGUAGES.make,
    body: body.line("$(error ", SELECTED_TEXT, CURSOR, ")"),
});

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...THROW_ERROR,
    languages: LANGUAGES.rb,
    body: body.line("raise ", VARIABLE(1, "StandardError"), ', "', SELECTED_TEXT, CURSOR, '"'),
});
