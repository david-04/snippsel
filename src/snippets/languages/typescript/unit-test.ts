import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";

const AFTER_ALL = { id: "after-all", shortcuts: "aa", voiceCommands: "after all" } as const;
const AFTER_ALL_ASYNC = { id: "after-all-async", shortcuts: "aaa", voiceCommands: "after all async" } as const;
const AFTER_EACH = { id: "after-each", shortcuts: "", voiceCommands: "after each" } as const;
const AFTER_EACH_ASYNC = { id: "after-each-async", shortcuts: "aea", voiceCommands: "after each async" } as const;
const BEFORE_ALL = { id: "before-all", shortcuts: "ba", voiceCommands: "before all" } as const;
const BEFORE_ALL_ASYNC = { id: "before-all-async", shortcuts: "baa", voiceCommands: "before all async" } as const;
const BEFORE_EACH = { id: "before-each", shortcuts: "be", voiceCommands: "before each" } as const;
const BEFORE_EACH_ASYNC = { id: "before-each-async", shortcuts: "bea", voiceCommands: "before each async" } as const;
const DESCRIBE = { id: "describe", shortcuts: "d", voiceCommands: "describe" } as const;
const DESCRIBE_ASYNC = { id: "describe-async", shortcuts: "da", voiceCommands: "describe async" } as const;
const IT = { id: "it", shortcuts: "it", voiceCommands: "it" } as const;
const IT_ASYNC = { id: "it-async", shortcuts: "ita", voiceCommands: "it async" } as const;

//----------------------------------------------------------------------------------------------------------------------
// JavaScript and TypeScript
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.js.jsx.ts.tsx,
    {
        ...AFTER_ALL,
        body: body.line("afterAll(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        ...AFTER_ALL_ASYNC,
        body: body.line("afterAll(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...AFTER_EACH, // no shortcut (conflucts with "arrow expression")
        body: body.line("afterEach(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        ...AFTER_EACH_ASYNC,
        body: body.line("afterEach(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...BEFORE_ALL,
        body: body.line("beforeAll(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        ...BEFORE_ALL_ASYNC,
        body: body.line("beforeAll(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...BEFORE_EACH,
        body: body.line("beforeEach(() => ", CURSOR, SELECTED_TEXT, ");"),
    },
    {
        ...BEFORE_EACH_ASYNC,
        body: body.line("beforeEach(async () => {").line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...DESCRIBE,
        body: body.line('describe("', VARIABLE(1), '", () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...DESCRIBE_ASYNC,
        body: body.line('describe("', VARIABLE(1), '", async () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...IT,
        body: body.line('it("', VARIABLE(1), '", () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    },
    {
        ...IT_ASYNC,
        body: body.line('it("', VARIABLE(1), '", async () => {').line("\t", CURSOR, SELECTED_TEXT).line("});"),
    }
);
