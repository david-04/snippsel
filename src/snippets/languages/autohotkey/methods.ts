import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { _static } from "./fragments.js";

//---------------------------------------------------------------------------------------------------------------------
// [static] _ () { }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(_static),
        fragment({
            ...FRAGMENT_ID.method,
            languages: LANGUAGES.ahk,
            body: body //
                .line(VARIABLE(1), "(", VARIABLE(2), ") {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
