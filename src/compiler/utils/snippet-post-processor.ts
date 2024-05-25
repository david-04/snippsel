import { LANGUAGES, LanguageId, Languages } from "../data/language.js";
import { Snippet } from "../data/snippet.js";

//----------------------------------------------------------------------------------------------------------------------
// Post-processing rules
//----------------------------------------------------------------------------------------------------------------------

export type StringValueFilter = string | RegExp | ReadonlyArray<string | RegExp>;

export type PostProcessingConditions = {
    readonly ifId?: StringValueFilter;
    readonly ifLanguage?: LanguageId | Languages;
};

export type PostProcessingActions = {
    readonly discardSnippet?: true;
    readonly removeShortcut?: StringValueFilter;
    readonly removeVoiceCommand?: StringValueFilter;
    readonly removeLeadingPlaceholder?: boolean;
};

export type PostProcessingRule = PostProcessingConditions & PostProcessingActions;

//----------------------------------------------------------------------------------------------------------------------
// Metadata of a snippet to be post-processed
//----------------------------------------------------------------------------------------------------------------------

export type PermutedSnippet = Omit<ConstructorParameters<typeof Snippet>[0], "languages"> & { language: LanguageId };

//----------------------------------------------------------------------------------------------------------------------
// Process a snippet
//----------------------------------------------------------------------------------------------------------------------

export function postProcessSnippet(rules: ReadonlyArray<PostProcessingRule>, snippet: PermutedSnippet) {
    return rules.reduce(applyRule, snippet);
}

function applyRule(snippet: PermutedSnippet | undefined, rule: PostProcessingRule) {
    if (CONDITION_CHECKERS.reduce((matches, checker) => matches && checker(snippet, rule), true)) {
        return Object.values(ACTION_HANDLERS).reduce<PermutedSnippet | undefined>(
            (previousSnippet, currentAction) => currentAction(previousSnippet, rule),
            snippet
        );
    } else {
        return snippet;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Condition checkers
//----------------------------------------------------------------------------------------------------------------------

const CONDITION_CHECKERS = Object.values({
    ...toConditionChecker("ifId", (snippet, ifId) => matches(snippet.id, ifId)),
    ...toConditionChecker("ifLanguage", (snippet, ifLanguage) => matchesLanguage(snippet, ifLanguage)),
} as const satisfies Record<keyof PostProcessingConditions, unknown>);

function toConditionChecker<KEY extends keyof PostProcessingConditions>(
    key: KEY,
    handler: (snippet: PermutedSnippet, condition: NonNullable<PostProcessingConditions[KEY]>) => boolean
) {
    const wrappedHandler = (snippet: PermutedSnippet | undefined, rule: PostProcessingRule) => {
        const condition = rule[key];
        return snippet ? !condition || handler(snippet, condition) : false;
    };
    return { [key]: wrappedHandler } as Readonly<Record<KEY, typeof wrappedHandler>>;
}

function matchesLanguage(snippet: PermutedSnippet, ifLanguage: LanguageId | Languages | undefined) {
    const languageOrLanguages = ifLanguage ?? LANGUAGES.all.toLanguages();
    const languages = "string" === typeof languageOrLanguages ? new Set([languageOrLanguages]) : languageOrLanguages;
    return languages.has(snippet.language);
}

function matches(value: string, filter: StringValueFilter) {
    const array = "string" === typeof filter || filter instanceof RegExp ? [filter] : filter;
    return array.some(pattern => ("string" === typeof pattern ? value === pattern : value.match(pattern)));
}

//----------------------------------------------------------------------------------------------------------------------
// Action handlers
//----------------------------------------------------------------------------------------------------------------------

const ACTION_HANDLERS = Object.values({
    ...toActionHandler("discardSnippet", (snippet, discardSnippet) => (discardSnippet ? undefined : snippet)),
    ...toActionHandler("removeShortcut", (snippet, removeShortcut) => ({
        shortcuts: snippet.shortcuts.filter(shortcut => !removeShortcut || !matches(shortcut, removeShortcut)),
    })),
    ...toActionHandler("removeVoiceCommand", (snippet, removeVoiceCommand) => ({
        voiceCommands: snippet.voiceCommands.filter(
            voiceCommand => !removeVoiceCommand || !matches(voiceCommand, removeVoiceCommand)
        ),
    })),
    ...toActionHandler("removeLeadingPlaceholder", (snippet, removeLeadingPlaceholder) => ({
        body: removeLeadingPlaceholder ? snippet.body.withLeadingPlaceholdersRemoved() : snippet.body,
    })),
} as const satisfies Record<keyof PostProcessingActions, unknown>);

function toActionHandler<KEY extends keyof PostProcessingActions>(
    key: KEY,
    handler: (snippet: PermutedSnippet, action: PostProcessingActions[KEY]) => Partial<PermutedSnippet> | undefined
) {
    const wrappedHandler = (snippet: PermutedSnippet | undefined, rule: PostProcessingRule) => {
        const partialSnippet = snippet && handler(snippet, rule[key]);
        return partialSnippet && { ...snippet, ...partialSnippet };
    };
    return { [key]: wrappedHandler } as Readonly<Record<KEY, typeof wrappedHandler>>;
}
