import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";

const COMMENT_BLOCK = { id: "comment-block", shortcuts: "/", voiceCommands: "comment block" } as const;

function dashes(length: number) {
    return new Array(length).fill("-").join("");
}

//----------------------------------------------------------------------------------------------------------------------
// Comment block
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    {
        ...COMMENT_BLOCK,
        languages: LANGUAGES.ahk,
        body: body.line(";", dashes(119)).line("; ", CURSOR).line(";", dashes(119)),
    },
    {
        ...COMMENT_BLOCK,
        languages: LANGUAGES.awk.ini.make.rb.sh,
        body: body.line("#", dashes(119)).line("# ", CURSOR).line("#", dashes(119)),
    },
    {
        ...COMMENT_BLOCK,
        languages: LANGUAGES.bat,
        body: body.line("REM ", dashes(116)).line("REM ", CURSOR).line("REM ", dashes(116)),
    },
    {
        ...COMMENT_BLOCK,
        languages: LANGUAGES.c.css,
        body: body.line("/*", dashes(118)).line("// ", CURSOR).line("//", dashes(116), "*/"),
    },
    {
        ...COMMENT_BLOCK,
        languages: LANGUAGES.sql,
        body: body.line("-- ", dashes(117)).line("-- ", CURSOR).line("-- ", dashes(117)),
    }
);

//----------------------------------------------------------------------------------------------------------------------
// JavaDoc
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(LANGUAGES.java.js.jsx.ts.tsx, {
    id: "javadoc",
    shortcuts: "jd",
    voiceCommands: "javadoc",
    body: body.line("/** ", CURSOR, SELECTED_TEXT, " */"),
});
