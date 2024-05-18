import { LanguageBuilder, Languages } from "./language.js";
import { SnippetBody } from "./snippet-body.js";
import { SnippetRepository } from "./snippet-repository.js";

//----------------------------------------------------------------------------------------------------------------------
// Snippet fragment
//----------------------------------------------------------------------------------------------------------------------

export class SnippetFragment {
    readonly id;
    readonly languages;
    readonly shortcuts;
    readonly voiceCommands;
    readonly body;
    readonly leadingSeparator;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(descriptor: {
        readonly id: string;
        readonly languages: Languages;
        readonly shortcuts: string | ReadonlyArray<string>;
        readonly voiceCommands: string | ReadonlyArray<string>;
        readonly body: SnippetBody | undefined;
        readonly leadingSeparator: string;
    }) {
        this.id = descriptor.id;
        this.languages = descriptor.languages;
        this.shortcuts = SnippetRepository.splitString(descriptor.shortcuts);
        this.voiceCommands = SnippetRepository.splitString(descriptor.voiceCommands);
        this.body = descriptor.body;
        this.leadingSeparator = descriptor.leadingSeparator;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Clone the snippet fragment with a different leadingSeparator
    //------------------------------------------------------------------------------------------------------------------

    public withLeadingSeparator(leadingSeparator: string) {
        return new SnippetFragment({ ...this, leadingSeparator });
    }

    public withoutLeadingSeparator() {
        return new SnippetFragment({ ...this, leadingSeparator: "" });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Data structures for nested snippet fragments
//----------------------------------------------------------------------------------------------------------------------

export class OneOfPermutation {
    public constructor(
        readonly type: "one-of",
        readonly fragments: ReadonlyArray<PermutableSnippet>
    ) {}
}

export class OptionalPermutation {
    public constructor(
        readonly type: "optional",
        readonly fragment: PermutableSnippet
    ) {}
}

export class SequenceAllPermutation {
    public constructor(
        readonly type: "sequence-all",
        readonly fragments: ReadonlyArray<PermutableSnippet>
    ) {}
}

export type PermutableSnippet = SnippetFragment | OptionalPermutation | SequenceAllPermutation | OneOfPermutation;

//----------------------------------------------------------------------------------------------------------------------
// Type guard
//----------------------------------------------------------------------------------------------------------------------

export function isPermutableSnippet(object: unknown): object is PermutableSnippet {
    return (
        object instanceof SnippetFragment ||
        object instanceof OptionalPermutation ||
        object instanceof SequenceAllPermutation ||
        object instanceof OneOfPermutation
    );
}

//----------------------------------------------------------------------------------------------------------------------
// Factory methods to create nested snippet fragment structures
//----------------------------------------------------------------------------------------------------------------------

export function fragment(descriptor: {
    readonly id: string;
    readonly languages: LanguageBuilder;
    readonly shortcuts: string | ReadonlyArray<string>;
    readonly voiceCommands: string | ReadonlyArray<string>;
    readonly body: SnippetBody;
    readonly leadingSeparator?: string;
}) {
    return new SnippetFragment({
        ...descriptor,
        languages: descriptor.languages.toLanguages(),
        leadingSeparator: descriptor.leadingSeparator ?? " ",
    });
}

export function oneOf(...fragments: ReadonlyArray<PermutableSnippet>) {
    return new OneOfPermutation("one-of", fragments);
}

export function oneOrNone(first: PermutableSnippet, ...rest: ReadonlyArray<PermutableSnippet>): OneOfPermutation {
    return new OneOfPermutation("one-of", [optional(first), ...rest]);
}

export function optional(fragments: PermutableSnippet): OptionalPermutation {
    return new OptionalPermutation("optional", fragments);
}

export function sequenceAll(...fragments: ReadonlyArray<PermutableSnippet>): SequenceAllPermutation {
    return new SequenceAllPermutation("sequence-all", fragments);
}
