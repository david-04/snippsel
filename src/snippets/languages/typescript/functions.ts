import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { functionModifiers } from "./fragments/modifiers.js";

//----------------------------------------------------------------------------------------------------------------------
// [export] [async] function () { }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        functionModifiers,
        fragment({
            ...FRAGMENT_ID.function,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body
                .line("function ", VARIABLE(1), "(", VARIABLE(2), ") {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
