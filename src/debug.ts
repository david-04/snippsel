import { addSnippets } from "./compiler/api.js";
import { LANGUAGES } from "./compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "./compiler/data/placeholder.js";
import { body } from "./compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "./compiler/data/snippet-fragment.js";
import "./snippsel.js";

addSnippets({
    id: "for-each-index",
    // the snippet can be exported for multiple languages
    languages: LANGUAGES.js.jsx.ts.tsx,
    // the snippet can haves multiple shortcuts
    shortcuts: ["f", "fe", "fei"],
    // experimental voice commands for speech recognition with Talon
    voiceCommands: ["for", "for each", "for each index"],
    // fluent API to to create the snippet body
    body: body //
        .line(
            "for (let ",
            // placeholders with preset values
            VARIABLE(1, "index"),
            " = ",
            VARIABLE(2, "0"),
            "; ",
            // can reference previous placeholders
            VARIABLE(1),
            " < ",
            VARIABLE(3, "100"), // NOSONAR
            "; ",
            VARIABLE(1),
            "++) {"
        )
        // specify where to insert selected text
        // and where to put the cursor at the end
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("}"),
});

//-----------------------------------------------------------------------------
// The method itself
//-----------------------------------------------------------------------------

const _method = fragment({
    id: "method",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "m",
    voiceCommands: "method",
    body: body //
        .line(VARIABLE(1), "(", VARIABLE(2), ") {")
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("}"),
});

//-----------------------------------------------------------------------------
// Access modifiers
//-----------------------------------------------------------------------------

const _public = fragment({
    id: "public",
    languages: LANGUAGES.ts.tsx,
    shortcuts: ["u", "pub"],
    voiceCommands: "public",
    body: body.line("public"),
});

const _protected = fragment({
    id: "protected",
    languages: LANGUAGES.ts.tsx,
    shortcuts: ["o", "pro"],
    voiceCommands: "protected",
    body: body.line("protected"),
});

const _private = fragment({
    id: "private",
    languages: LANGUAGES.ts.tsx,
    shortcuts: ["i", "pri"],
    voiceCommands: "private",
    body: body.line("private"),
});

//-----------------------------------------------------------------------------
// static
//-----------------------------------------------------------------------------

const _static = fragment({
    id: "static",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "s",
    voiceCommands: "static",
    body: body.line("static"),
});

//-----------------------------------------------------------------------------
// async
//-----------------------------------------------------------------------------

const _async = fragment({
    id: "async",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "a",
    voiceCommands: "async",
    body: body.line("async"),
});

addSnippets(
    sequence(optional(oneOf(_public, _protected, _private)), optional(_static), optional(_async), _method),
    // filter rules
    [
        {
            // condition: pick at least one
            ifId: "static-method", // only apply to the snippet with this id
            ifLanguage: LANGUAGES.ts.tsx.toLanguages(), // only apply to these languages
            // action: pick one of them
            removeShortcut: "pubm", // remove this one shortcut (but keep the rest)
            discardSnippet: true, // discard the whole snippet (with all shortcuts)
        },
        // add more filter rules here...
    ]
);
