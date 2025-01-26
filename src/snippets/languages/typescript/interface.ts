import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { _export } from "./fragments.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] interface _ { _ }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(_export),
        fragment({
            ...FRAGMENT_ID.interface,
            languages: LANGUAGES.ts.tsx,
            body: body //
                .line("interface ", VARIABLE(1), " {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
