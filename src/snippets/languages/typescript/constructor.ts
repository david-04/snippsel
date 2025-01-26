import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { publicProtectedPrivate } from "./fragments/keywords.js";

//---------------------------------------------------------------------------------------------------------------------
// [private|protected|public] constructor(_) { _ }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(publicProtectedPrivate),
        fragment({
            ...FRAGMENT_ID.constructor,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body //
                .line("constructor(", VARIABLE(1), ") {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
