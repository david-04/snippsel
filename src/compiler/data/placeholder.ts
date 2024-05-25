//----------------------------------------------------------------------------------------------------------------------
// Placeholder for the final cursor position
//----------------------------------------------------------------------------------------------------------------------

import { LANGUAGES } from "./language.js";
import { body } from "./snippet-body.js";
import { PermutableSnippet, fragment } from "./snippet-fragment.js";

export class CursorPlaceholder {
    static readonly INSTANCE = new CursorPlaceholder();

    private constructor() {}

    hasPreset() {
        return false;
    }

    toVSCode() {
        return "$0";
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Placeholder for the the previously selected text
//----------------------------------------------------------------------------------------------------------------------

export class SelectedTextPlaceholder {
    static readonly INSTANCE = new SelectedTextPlaceholder();

    private constructor() {}

    hasPreset() {
        return false;
    }

    toVSCode() {
        return "$TM_SELECTED_TEXT";
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Placeholder for variables
//----------------------------------------------------------------------------------------------------------------------

export class VariablePlaceholder {
    public constructor(
        public readonly index: number,
        public readonly presetValue: string | undefined
    ) {}

    static of(index: number, placeholder: Placeholder) {
        const presetValue = placeholder instanceof VariablePlaceholder ? placeholder.presetValue : undefined;
        return new VariablePlaceholder(index, presetValue);
    }

    cloneAndAppend(placeholder: Placeholder) {
        const textToAppend = placeholder instanceof VariablePlaceholder ? placeholder.presetValue ?? "" : "";
        const concatenatedText = (this.presetValue ?? "") + textToAppend || undefined;
        return new VariablePlaceholder(this.index, concatenatedText);
    }

    hasPreset() {
        return !!this.presetValue?.trim();
    }

    toVSCode() {
        return this.presetValue ? `\${${this.index}:${this.presetValue ?? ""}}` : `\$${this.index}`;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Union of all placeholder types
//----------------------------------------------------------------------------------------------------------------------

export type Placeholder = CursorPlaceholder | SelectedTextPlaceholder | VariablePlaceholder;

//----------------------------------------------------------------------------------------------------------------------
// Factory
//----------------------------------------------------------------------------------------------------------------------

export const CURSOR = CursorPlaceholder.INSTANCE;
export const SELECTED_TEXT = SelectedTextPlaceholder.INSTANCE;
export const VARIABLE = (index: number, presetValue?: string) => new VariablePlaceholder(index, presetValue);

export function placeholder(): PermutableSnippet;
export function placeholder(index: number, presetValue?: string): PermutableSnippet;
export function placeholder(presetValue: string): PermutableSnippet;
export function placeholder(indexOrPresetValue?: number | string, presetValue?: string): PermutableSnippet {
    return fragment({
        id: "",
        languages: LANGUAGES.all,
        shortcuts: "",
        voiceCommands: "",
        body: body.line(
            VARIABLE(
                "number" === typeof indexOrPresetValue ? indexOrPresetValue : 1,
                "string" === typeof indexOrPresetValue ? indexOrPresetValue : presetValue
            )
        ),
    });
}
