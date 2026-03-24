import { readdirSync } from "node:fs";
import { Config } from "./compiler/data/config.js";
import { createAutoHotkeyFiles } from "./compiler/export/create-autohotkey-files.js";
import { createReports } from "./compiler/export/create-report.js";
import { createTalonFiles } from "./compiler/export/create-talon-files.js";
import { createVSCodeSnippets } from "./compiler/export/create-vscode-snippets.js";

//----------------------------------------------------------------------------------------------------------------------
// Configuration
//----------------------------------------------------------------------------------------------------------------------

const config: Config = {
    // Prepended to every shortcut - set to empty string to not prepend anything
    shortcutPrefix: "@david-04:shortcut:",
    // Generate Talon voice commands
    enableVoiceCommands: false,
    // If voice commands are enabled, this will be prepended to every voice command identifier
    voiceCommandPrefix: "@david-04:voiceCommand:",
    // Generate AutoHotkey files (subject to change - not stable yet)
    enableAutoHotkey: true,
};

//----------------------------------------------------------------------------------------------------------------------
// Import all snippets
//----------------------------------------------------------------------------------------------------------------------

const isCompiled = /.*\.ts$/.test(import.meta.url);
const [rootDirectory, fileExtension] = isCompiled ? ["src/snippets", ".ts"] : ["build/snippets", ".js"];

for (const file of readdirSync(rootDirectory, { recursive: true }).map(file => file.toString())) {
    if (file.endsWith(fileExtension)) {
        await import(`./snippets/${file}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Generate files
//----------------------------------------------------------------------------------------------------------------------

createVSCodeSnippets(config);
createTalonFiles(config);
createReports();
createAutoHotkeyFiles(config);
