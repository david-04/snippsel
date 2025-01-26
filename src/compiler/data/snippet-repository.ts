import { createPermutations } from "../utils/snippet-permutator.js";
import { PostProcessingRule } from "../utils/snippet-post-processor.js";
import { LanguageBuilder, VSCODE_LANGUAGE_ID_TO_LANGUAGE_ID, VSCodeLanguageId } from "./language.js";
import { SnippetBody } from "./snippet-body.js";
import { PermutableSnippet } from "./snippet-fragment.js";
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
    private readonly snippets = new Array<Snippet>();

    //------------------------------------------------------------------------------------------------------------------
    // Add snippets
    //------------------------------------------------------------------------------------------------------------------

    public addSnippet(snippet: SnippetWithMandatoryLanguages) {
        this.validateAndSave(
            new Snippet({
                id: snippet.id,
                languages: snippet.languages.toLanguages(),
                shortcuts: SnippetRepository.normalizeShortcutsOrVoiceCommands(snippet.shortcuts),
                voiceCommands: SnippetRepository.normalizeShortcutsOrVoiceCommands(snippet.voiceCommands),
                body: snippet.body,
            })
        );
    }

    public addPermutations(
        permutableSnippet: PermutableSnippet,
        postProcessingRules: ReadonlyArray<PostProcessingRule> | undefined
    ) {
        createPermutations({
            fragments: permutableSnippet,
            postProcessingRules: postProcessingRules ?? [],
            save: snippet => this.validateAndSave(snippet),
        });
    }

    private validateAndSave(snippet: Snippet) {
        this.snippets.forEach(existingSnippet => existingSnippet.assertNoConflict(snippet));
        this.snippets.push(snippet);
    }

    public static normalizeShortcutsOrVoiceCommands(stringOrArray: string | ReadonlyArray<string>) {
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
