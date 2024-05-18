import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequenceAll } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { publicStaticFinalAbstract } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [public|protected|private] [static] [final] [abstract] class _ { }
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        publicStaticFinalAbstract,
        fragment({
            ...FRAGMENT_ID.class,
            languages: LANGUAGES.java,
            body: body //
                .line("class ", VARIABLE(1), " {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
