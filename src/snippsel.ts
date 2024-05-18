import { readdirSync } from "fs";
import { createAutoHotkeyFiles } from "./compiler/export/create-autohotkey-files.js";
import { createReports } from "./compiler/export/create-report.js";
import { createTalonFiles } from "./compiler/export/create-talon-files.js";
import { createVSCodeSnippets } from "./compiler/export/create-vscode-snippets.js";

//----------------------------------------------------------------------------------------------------------------------
// The main program
//----------------------------------------------------------------------------------------------------------------------

for (const file of readdirSync("build/snippets", { recursive: true }).map(file => file.toString())) {
    if (file.endsWith(".js")) {
        await import(`./snippets/${file}`);
    }
}
createVSCodeSnippets();
createTalonFiles();
createReports();
createAutoHotkeyFiles();
