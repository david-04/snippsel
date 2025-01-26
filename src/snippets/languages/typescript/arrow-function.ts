import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { exportConstOrLet } from "./export-const-or-let.js";
import { _async } from "./fragments/keywords.js";

//----------------------------------------------------------------------------------------------------------------------
// [[export] [const|let] _ =] [async] (_) => _
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        optional(_async),
        fragment({
            ...FRAGMENT_ID.arrowExpression,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body.line("(", VARIABLE(10), ") => ", CURSOR, SELECTED_TEXT),
        })
    )
);

//----------------------------------------------------------------------------------------------------------------------
// [[export] [const|let] _ =] [async] (_) => { _ }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        optional(_async),
        fragment({
            ...FRAGMENT_ID.arrowFunction,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body.line("(", VARIABLE(10), ") => {").line("\t", CURSOR, SELECTED_TEXT).line("}"),
        })
    )
);
