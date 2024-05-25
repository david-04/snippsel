import { Placeholder } from "./placeholder.js";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type SnippetBodyLine = ReadonlyArray<string | Placeholder>;

//----------------------------------------------------------------------------------------------------------------------
// The body of a snippet
//----------------------------------------------------------------------------------------------------------------------

export class SnippetBody {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    constructor(public readonly lines: ReadonlyArray<SnippetBodyLine>) {}

    //------------------------------------------------------------------------------------------------------------------
    // Create a new body with an extra line
    //------------------------------------------------------------------------------------------------------------------

    line(...segments: SnippetBodyLine) {
        return new SnippetBody([...this.lines, segments]);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Remove leading placeholders
    //------------------------------------------------------------------------------------------------------------------

    withLeadingPlaceholdersRemoved() {
        const [firstLine, ...remainingLines] = this.lines;
        if (firstLine) {
            const [firstItem, ...remainingItems] = firstLine;
            if (firstItem && "string" !== typeof firstItem && false === firstItem.hasPreset()) {
                return new SnippetBody([remainingItems, ...remainingLines]);
            }
        }
        return this;
    }
}

export const body = new SnippetBody([]);
