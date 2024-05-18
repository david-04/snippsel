import { snippetRepository } from "../data/snippet-repository.js";
import { Snippet } from "../data/snippet.js";
import { SHORTCUT_PREFIX } from "../utils/constants.js";
import { shortcutToSnippetName } from "../utils/to-snippet-name.js";
import { writeFile } from "../utils/write-file.js";

//----------------------------------------------------------------------------------------------------------------------
// Create the AutoHotkey files
//----------------------------------------------------------------------------------------------------------------------

export function createAutoHotkeyFiles() {
    const snippets = Array.from(snippetRepository.groupByVsCodeLanguageId().values()).flat();
    const allShortcuts = snippets.flatMap(snippet => Array.from(snippet.shortcuts));
    const uniqueShortcuts = Array.from(new Set(allShortcuts)).sort((a, b) => b.length - a.length || a.localeCompare(b));
    createAutoHotKeyVSCodeHotstrings(uniqueShortcuts);
    createAutoHotKeyVSCodeActions(uniqueShortcuts, snippets);
}

//----------------------------------------------------------------------------------------------------------------------
// Create the VSCode hotstrings
//----------------------------------------------------------------------------------------------------------------------

function createAutoHotKeyVSCodeHotstrings(shortcuts: ReadonlyArray<string>) {
    const hotstrings = shortcuts.map(shortcut => toAutoHotkeyHotstring("VSCodeActions.insertSnippet", shortcut));
    writeFile("dist/autohotkey", "vscode-snippet-hotstrings.ahk", [...hotstrings, ""].join("\n"));
}

function toAutoHotkeyHotstring(dispatcherFunction: string, shortcut: string) {
    const qualifiedSnippetName = sanitizeString(shortcutToSnippetName(shortcut));
    // C ... case-sensitive
    // X ... execute
    // * ... ending character is not required (backed into the hotstring)
    // ? ... trigger even when within a word
    return `:*CX?:${SHORTCUT_PREFIX}${shortcut} :: ${dispatcherFunction}("${qualifiedSnippetName}")`;
}

//----------------------------------------------------------------------------------------------------------------------
// Create the VSCode actions
//----------------------------------------------------------------------------------------------------------------------

function createAutoHotKeyVSCodeActions(shortcuts: ReadonlyArray<string>, snippets: ReadonlyArray<Snippet>) {
    const actions = shortcuts.map(shortcut => toAutoHotkeyAction("this.addSnippet", shortcut, snippets));
    writeFile("dist/autohotkey", "vscode-snippet-actions.ahk", [...actions, ""].join("\n"));
}

function toAutoHotkeyAction(dispatcherFunction: string, shortcut: string, snippets: ReadonlyArray<Snippet>) {
    const hotstring = sanitizeString(`${SHORTCUT_PREFIX}${shortcut}⎵`);
    const snippetId = sanitizeString(getAnySnippetId(snippets, shortcut));
    const qualifiedSnippetName = sanitizeString(shortcutToSnippetName(shortcut));
    return `${dispatcherFunction}("${hotstring}", "${snippetId}", "${qualifiedSnippetName}")`;
}

//----------------------------------------------------------------------------------------------------------------------
// Get the ID of any snippet with the given shortcut
//----------------------------------------------------------------------------------------------------------------------

function getAnySnippetId(snippets: ReadonlyArray<Snippet>, shortcut: string) {
    return snippets.filter(snippet => snippet.shortcuts.has(shortcut))[0]?.id ?? "unknown snippet";
}

//----------------------------------------------------------------------------------------------------------------------
// Sanitize content to be used as a string
//----------------------------------------------------------------------------------------------------------------------

function sanitizeString(text: string) {
    const result = new Array<string>();
    for (let index = 0; index < text.length; index++) {
        const character = text.at(index)!;
        if (['"', "`"].includes(character)) {
            result.push("`");
        }
        result.push(character);
    }
    return result.join("");
}
