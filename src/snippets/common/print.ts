import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";

const PRINT = { id: "print", shortcuts: "p", voiceCommands: "print" } as const;
const PRINT_STRING = { id: "print-string", shortcuts: "ps", voiceCommands: "print string" } as const;
const PRINT_INTERPOLATED = {
    id: "print-interpolated",
    shortcuts: "pi,pip,pis",
    voiceCommands: "print interpolated, print interpolated string",
} as const;

//----------------------------------------------------------------------------------------------------------------------
// JavaScript and TypeScript
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.js.jsx.ts.tsx,
    { ...PRINT, body: body.line("console.log(", CURSOR, SELECTED_TEXT, ");") },
    { ...PRINT_STRING, body: body.line('console.log("', CURSOR, SELECTED_TEXT, '");') },
    { ...PRINT_INTERPOLATED, body: body.line("console.log(`${", CURSOR, SELECTED_TEXT, "}`);") }
);

//----------------------------------------------------------------------------------------------------------------------
// Make
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.make,
    { ...PRINT, body: body.line("$(info ", CURSOR, SELECTED_TEXT, ")") },
    // ps is reserved for patsubst
    { ...PRINT_INTERPOLATED, body: body.line("$(info $(", CURSOR, SELECTED_TEXT, "))") }
);

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.rb,
    { ...PRINT, body: body.line("puts ", CURSOR, SELECTED_TEXT) },
    { ...PRINT_STRING, body: body.line("puts '", CURSOR, SELECTED_TEXT, "'") },
    { ...PRINT_INTERPOLATED, body: body.line('puts "#{', CURSOR, SELECTED_TEXT, '}"') }
);

//----------------------------------------------------------------------------------------------------------------------
// Shell
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.sh,
    { ...PRINT, body: body.line("echo ", CURSOR, SELECTED_TEXT) },
    { ...PRINT_STRING, body: body.line('echo "', CURSOR, SELECTED_TEXT, '"') },
    { ...PRINT_INTERPOLATED, body: body.line('echo "${', CURSOR, SELECTED_TEXT, '?}"') }
);
