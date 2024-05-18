import { EMPTY_SHORTCUT } from "../utils/constants.js";
import { fail } from "../utils/fail.js";
import { LanguageId, Languages } from "./language.js";
import { SnippetBody } from "./snippet-body.js";

//----------------------------------------------------------------------------------------------------------------------
// Representation of a snippet
//----------------------------------------------------------------------------------------------------------------------

export class Snippet {
    public readonly id;
    public readonly languages;
    public readonly shortcuts;
    public readonly voiceCommands;
    public readonly body;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(descriptor: {
        readonly id: string;
        readonly languages: Languages;
        readonly shortcuts: ReadonlyArray<string>;
        readonly voiceCommands: ReadonlyArray<string>;
        readonly body: SnippetBody;
    }) {
        this.id = descriptor.id;
        this.languages = descriptor.languages;
        this.shortcuts = Snippet.trimAndRemoveEmptyStrings(descriptor.shortcuts);
        this.voiceCommands = Snippet.trimAndRemoveEmptyStrings(descriptor.voiceCommands);
        this.body = descriptor.body;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Normalize shortcuts or voice commands
    //------------------------------------------------------------------------------------------------------------------

    private static trimAndRemoveEmptyStrings(array: ReadonlyArray<string>): ReadonlySet<string> {
        return new Set(
            array
                .map(element => element.trim())
                .filter(element => element)
                .map(element => (element === EMPTY_SHORTCUT ? "" : element))
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // Assert that there is no conflict (same shortcut or voice command) with this snippet
    //------------------------------------------------------------------------------------------------------------------

    public assertNoConflict(snippet: Snippet) {
        const firstSharedLanguage = this.languages.getFirstSharedLanguage(snippet.languages);
        if (firstSharedLanguage) {
            if (this.id === snippet.id) {
                fail(`Duplicate id "${this.id}" for ${firstSharedLanguage}`);
            }
            this.assertNoConflictForShortcut(snippet, firstSharedLanguage);
            this.assertNoConflictForVoiceCommand(snippet, firstSharedLanguage);
        }
    }

    private assertNoConflictForShortcut(snippet: Snippet, language: LanguageId) {
        for (const shortcut of this.shortcuts) {
            if (snippet.shortcuts.has(shortcut)) {
                fail(`Duplicate shortcut "${shortcut}" for ${language}: ${this.id} and ${snippet.id}`);
            }
        }
    }

    private assertNoConflictForVoiceCommand(snippet: Snippet, language: LanguageId) {
        for (const voiceCommand of this.voiceCommands) {
            if (snippet.voiceCommands.has(voiceCommand)) {
                fail(`Duplicate voice command "${voiceCommand}" for ${language}: ${this.id} and ${snippet.id}`);
            }
        }
    }
}
