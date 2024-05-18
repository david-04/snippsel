import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequenceAll } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { _final, _static, publicProtectedPrivate } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [public|protected|private] [static] [final] enum _ { }
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        optional(publicProtectedPrivate),
        optional(_static),
        optional(_final),
        fragment({
            ...FRAGMENT_ID.enum,
            languages: LANGUAGES.java,
            body: body //
                .line("enum ", VARIABLE(1), " {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
