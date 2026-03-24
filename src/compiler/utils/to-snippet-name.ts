import { Config } from "../data/config.js";

export function shortcutToSnippetName(shortcut: string, config: Config) {
    return `${config.shortcutPrefix}${shortcut}`;
}

export function voiceCommandToSnippetName(shortcut: string, config: Config) {
    return `${config.voiceCommandPrefix ?? ""}${shortcut}`;
}
