import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { FRAGMENT_ID } from "../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// Shell script
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.sh,
    {
        id: "cd",
        shortcuts: "cd,cds,csh",
        voiceCommands: "c d",
        body: body.line('cd "$(dirname "${BASH_SOURCE[0]}")" || exit').line(""),
    },
    {
        id: "disable-shellcheck",
        shortcuts: "ds,dsc",
        voiceCommands: "disable shellcheck",
        body: body.line("# shellcheck disable=SC", CURSOR, SELECTED_TEXT),
    },
    {
        id: "exit-on-error",
        shortcuts: "eoe,xoe,foe",
        voiceCommands: "exit on error,fail on error",
        body: body.line("set -e -o pipefail").line(""),
    },
    {
        ...FRAGMENT_ID.function,
        body: body.line("function ", VARIABLE(1), "(", VARIABLE(2), ") {").line("\t", CURSOR, SELECTED_TEXT).line("}"),
    },
    {
        id: "return-or-exit",
        shortcuts: "roe",
        voiceCommands: "return or exit",
        body: body
            .line("# shellcheck disable=SC2317")
            .line("return ", VARIABLE(1, "1"), " 2>/dev/stderr || exit ", VARIABLE(1)),
    },
    {
        id: "shebang",
        shortcuts: "sb",
        voiceCommands: "shebang,shebang line",
        body: body.line("#!/usr/bin/env bash").line(""),
    }
);
