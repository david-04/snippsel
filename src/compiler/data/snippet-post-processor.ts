import { LanguageId, Languages } from "./language.js";

//----------------------------------------------------------------------------------------------------------------------
// Post-processing rules
//----------------------------------------------------------------------------------------------------------------------

export type StringValueFilter = string | RegExp | ReadonlyArray<string | RegExp>;

export type SnippetPostProcessingFilterConditions = {
    readonly ifLanguage?: LanguageId | Languages;
    readonly ifId?: StringValueFilter;
};

export type SnippetPostProcessingRemoveActions =
    | {
          readonly removeShortcut: StringValueFilter;
          readonly removeVoiceCommand?: StringValueFilter;
      }
    | {
          readonly removeShortcut?: StringValueFilter;
          readonly removeVoiceCommand: StringValueFilter;
      };

export type SnippetPostProcessingDiscardAction = {
    readonly discardSnippet: true;
};

export type SnippetPostProcessingRule = SnippetPostProcessingFilterConditions &
    (SnippetPostProcessingRemoveActions | SnippetPostProcessingDiscardAction);

//----------------------------------------------------------------------------------------------------------------------
// Metadata of a snippet to be post-processed
//----------------------------------------------------------------------------------------------------------------------

export type SnippetMetadata = {
    id: string;
    language: LanguageId;
    shortcuts: ReadonlyArray<string>;
    voiceCommands: ReadonlyArray<string>;
};

//----------------------------------------------------------------------------------------------------------------------
// Post-process a snippet
//----------------------------------------------------------------------------------------------------------------------

export function postProcessSnippet(snippet: SnippetMetadata, rules: ReadonlyArray<SnippetPostProcessingRule>) {
    return rules.reduce(applyRule, snippet);
}

function applyRule(snippet: SnippetMetadata | undefined, rule: SnippetPostProcessingRule): SnippetMetadata | undefined {
    if (!snippet || !matchesRule(snippet, rule)) {
        return snippet;
    }
    if ("discardSnippet" in rule) {
        return undefined;
    }
    if ("removeShortcut" in rule) {
        snippet = {
            ...snippet,
            shortcuts: snippet.shortcuts.filter(shortcut => !matches(shortcut, rule.removeShortcut)),
        };
    }
    if ("removeVoiceCommand" in rule) {
        snippet = {
            ...snippet,
            voiceCommands: snippet.voiceCommands.filter(
                voiceCommand => !matches(voiceCommand, rule.removeVoiceCommand)
            ),
        };
    }
    if (!snippet.shortcuts.length && !snippet.voiceCommands.length) {
        return undefined;
    }
    return snippet;
}

//----------------------------------------------------------------------------------------------------------------------
// Check if a rule applies
//----------------------------------------------------------------------------------------------------------------------

function matchesRule(snippet: SnippetMetadata, rule: SnippetPostProcessingRule) {
    if (undefined !== rule.ifLanguage && !matchesLanguage(snippet, rule.ifLanguage)) {
        return false;
    }
    if (undefined !== rule.ifId && !matches(snippet.id, rule.ifId)) {
        return false;
    }
    return true;
}

function matchesLanguage(snippet: SnippetMetadata, languageOrLanguages: LanguageId | Languages) {
    const languages = "string" === typeof languageOrLanguages ? new Set([languageOrLanguages]) : languageOrLanguages;
    return languages.has(snippet.language);
}

function matches(value: string, filter: StringValueFilter | undefined) {
    return toArray(filter).some(pattern => ("string" === typeof pattern ? value === pattern : value.match(pattern)));
}

function toArray(filter: StringValueFilter | undefined): ReadonlyArray<string | RegExp> {
    if (undefined === filter) {
        return [];
    } else if ("string" === typeof filter || filter instanceof RegExp) {
        return [filter];
    } else {
        return filter;
    }
}
