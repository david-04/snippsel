import { LanguageBuilder, LanguageId, Languages } from "../data/language.js";
import { CURSOR, Placeholder, VariablePlaceholder } from "../data/placeholder.js";
import { SnippetBody, SnippetBodyLine, body } from "../data/snippet-body.js";
import {
    OneOfPermutation,
    OptionalPermutation,
    PermutableSnippet,
    SequenceAllPermutation,
    SnippetFragment,
} from "../data/snippet-fragment.js";
import { SnippetMetadata, SnippetPostProcessingRule, postProcessSnippet } from "../data/snippet-post-processor.js";
import { Snippet } from "../data/snippet.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

type Permutation = ReadonlyArray<SnippetFragment>;
type PermutationResult = ReadonlyArray<Permutation>;

export type PermutationOperations = {
    postProcessingRules: ReadonlyArray<SnippetPostProcessingRule>;
    save: (snippet: Snippet) => void;
};

export type PermutationOptions = PermutationOperations & { fragments: PermutableSnippet };

//----------------------------------------------------------------------------------------------------------------------
// Create permutations
//----------------------------------------------------------------------------------------------------------------------

export function createPermutations(options: PermutationOptions) {
    calculatePermutations(options.fragments).forEach(permutation => validateAndSavePermutation(permutation, options));
}

//----------------------------------------------------------------------------------------------------------------------
// Calculate permutations
//----------------------------------------------------------------------------------------------------------------------

function calculatePermutations(permutableSnippet: PermutableSnippet): PermutationResult {
    if (permutableSnippet instanceof SnippetFragment) {
        return [[permutableSnippet]];
    } else {
        switch (permutableSnippet.type) {
            case "one-of":
                return calculatePermutationsOneOf(permutableSnippet);
            case "optional":
                return calculatePermutationsOptional(permutableSnippet);
            case "sequence-all":
                return calculatePermutationsSequenceAll(permutableSnippet);
        }
    }
}

function calculatePermutationsOneOf(permutableSnippet: OneOfPermutation): PermutationResult {
    return permutableSnippet.fragments.flatMap(fragment => calculatePermutations(fragment));
}

function calculatePermutationsOptional(permutableSnippet: OptionalPermutation): PermutationResult {
    return [[], ...calculatePermutations(permutableSnippet.fragment)];
}

function calculatePermutationsSequenceAll(permutableSnippet: SequenceAllPermutation): PermutationResult {
    return cartesianProduct(permutableSnippet.fragments.map(calculatePermutations)).map(item => item.flat());
}

//----------------------------------------------------------------------------------------------------------------------
// Validate, filter and store permutations
//----------------------------------------------------------------------------------------------------------------------

function validateAndSavePermutation(permutation: Permutation, operations: PermutationOperations) {
    const languages = getSharedLanguages(permutation);
    languages?.forEach(language => {
        const snippet = assembleSnippet(permutation, language, operations.postProcessingRules);
        if (snippet) {
            operations.save(snippet);
        }
    });
}

function getSharedLanguages(permutation: Permutation) {
    const [first, ...rest] = permutation;
    let languages: Languages | undefined = first?.languages;
    for (const snippetFragment of rest) {
        languages = languages?.intersection(snippetFragment.languages);
    }
    return languages;
}

//----------------------------------------------------------------------------------------------------------------------
// Assemble a snippet's metadata
//----------------------------------------------------------------------------------------------------------------------

function assembleSnippet(
    permutation: Permutation,
    language: LanguageId,
    postProcessingRules: ReadonlyArray<SnippetPostProcessingRule>
) {
    const originalSnippetMetadata: SnippetMetadata = {
        id: assembleId(permutation),
        language,
        shortcuts: assembleShortcuts(permutation),
        voiceCommands: assembleVoiceCommands(permutation),
    };
    const postProcessedSnippetMetadata = postProcessSnippet(originalSnippetMetadata, postProcessingRules);
    if (postProcessedSnippetMetadata) {
        return new Snippet({
            id: postProcessedSnippetMetadata.id,
            languages: new LanguageBuilder(new Set(), language).toLanguages(),
            shortcuts: postProcessedSnippetMetadata.shortcuts,
            voiceCommands: postProcessedSnippetMetadata.voiceCommands,
            body: assembleBody(permutation),
        });
    }
    return undefined;
}

function assembleId(permutation: Permutation) {
    return permutation
        .map(fragment => fragment.id)
        .map(id => id.trim())
        .filter(id => id)
        .join("-");
}

function assembleShortcuts(permutation: Permutation) {
    return cartesianProduct(permutation.map(fragment => fragment.shortcuts)).map(array => array.join(""));
}

function assembleVoiceCommands(permutation: Permutation) {
    return cartesianProduct(permutation.map(fragment => fragment.voiceCommands)).map(array => array.join(" "));
}

//----------------------------------------------------------------------------------------------------------------------
// Assemble a snippet's body
//----------------------------------------------------------------------------------------------------------------------

function assembleBody(permutation: Permutation) {
    let currentLine = new Array<string | Placeholder>();
    const lines: Array<Array<string | Placeholder>> = [];
    for (const snippetFragment of permutation) {
        if (currentLine.length && snippetFragment.leadingSeparator && snippetFragment.body) {
            currentLine.push(snippetFragment.leadingSeparator);
        }
        snippetFragment.body?.lines.forEach((line, index) => {
            if (index) {
                lines.push(currentLine);
                currentLine = [];
            }
            currentLine.push(...line);
        });
    }
    if (currentLine.length) {
        lines.push(currentLine);
    }
    const concatenatedBody = lines.reduce((previous, current) => previous.line(...current), body);
    let placeholderCount = 0;
    const normalizedLines = concatenatedBody.lines.map(line => {
        const result = normalizeBodyLine(line, placeholderCount);
        placeholderCount = result.placeholderCount;
        return result.normalizedLine;
    });
    return new SnippetBody(replaceLastPlaceholderWithCursor(normalizedLines, placeholderCount));
}

function normalizeBodyLine(line: SnippetBodyLine, placeholderCount: number) {
    const normalizedLine = new Array<string | VariablePlaceholder>();
    line.forEach(lineItem => {
        if ("string" === typeof lineItem) {
            if (normalizedLine.length && "string" === normalizedLine[normalizedLine.length - 1]) {
                normalizedLine[normalizedLine.length - 1] += lineItem;
            } else {
                normalizedLine.push(lineItem);
            }
        } else {
            const previousLineItem = normalizedLine[normalizedLine.length - 1];
            if (undefined === previousLineItem || "string" === typeof previousLineItem) {
                normalizedLine.push(normalizePlaceholder(undefined, lineItem, ++placeholderCount));
            } else {
                normalizedLine.push(normalizePlaceholder(previousLineItem, lineItem, ++placeholderCount));
            }
        }
    });
    return { placeholderCount, normalizedLine };
}

function normalizePlaceholder(
    placeholder1: VariablePlaceholder | undefined,
    placeholder2: Placeholder,
    placeholderIndex: number
) {
    return placeholder1
        ? placeholder1.cloneAndAppend(placeholder2)
        : VariablePlaceholder.of(placeholderIndex, placeholder2);
}

function replaceLastPlaceholderWithCursor(lines: Array<Array<string | Placeholder>>, placeholderCount: number) {
    return lines.map(line =>
        line.map(item =>
            item instanceof VariablePlaceholder && item.index === placeholderCount && !item.presetValue ? CURSOR : item
        )
    );
}

//----------------------------------------------------------------------------------------------------------------------
// Calculate the cartesian
//----------------------------------------------------------------------------------------------------------------------

function cartesianProduct<T>(groups: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<ReadonlyArray<T>> {
    return groups.reduce((result, currentGroup) => {
        if (result.length) {
            return result.flatMap(combinedSoFar => currentGroup.map(currentValue => [...combinedSoFar, currentValue]));
        } else {
            return currentGroup.map(item => [item]);
        }
    }, new Array<ReadonlyArray<T>>());
}
