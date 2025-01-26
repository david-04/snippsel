import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";

//----------------------------------------------------------------------------------------------------------------------
// Makefiles
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.make,
    {
        id: "call",
        shortcuts: "c",
        voiceCommands: "call",
        body: body.line("$(call ", SELECTED_TEXT, CURSOR, ")"),
    },
    {
        id: "define",
        shortcuts: "d",
        voiceCommands: "define",
        body: body.line("define ", CURSOR).line(SELECTED_TEXT).line("endef"),
    },
    {
        id: "dev-command",
        shortcuts: "dc",
        voiceCommands: "dev command",
        body: body
            .line("$(call dc.lint,                    yarn lint,   src/*.ts, --workers=4, build/.tsbuildinfo)")
            .line("$(call dc.run, run server default, yarn server, express,  --debug,     build/.tsbuildinfo)")
            .line("$(call dc.test,                    yarn test,   src/*.ts, --workers=4, build/.tsbuildinfo)"),
    },
    {
        id: "dev-command-lint",
        shortcuts: "dcl",
        voiceCommands: "dev command lint",
        body: body.line("$(call dc.lint, yarn lint, src/*.ts, --workers=4, build/.tsbuildinfo)"),
    },
    {
        id: "dev-command-run",
        shortcuts: "dcr",
        voiceCommands: "dev command run",
        body: body.line("$(call dc.run, run server default, yarn server, express, --debug, build/.tsbuildinfo)"),
    },
    {
        id: "dev-command-test",
        shortcuts: "dct",
        voiceCommands: "dev command test",
        body: body.line("$(call dc.test, yarn test, src/*.ts, --workers=4, build/.tsbuildinfo)"),
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
        id: "help",
        shortcuts: ["h", "dh"],
        voiceCommands: "help",
        body: body.line("define HELP").line().line("\t", SELECTED_TEXT, CURSOR).line().line("endef"),
    },
    {
        id: "make",
        shortcuts: "m",
        voiceCommands: "make",
        body: body.line("$(MAKE)", CURSOR, SELECTED_TEXT),
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
