import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequenceAll } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { methodModifiers } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [public|protected|private] [static] [async] _ () { }
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        methodModifiers,
        fragment({
            ...FRAGMENT_ID.method,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body //
                .line(VARIABLE(1), "(", VARIABLE(2), ") {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
