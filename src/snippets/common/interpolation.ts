import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

const INTERPOLATION = { id: "interpolation", shortcuts: "ip", voiceCommands: "interpolation" } as const;
const INSERT_VALUE = { id: "insert-value", shortcuts: "iv", voiceCommands: "insert value" } as const;

//----------------------------------------------------------------------------------------------------------------------
// JavaScript and TypeScript
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    { ...INTERPOLATION, body: body.line("`${", CURSOR, SELECTED_TEXT, "}`") },
    { ...INSERT_VALUE, body: body.line("${", CURSOR, SELECTED_TEXT, "}") }
);

//----------------------------------------------------------------------------------------------------------------------
// Make
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.make,
    { ...INTERPOLATION, body: body.line('"$(', CURSOR, SELECTED_TEXT, ')"') },
    { ...INSERT_VALUE, body: body.line("$(", CURSOR, SELECTED_TEXT, ")") }
);

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.rb,
    { ...INTERPOLATION, body: body.line('"#{', CURSOR, SELECTED_TEXT, '}"') },
    { ...INSERT_VALUE, body: body.line("#{", CURSOR, SELECTED_TEXT, "}") }
);

//----------------------------------------------------------------------------------------------------------------------
// Shell
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.sh,
    { ...INTERPOLATION, body: body.line('"${', CURSOR, SELECTED_TEXT, '?}"') },
    { ...INSERT_VALUE, body: body.line("${", CURSOR, SELECTED_TEXT, "?}") }
);
