import { snippetRepository } from "../data/snippet-repository.js";
import { voiceCommandToSnippetName } from "../utils/to-snippet-name.js";
import { writeFile } from "../utils/write-file.js";

// # activate this .talon file if the current app name is "Chrome"
// # you can find app names by running ui.apps() in the REPL
// app.exe: Code.exe
// -
// key(ctrl-shift-0): user.vscode_snippet("@david-04:voiceCommand:try catch")

//----------------------------------------------------------------------------------------------------------------------
// Generate Talon files
//----------------------------------------------------------------------------------------------------------------------

export function createTalonFiles() {
    createVSCodeTalonFile();
}

//----------------------------------------------------------------------------------------------------------------------
// Generate the Talon file for VSCode
//----------------------------------------------------------------------------------------------------------------------

function createVSCodeTalonFile() {
    const lines = ["app.exe: Code.exe", "-"];

    for (const voiceCommand of Array.from(snippetRepository.groupByVoiceCommand().keys()).sort()) {
        const snippetName = voiceCommandToSnippetName(voiceCommand);
        lines.push(`${voiceCommand}: user.vscode_insert_snippet(${JSON.stringify(snippetName)})`);
    }
    lines.push("");
    writeFile("dist/talon", "vscode-snippets.talon", lines.join("\n"));
}
