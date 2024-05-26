import { snippetRepository } from "../data/snippet-repository.js";
import { SHORTCUT_PREFIX } from "../utils/constants.js";
import { shortcutToSnippetName } from "../utils/to-snippet-name.js";
import { writeFile } from "../utils/write-file.js";

//----------------------------------------------------------------------------------------------------------------------
// Create the AutoHotkey files
//----------------------------------------------------------------------------------------------------------------------

export function createAutoHotkeyFiles() {
    createAutoHotKeyVSCodeHotstrings();
    createAutoHotKeyVSCodeActions();
}

//----------------------------------------------------------------------------------------------------------------------
// Create the VSCode hotstrings
//----------------------------------------------------------------------------------------------------------------------

function createAutoHotKeyVSCodeHotstrings() {
    const shortcuts = Array.from(snippetRepository.groupByShortcut().keys()).sort(
        (a, b) => b.length - a.length || a.localeCompare(b)
    );
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

function createAutoHotKeyVSCodeActions() {
    const snippets = Array.from(snippetRepository.groupByShortcut())
        .filter(([_, snippets]) => snippets.some(snippet => snippet.body.containsSelectedTextPlaceholder()))
        .map(([shortcut, snippets]) => ({ shortcut, snippetId: snippets[0]!.id }) as const)
        .sort((a, b) => b.shortcut.length - a.shortcut.length || a.shortcut.localeCompare(b.shortcut));

    const actions = snippets.map(shortcut =>
        toAutoHotkeyAction("this.addSnippet", shortcut.shortcut, shortcut.snippetId)
    );
    writeFile("dist/autohotkey", "vscode-snippet-actions.ahk", [...actions, ""].join("\n"));
}

function toAutoHotkeyAction(dispatcherFunction: string, shortcut: string, snippetId: string) {
    const hotstring = sanitizeString(`${SHORTCUT_PREFIX}${shortcut}⎵`);
    const qualifiedSnippetName = sanitizeString(shortcutToSnippetName(shortcut));
    return `${dispatcherFunction}("${hotstring}", "${sanitizeString(snippetId)}", "${qualifiedSnippetName}")`;
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
