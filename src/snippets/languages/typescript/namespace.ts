import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { namespaceModifiers } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] namespace _ { }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        namespaceModifiers,
        fragment({
            ...FRAGMENT_ID.namespace,
            languages: LANGUAGES.ts.tsx,
            body: body //
                .line("namespace ", VARIABLE(1), " {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    ),
    [
        { removeShortcut: "ns" }, // "new-set" wins over "namespace"
    ]
);
