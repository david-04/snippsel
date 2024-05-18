import { Placeholder } from "../data/placeholder.js";
import { snippetRepository } from "../data/snippet-repository.js";
import { Snippet } from "../data/snippet.js";
import { shortcutToSnippetName, voiceCommandToSnippetName } from "../utils/to-snippet-name.js";
import { writeFile } from "../utils/write-file.js";

//----------------------------------------------------------------------------------------------------------------------
// Data structures
//----------------------------------------------------------------------------------------------------------------------

type VSCodeSnippet = {
    readonly description: string;
    readonly prefix: ReadonlyArray<string> | undefined;
    readonly body: string | ReadonlyArray<string>;
};

//----------------------------------------------------------------------------------------------------------------------
// Create and save VSCode snippets
//----------------------------------------------------------------------------------------------------------------------

export function createVSCodeSnippets() {
    snippetRepository.groupByVsCodeLanguageId().forEach((snippets, vsCodeLanguageId) => {
        const vscodeSnippets = snippets.flatMap(toVsCodeSnippetStrings);
        writeFile("dist/vscode", `${vsCodeLanguageId}.json`, `{\n${vscodeSnippets.join(",\n")}\n}\n`);
    });
}

//----------------------------------------------------------------------------------------------------------------------
// Render all snippets
//----------------------------------------------------------------------------------------------------------------------

function toVsCodeSnippetStrings(snippet: Snippet) {
    return [
        ...Array.from(snippet.shortcuts).map(shortcut =>
            toVsCodeSnippet(snippet, shortcutToSnippetName(shortcut), shortcut)
        ),
        ...Array.from(snippet.voiceCommands).map(voiceCommand =>
            toVsCodeSnippet(snippet, voiceCommandToSnippetName(voiceCommand))
        ),
    ] as const;
}

//----------------------------------------------------------------------------------------------------------------------
// Render a single snippet
//----------------------------------------------------------------------------------------------------------------------

function toVsCodeSnippet(snippet: Snippet, name: string, shortcut?: string) {
    const definition: VSCodeSnippet = {
        description: snippet.id,
        prefix: shortcut ? [shortcut] : undefined,
        body: snippet.body.lines.map(toVsCodeSnippetLine).join("\n"),
    };
    return `    ${JSON.stringify(name)}: ${JSON.stringify(definition)}`;
}

//----------------------------------------------------------------------------------------------------------------------
// Render one snippet body line
//----------------------------------------------------------------------------------------------------------------------

function toVsCodeSnippetLine(line: string | Placeholder | ReadonlyArray<string | Placeholder>) {
    return (Array.isArray(line) ? line : [line])
        .map(component => ("string" === typeof component ? sanitizeVsCodeSnippetText(component) : component.toVSCode()))
        .join("");
}

function sanitizeVsCodeSnippetText(text: string) {
    return text.replaceAll("$", "\\$"); //.replaceAll("{", "\\{").replaceAll("}", "\\}");
}
