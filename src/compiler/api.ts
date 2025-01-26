import { LanguageBuilder } from "./data/language.js";
import {
    OneOfPermutation,
    OptionalPermutation,
    PermutableSnippet,
    SequencePermutation,
} from "./data/snippet-fragment.js";
import {
    SnippetWithMandatoryLanguages,
    SnippetWithOptionalLanguages,
    snippetRepository,
} from "./data/snippet-repository.js";
import { PostProcessingRule } from "./utils/snippet-post-processor.js";

//----------------------------------------------------------------------------------------------------------------------
// Load
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
// Add snippets
//----------------------------------------------------------------------------------------------------------------------

/**
 * Add one or more snippets.
 * @param snippets The snippets to add
 */
export function addSnippets(...snippets: SnippetWithMandatoryLanguages[]): void;

/**
 * Add one or more snippets.
 * @param languages The default languages (can optionally be overridden by each snippet)
 * @param snippets The snippets to add
 */
export function addSnippets(languages: LanguageBuilder, ...snippets: SnippetWithOptionalLanguages[]): void;

/**
 * Generate snippets by permuting fragments.
 * @param permutableSnippet Snippet fragments with permutation instructions (like optional, oneOf or sequence)
 * @param postProcessingRules Filter rules to suppress individual snippets or shortcuts/voice commands
 */
export function addSnippets(
    permutableSnippet: PermutableSnippet,
    postProcessingRules?: ReadonlyArray<PostProcessingRule>
): void;

export function addSnippets(
    param1: LanguageBuilder | SnippetWithMandatoryLanguages | PermutableSnippet,
    ...params: ReadonlyArray<
        SnippetWithOptionalLanguages | SnippetWithMandatoryLanguages | ReadonlyArray<PostProcessingRule> | undefined
    >
) {
    if (param1 instanceof LanguageBuilder) {
        const languages = param1;
        const snippets = params as ReadonlyArray<SnippetWithOptionalLanguages>;
        snippets.map(snippet => ({ languages, ...snippet })).forEach(snippet => snippetRepository.addSnippet(snippet));
    } else if (
        param1 instanceof OneOfPermutation ||
        param1 instanceof SequencePermutation ||
        param1 instanceof OptionalPermutation ||
        "leadingSeparator" in param1
    ) {
        const permutableSnippet = param1;
        const postProcessingRules = params[0] as ReadonlyArray<PostProcessingRule> | undefined;
        snippetRepository.addPermutations(permutableSnippet, postProcessingRules);
    } else {
        const snippets = [param1, ...params] as ReadonlyArray<SnippetWithMandatoryLanguages>;
        snippets.forEach(snippet => snippetRepository.addSnippet(snippet));
    }
}
