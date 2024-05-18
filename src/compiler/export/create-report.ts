import { LANGUAGE_IDS, LanguageId, VSCodeLanguageId } from "../data/language.js";
import { snippetRepository } from "../data/snippet-repository.js";
import { Snippet } from "../data/snippet.js";
import { writeFile } from "../utils/write-file.js";

const SEPARATOR_LINE = "".padEnd(120, "-");

//----------------------------------------------------------------------------------------------------------------------
// Create reports
//----------------------------------------------------------------------------------------------------------------------

export function createReports() {
    snippetRepository.groupByVsCodeLanguageId().forEach(createReportForOneLanguage);
    createReportForAllLanguages();
}

//----------------------------------------------------------------------------------------------------------------------
// Create a report for one language
//----------------------------------------------------------------------------------------------------------------------

function createReportForOneLanguage(snippets: ReadonlyArray<Snippet>, languageId: VSCodeLanguageId) {
    const shortcutToSnippetId = new Array<[string, string]>();
    let maxShortcutLength = 0;
    for (const snippet of snippets) {
        for (const shortcut of snippet.shortcuts) {
            shortcutToSnippetId.push([shortcut, snippet.id]);
            maxShortcutLength = Math.max(maxShortcutLength, shortcut.length);
        }
    }
    shortcutToSnippetId.sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLocaleLowerCase()));
    createCsvFileForOneLanguage(languageId, shortcutToSnippetId);
    createTxtFileForOneLanguage(languageId, shortcutToSnippetId, maxShortcutLength);
}

function createCsvFileForOneLanguage(
    languageId: VSCodeLanguageId,
    shortcutToSnippetId: ReadonlyArray<[string, string]>
) {
    const csv = [`${languageId} shortcut,snippet`, ...shortcutToSnippetId.map(item => item.join(",")), ""];
    writeFile("dist/reports", `${languageId}.csv`, csv.join("\n"));
}

function createTxtFileForOneLanguage(
    languageId: VSCodeLanguageId,
    shortcutToSnippetId: ReadonlyArray<[string, string]>,
    maxShortcutLength: number
) {
    const header = [SEPARATOR_LINE, languageId, SEPARATOR_LINE, ""];
    const report = shortcutToSnippetId
        .map(
            ([shortcut, snippetId]) =>
                `${shortcut} ${" ".padEnd(4 + maxShortcutLength - shortcut.length, ".")} ${snippetId}`
        )
        .sort();
    writeFile("dist/reports", `${languageId}.txt`, [...header, ...report, ""].join("\n"));
}

//----------------------------------------------------------------------------------------------------------------------
// Create the report for all languages
//----------------------------------------------------------------------------------------------------------------------

function createReportForAllLanguages() {
    const shortcutToSnippets = snippetRepository.groupByShortcut();
    const shortcuts = Array.from(shortcutToSnippets.keys()).sort();
    const languageIds = [...LANGUAGE_IDS].sort();
    const maxShortcutLength = shortcuts.reduce((maxLength, shortcut) => Math.max(maxLength, shortcut.length), 0);
    createCsvFileForAllLanguages(shortcuts, languageIds, shortcutToSnippets);
    createTxtFileForAllLanguages(shortcuts, maxShortcutLength, shortcutToSnippets);
}

function createCsvFileForAllLanguages(
    shortcuts: ReadonlyArray<string>,
    languageIds: ReadonlyArray<LanguageId>,
    shortcutToSnippets: ReadonlyMap<string, ReadonlyArray<Snippet>>
) {
    const rows = new Array<ReadonlyArray<string>>();
    rows.push(["shortcut", ...languageIds]);
    for (const shortcut of shortcuts) {
        const snippetIdColumns = languageIds.map(languageId => {
            return shortcutToSnippets.get(shortcut)?.filter(snippet => snippet.languages.has(languageId))[0]?.id ?? "";
        });
        rows.push([shortcut, ...snippetIdColumns]);
    }
    writeFile("dist/reports/all", "all-languages.csv", rows.map(row => row.join(",")).join("\n"));
}

function createTxtFileForAllLanguages(
    shortcuts: ReadonlyArray<string>,
    maxShortcutLength: number,
    shortcutToSnippets: ReadonlyMap<string, ReadonlyArray<Snippet>>
) {
    const lines = [SEPARATOR_LINE, "Shortcuts", SEPARATOR_LINE, ""];
    for (const shortcut of shortcuts) {
        const padding = "".padEnd(4 + maxShortcutLength - shortcut.length, ".");
        const idsWithLanguage = renderIdsWithLanguages(shortcutToSnippets.get(shortcut) ?? []);
        lines.push(`${shortcut} ${padding} ${idsWithLanguage}`);
    }
    writeFile("dist/reports/all", "all-languages.txt", lines.join("\n"));
}

function renderIdsWithLanguages(snippets: ReadonlyArray<Snippet>) {
    const groups = new Array<string>();
    const ids = Array.from(new Set(snippets.map(snippet => snippet.id))).sort();
    ids.forEach(id => {
        const snippetsForId = snippets.filter(snippet => snippet.id === id);
        const languages = new Set<LanguageId>();
        snippetsForId.forEach(snippet => snippet.languages.forEach(languageId => languages.add(languageId)));
        const concatenatedLanguages = Array.from(languages).sort().join(",");
        groups.push(`${id} (${concatenatedLanguages})`);
    });
    return groups.join(" ");
}
