import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";

//----------------------------------------------------------------------------------------------------------------------
// "after" hooks
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        id: "after-all",
        shortcuts: "aa",
        voiceCommands: "after all",
        body: body.line("afterAll(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        id: "after-all-async",
        shortcuts: "aaa",
        voiceCommands: "after all async",
        body: body.line("afterAll(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        id: "after-each",
        shortcuts: "", // no shortcut (conflicts with "arrow expression")
        voiceCommands: "after each",
        body: body.line("afterEach(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        id: "after-each-async",
        shortcuts: "aea",
        voiceCommands: "after each async",
        body: body.line("afterEach(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// "before" hooks
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        id: "before-all",
        shortcuts: "ba",
        voiceCommands: "before all",
        body: body.line("beforeAll(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        id: "before-all-async",
        shortcuts: "baa",
        voiceCommands: "before all async",
        body: body.line("beforeAll(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        id: "before-each",
        shortcuts: "be",
        voiceCommands: "before each",
        body: body.line("beforeEach(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        id: "before-each-async",
        shortcuts: "bea",
        voiceCommands: "before each async",
        body: body.line("beforeEach(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// "describe" blocks
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        id: "describe",
        shortcuts: "d",
        voiceCommands: "describe",
        body: body.line('describe("', VARIABLE(1), '", () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        id: "describe-async",
        shortcuts: "da",
        voiceCommands: "describe async",
        body: body.line('describe("', VARIABLE(1), '", async () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// "it" blocks
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        id: "it",
        shortcuts: "it",
        voiceCommands: "it",
        body: body.line('it("', VARIABLE(1), '", () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        id: "it-async",
        shortcuts: "ita",
        voiceCommands: "it async",
        body: body.line('it("', VARIABLE(1), '", async () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    }
);
