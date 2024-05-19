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
    // Clone and manipulate the snippet fragment
    //------------------------------------------------------------------------------------------------------------------

    public withLeadingSeparator(separator: string = " ") {
        return new SnippetFragment({ ...this, leadingSeparator: separator });
    }

    public withoutLeadingSeparator() {
        return this.withLeadingSeparator("");
    }

    public toImplied() {
        return new SnippetFragment({
            id: `${this.id}[implied]`,
            languages: this.languages,
            shortcuts: "",
            voiceCommands: "",
            body: this.body,
            leadingSeparator: this.leadingSeparator,
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Data structures for nested snippet fragments
//----------------------------------------------------------------------------------------------------------------------

export class OneOfPermutation {
    public readonly type = "one-of";

    public constructor(readonly fragments: ReadonlyArray<PermutableSnippet>) {}

    public withLeadingSeparator(separator: string = " "): OneOfPermutation {
        return new OneOfPermutation(this.fragments.map(fragment => fragment.withLeadingSeparator(separator)));
    }

    public withoutLeadingSeparator() {
        return this.withLeadingSeparator("");
    }

    public toImplied(): OneOfPermutation {
        return new OneOfPermutation(this.fragments.map(fragment => fragment.toImplied()));
    }
}

export class OptionalPermutation {
    public readonly type = "optional";

    public constructor(readonly fragment: PermutableSnippet) {}

    public withLeadingSeparator(separator: string = " "): OptionalPermutation {
        return new OptionalPermutation(this.fragment.withLeadingSeparator(separator));
    }

    public withoutLeadingSeparator() {
        return this.withLeadingSeparator("");
    }

    public toImplied(): OptionalPermutation {
        return new OptionalPermutation(this.fragment.toImplied());
    }
}

export class SequencePermutation {
    public readonly type = "sequence";

    public constructor(readonly fragments: ReadonlyArray<PermutableSnippet>) {}

    public withLeadingSeparator(separator: string = " "): SequencePermutation {
        return new SequencePermutation(
            this.fragments.map((fragment, index) => (0 === index ? fragment.withLeadingSeparator(separator) : fragment))
        );
    }

    public withoutLeadingSeparator() {
        return this.withLeadingSeparator("");
    }

    public toImplied(): SequencePermutation {
        return new SequencePermutation(this.fragments.map(fragment => fragment.toImplied()));
    }
}

export type PermutableSnippet = SnippetFragment | OptionalPermutation | SequencePermutation | OneOfPermutation;

//----------------------------------------------------------------------------------------------------------------------
// Type guard
//----------------------------------------------------------------------------------------------------------------------

export function isPermutableSnippet(object: unknown): object is PermutableSnippet {
    return (
        object instanceof SnippetFragment ||
        object instanceof OptionalPermutation ||
        object instanceof SequencePermutation ||
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
    readonly leadingSeparator?: string;
    readonly body: SnippetBody;
    readonly aliases?: ReadonlyArray<{
        readonly id: string;
        readonly languages?: LanguageBuilder;
        readonly shortcuts: string | ReadonlyArray<string>;
        readonly voiceCommands: string | ReadonlyArray<string>;
    }>;
}) {
    const fragment: ConstructorParameters<typeof SnippetFragment>[0] = {
        id: descriptor.id,
        languages: descriptor.languages.toLanguages(),
        shortcuts: descriptor.shortcuts,
        voiceCommands: descriptor.voiceCommands,
        leadingSeparator: descriptor.leadingSeparator ?? " ",
        body: descriptor.body,
    };
    const aliases = (descriptor.aliases ?? []).map(alias => ({
        ...fragment,
        ...alias,
        languages: alias.languages?.toLanguages() ?? fragment.languages,
    }));
    return oneOf(...[fragment, ...aliases].map(fragmentDescriptor => new SnippetFragment(fragmentDescriptor)));
}

export function implied(fragment: PermutableSnippet) {
    return fragment.toImplied();
}

export function explicitOrImplied(fragment: PermutableSnippet) {
    return oneOf(fragment, implied(fragment));
}

export function oneOf(...fragments: ReadonlyArray<PermutableSnippet>) {
    return new OneOfPermutation(fragments);
}

export function oneOrNone(first: PermutableSnippet, ...rest: ReadonlyArray<PermutableSnippet>): OneOfPermutation {
    return new OneOfPermutation([optional(first), ...rest]);
}

export function optional(fragments: PermutableSnippet): OptionalPermutation {
    return new OptionalPermutation(fragments);
}

export function sequence(...fragments: ReadonlyArray<PermutableSnippet>): SequencePermutation {
    return new SequencePermutation(fragments);
}
