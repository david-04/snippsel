import { body } from "../../compiler/data/snippet-body.js";
import { SnippetWithMandatoryLanguages } from "../../compiler/data/snippet-repository.js";

export const FRAGMENT_ID = {
    //
    abstract: { id: "abstract", shortcuts: "a", voiceCommands: "abstract", body: body.line("abstract") },
    arrowExpression: {
        id: "arrow-expression",
        shortcuts: "ae",
        voiceCommands: "arrow expression,lambda expression,lambda",
    },
    arrowFunction: { id: "arrow-function", shortcuts: "af", voiceCommands: "arrow function, lambda function" },
    async: { id: "async", shortcuts: "a", voiceCommands: "async", body: body.line("async") },
    class: { id: "class", shortcuts: "cl", voiceCommands: "class" },
    constructor: { id: "constructor", shortcuts: "ct", voiceCommands: "constructor" },
    const: { id: "const", shortcuts: "c", voiceCommands: "const" },
    let: { id: "let", shortcuts: "l", voiceCommands: "l" },
    enum: { id: "enum", shortcuts: "en", voiceCommands: "enum" },
    export: { id: "export", shortcuts: "e", voiceCommands: "export", body: body.line("export") },
    final: { id: "final", shortcuts: "f", voiceCommands: "final", body: body.line("final") },
    function: { id: "function", shortcuts: "fn", voiceCommands: "function" },
    interface: { id: "interface", shortcuts: "in,if", voiceCommands: "interface" },
    method: { id: "method", shortcuts: "m", voiceCommands: "method" },
    namespace: { id: "namespace", shortcuts: "ns", voiceCommands: "namespace" },
    private: { id: "private", shortcuts: "i,pri", voiceCommands: "private", body: body.line("private") },
    protected: { id: "protected", shortcuts: "o,pro", voiceCommands: "protected", body: body.line("protected") },
    public: { id: "public", shortcuts: "u,pub", voiceCommands: "public", body: body.line("public") },
    readonly: { id: "readonly", shortcuts: "r", voiceCommands: "readonly", body: body.line("readonly") },
    static: { id: "static", shortcuts: "s", voiceCommands: "static", body: body.line("static") },

    of: { id: "of", shortcuts: "o", voiceCommands: "of" },

    undefined: { id: "undefined", shortcuts: "u", voiceCommands: "undefined", body: body.line("undefined") },
    boolean: { id: "boolean", shortcuts: "b", voiceCommands: "boolean", body: body.line("boolean") },
    true: { id: "true", shortcuts: "t", voiceCommands: "true", body: body.line("true") },
    false: { id: "false", shortcuts: "f", voiceCommands: "false", body: body.line("false") },
    number: { id: "number", shortcuts: "n", voiceCommands: "number", body: body.line("number") },
    zero: { id: "zero", shortcuts: "z", voiceCommands: "zero", body: body.line("0") },
    one: { id: "one", shortcuts: "o", voiceCommands: "one", body: body.line("1") },
    string: { id: "string", shortcuts: "s", voiceCommands: "string" },

    array: { id: "array", shortcuts: "a", voiceCommands: "array" },
    readonlyArray: { id: "readonly-array", shortcuts: ["ra", "roa"], voiceCommands: "read-only array" },
    emptyArray: { id: "empty-array", shortcuts: "ea", voiceCommands: "empty array" },
    set: { id: "set", shortcuts: "s", voiceCommands: "set" },
    readonlySet: { id: "readonly-set", shortcuts: ["rs", "ros"], voiceCommands: "read-only set" },
    map: { id: "map", shortcuts: "m", voiceCommands: "map" },
    readonlyMap: { id: "readonly-map", shortcuts: ["rm", "rom"], voiceCommands: "read-only map" },

    parameter: { id: "parameter", shortcuts: "p", voiceCommands: "parameter" },
    property: { id: "property", shortcuts: "p", voiceCommands: "property" },
    variable: { id: "variable", shortcuts: "v", voiceCommands: "variable" },
    parameterOrProperty: { id: "property", shortcuts: "p", voiceCommands: ["parameter", "property"] },
} as const satisfies Record<string, Partial<SnippetWithMandatoryLanguages>>;
