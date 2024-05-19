import { createPermutations } from "../utils/snippet-permutator.js";
import { LanguageBuilder, VSCODE_LANGUAGE_ID_TO_LANGUAGE_ID, VSCodeLanguageId } from "./language.js";
import { SnippetBody } from "./snippet-body.js";
import { OneOfPermutation, OptionalPermutation, PermutableSnippet, SequencePermutation } from "./snippet-fragment.js";
import { SnippetPostProcessingRule } from "./snippet-post-processor.js";
import { Snippet } from "./snippet.js";

//----------------------------------------------------------------------------------------------------------------------
// Interface for defining snippet data
//----------------------------------------------------------------------------------------------------------------------

export type SnippetBase = {
    readonly id: string;
    readonly shortcuts: string | ReadonlyArray<string>;
    readonly voiceCommands: string | ReadonlyArray<string>;
    readonly body: SnippetBody;
};

export type SnippetWithOptionalLanguages = SnippetBase & { readonly languages?: LanguageBuilder };
export type SnippetWithMandatoryLanguages = SnippetBase & { readonly languages: LanguageBuilder };

//----------------------------------------------------------------------------------------------------------------------
// Collection of all snippets
//----------------------------------------------------------------------------------------------------------------------

export class SnippetRepository {
    private snippets = new Array<Snippet>();

    //------------------------------------------------------------------------------------------------------------------
    // Add snippets
    //------------------------------------------------------------------------------------------------------------------

    public add(languages: LanguageBuilder, ...snippets: SnippetWithOptionalLanguages[]): void;
    public add(...snippets: SnippetWithMandatoryLanguages[]): void;
    public add(
        permutableSnippet: PermutableSnippet,
        postProcessingRules?: ReadonlyArray<SnippetPostProcessingRule>
    ): void;
    public add(
        param1: LanguageBuilder | SnippetWithMandatoryLanguages | PermutableSnippet,
        ...params: ReadonlyArray<
            | SnippetWithOptionalLanguages
            | SnippetWithMandatoryLanguages
            | ReadonlyArray<SnippetPostProcessingRule>
            | undefined
        >
    ) {
        if (param1 instanceof LanguageBuilder) {
            this.addWithDefaultLanguage(param1, params as ReadonlyArray<SnippetWithOptionalLanguages>);
        } else if (
            param1 instanceof OneOfPermutation ||
            param1 instanceof SequencePermutation ||
            param1 instanceof OptionalPermutation ||
            "leadingSeparator" in param1
        ) {
            this.addPermutations(param1, params[0] as ReadonlyArray<SnippetPostProcessingRule> | undefined);
        } else {
            this.addWithDefaultLanguage(param1.languages, [
                param1,
                ...(params as ReadonlyArray<SnippetWithMandatoryLanguages>),
            ]);
        }
        return this;
    }

    private addWithDefaultLanguage(languages: LanguageBuilder, snippets: ReadonlyArray<SnippetWithOptionalLanguages>) {
        snippets
            .map(snippet => SnippetRepository.toSnippet(languages, snippet))
            .forEach(snippet => {
                this.snippets.forEach(existingSnippet => existingSnippet.assertNoConflict(snippet));
                this.snippets.push(snippet);
            });
    }

    private addPermutations(
        permutableSnippet: PermutableSnippet,
        postProcessingRules: ReadonlyArray<SnippetPostProcessingRule> | undefined
    ) {
        createPermutations({
            fragments: permutableSnippet,
            postProcessingRules: postProcessingRules ?? [],
            save: snippet => {
                this.snippets.forEach(existingSnippet => existingSnippet.assertNoConflict(snippet));
                this.snippets.push(snippet);
            },
        });
    }

    private static toSnippet(languages: LanguageBuilder, snippet: SnippetWithOptionalLanguages) {
        return new Snippet({
            id: snippet.id,
            languages: (snippet.languages ?? languages).toLanguages(),
            shortcuts: this.splitString(snippet.shortcuts),
            voiceCommands: this.splitString(snippet.voiceCommands),
            body: snippet.body,
        });
    }

    public static splitString(stringOrArray: string | ReadonlyArray<string>) {
        return "string" === typeof stringOrArray ? stringOrArray.split(",") : stringOrArray;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Group by VSCode language ID
    //------------------------------------------------------------------------------------------------------------------

    public groupByVsCodeLanguageId(): ReadonlyMap<VSCodeLanguageId, ReadonlyArray<Snippet>> {
        const result = new Map<VSCodeLanguageId, ReadonlyArray<Snippet>>();
        for (const vsCodeLanguageId of Object.keys(VSCODE_LANGUAGE_ID_TO_LANGUAGE_ID) as VSCodeLanguageId[]) {
            const languageId = VSCODE_LANGUAGE_ID_TO_LANGUAGE_ID[vsCodeLanguageId];
            if (languageId) {
                const snippets = this.snippets.filter(snippet => snippet.languages.has(languageId));
                if (snippets.length) {
                    result.set(vsCodeLanguageId, snippets);
                }
            }
        }
        return result;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Group by shortcut
    //------------------------------------------------------------------------------------------------------------------

    public groupByShortcut(): ReadonlyMap<string, ReadonlyArray<Snippet>> {
        const result = new Map<string, Array<Snippet>>();
        this.snippets.forEach(snippet => {
            snippet.shortcuts.forEach(shortcut => {
                const array = result.get(shortcut) ?? [];
                array.push(snippet);
                result.set(shortcut, array);
            });
        });
        return result;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Group by voice command
    //------------------------------------------------------------------------------------------------------------------

    public groupByVoiceCommand(): ReadonlyMap<string, ReadonlyArray<Snippet>> {
        const result = new Map<string, Array<Snippet>>();
        this.snippets.forEach(snippet => {
            snippet.voiceCommands.forEach(voiceCommand => {
                const array = result.get(voiceCommand) ?? [];
                array.push(snippet);
                result.set(voiceCommand, array);
            });
        });
        return result;
    }
}

export const snippetRepository = new SnippetRepository();
