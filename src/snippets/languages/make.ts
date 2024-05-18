import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";

//----------------------------------------------------------------------------------------------------------------------
// Makefiles
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    LANGUAGES.make,
    {
        id: "call",
        shortcuts: "c",
        voiceCommands: "call",
        body: body.line("$(call ", SELECTED_TEXT, CURSOR, ")"),
    },
    {
        id: "filter",
        shortcuts: "f",
        voiceCommands: "filter",
        body: body.line("$(filter ", VARIABLE(1, "%.txt"), ", ", SELECTED_TEXT, ")"),
    },
    {
        id: "filter-out",
        shortcuts: "fo",
        voiceCommands: "filter out",
        body: body.line("$(filter-out ", VARIABLE(1, "%.tmp"), ", ", SELECTED_TEXT, ")"),
    },
    {
        id: "patsubst",
        shortcuts: "ps",
        voiceCommands: "patsubst",
        body: body.line("$(patsubst ", VARIABLE(1, "%"), ", ", VARIABLE(2, "%"), ", ", CURSOR, SELECTED_TEXT, ")"),
    },
    {
        id: "trim",
        shortcuts: "t,s",
        voiceCommands: "trim,strip",
        body: body.line("$(strip ", SELECTED_TEXT, CURSOR, ")"),
    },
    {
        id: "wildcard",
        shortcuts: "wc",
        voiceCommands: "wildcard",
        body: body.line("$(wildcard ", SELECTED_TEXT, CURSOR, ")"),
    }
);
