import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { classModifiers } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] class _ { }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        classModifiers,
        fragment({
            ...FRAGMENT_ID.class,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body //
                .line("class ", VARIABLE(1), " {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
