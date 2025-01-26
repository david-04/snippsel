import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { _satisfies, asConst } from "./as-const-satisfies.js";
import { exportConstOrLet } from "./export-const-or-let.js";

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] { } [as const] [satisfies]
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        fragment({
            languages: LANGUAGES.js.jsx.ts.tsx,
            id: "object",
            shortcuts: "o",
            voiceCommands: "object",
            body: body.line("{ ", CURSOR, SELECTED_TEXT, " }"),
        }),
        optional(asConst),
        optional(_satisfies)
    )
);
