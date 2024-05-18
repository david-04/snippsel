//----------------------------------------------------------------------------------------------------------------------
// Languages
//----------------------------------------------------------------------------------------------------------------------

export const LANGUAGE_IDS = [
    "ahk",
    "awk",
    "bat",
    "c",
    "cpp",
    "css",
    "html",
    "ini",
    "java",
    "js",
    "json",
    "jsx",
    "make",
    "md",
    "rb",
    "sh",
    "sql",
    "ts",
    "tsx",
    "xml",
    "xsl",
] as const;

export type LanguageId = (typeof LANGUAGE_IDS)[number];

//----------------------------------------------------------------------------------------------------------------------
// VSCode languages
//----------------------------------------------------------------------------------------------------------------------

export const VSCODE_LANGUAGE_ID_TO_LANGUAGE_ID = {
    ahk: "ahk",
    ahk2: "ahk",
    awk: "awk",
    bat: "bat",
    c: "c",
    coffeescript: undefined,
    cpp: "cpp",
    csharp: undefined,
    css: "css",
    diff: undefined,
    dockercompose: undefined,
    dockerfile: undefined,
    handlebars: undefined,
    html: "html",
    ini: "ini",
    java: "java",
    javascript: "js",
    javascriptreact: "jsx",
    json: "json",
    jsonc: "json",
    less: undefined,
    makefile: "make",
    markdown: "md",
    plaintext: undefined,
    powershell: undefined,
    python: undefined,
    ruby: "rb",
    sass: undefined,
    scss: undefined,
    shellscript: "sh",
    sql: "sql",
    typescript: "ts",
    typescriptreact: "tsx",
    xml: "xml",
    xsl: "xsl",
    yaml: undefined,
} as const satisfies Record<string, LanguageId | undefined>;

export type VSCodeLanguageId = keyof typeof VSCODE_LANGUAGE_ID_TO_LANGUAGE_ID;

//----------------------------------------------------------------------------------------------------------------------
// Collection of languages
//----------------------------------------------------------------------------------------------------------------------

export type Languages = ReadonlySet<LanguageId> & {
    intersection: (other: Languages) => Languages | undefined;
    getFirstSharedLanguage: (other: Languages) => LanguageId | undefined;
};

export class LanguagesContainer extends Set<LanguageId> implements Languages {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(languageIds: ReadonlySet<LanguageId>) {
        super(languageIds);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Find languages shared between both
    //------------------------------------------------------------------------------------------------------------------

    public getFirstSharedLanguage(other: Languages) {
        for (const languageId of this.intersection(other) ?? []) {
            return languageId;
        }
        return undefined;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Calculate the intersection between two sets of languages
    //------------------------------------------------------------------------------------------------------------------

    public intersection(other: Languages): Languages | undefined {
        const result = new Set<LanguageId>();
        for (const languageId of this) {
            if (other.has(languageId)) {
                result.add(languageId);
            }
        }
        return result.size ? new LanguagesContainer(result) : undefined;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Language builder
//----------------------------------------------------------------------------------------------------------------------

class EmptyLanguageBuilder {
    protected languageIds;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(languages: ReadonlySet<LanguageId>) {
        this.languageIds = languages;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Append a language to a cloned language builder
    //------------------------------------------------------------------------------------------------------------------

    private cloneAndAppend(languageId: LanguageId) {
        return new LanguageBuilder(this.languageIds, languageId);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Append languages
    //------------------------------------------------------------------------------------------------------------------

    public get all() {
        return new LanguageBuilder(new Set(LANGUAGE_IDS), LANGUAGE_IDS[0]);
    }

    public get ahk() {
        return this.cloneAndAppend("ahk");
    }

    public get awk() {
        return this.cloneAndAppend("awk");
    }

    public get bat() {
        return this.cloneAndAppend("bat");
    }

    public get c() {
        return this.cloneAndAppend("c");
    }

    public get cpp() {
        return this.cloneAndAppend("cpp");
    }

    public get css() {
        return this.cloneAndAppend("css");
    }

    public get html() {
        return this.cloneAndAppend("html");
    }

    public get ini() {
        return this.cloneAndAppend("ini");
    }

    public get java() {
        return this.cloneAndAppend("java");
    }

    public get js() {
        return this.cloneAndAppend("js");
    }

    public get json() {
        return this.cloneAndAppend("json");
    }

    public get jsx() {
        return this.cloneAndAppend("jsx");
    }

    public get make() {
        return this.cloneAndAppend("make");
    }

    public get md() {
        return this.cloneAndAppend("md");
    }

    public get rb() {
        return this.cloneAndAppend("rb");
    }

    public get sh() {
        return this.cloneAndAppend("sh");
    }

    public get sql() {
        return this.cloneAndAppend("sql");
    }

    public get ts() {
        return this.cloneAndAppend("ts");
    }

    public get tsx() {
        return this.cloneAndAppend("tsx");
    }

    public get xml() {
        return this.cloneAndAppend("xml");
    }

    public get xsl() {
        return this.cloneAndAppend("xsl");
    }
}

export class LanguageBuilder extends EmptyLanguageBuilder {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(languageIds: ReadonlySet<LanguageId>, languageId: LanguageId) {
        super(LanguageBuilder.combineLanguages(languageIds, languageId));
    }

    private static combineLanguages(languageIds: ReadonlySet<LanguageId>, languageId: LanguageId) {
        const combinedLanguages = new Set(languageIds);
        combinedLanguages.add(languageId);
        return combinedLanguages;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Retrieve the languages
    //------------------------------------------------------------------------------------------------------------------

    public toLanguages(): Languages {
        return new LanguagesContainer(this.languageIds);
    }
}

export const LANGUAGES = new EmptyLanguageBuilder(new Set());
