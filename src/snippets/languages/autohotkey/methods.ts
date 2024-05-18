import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequenceAll } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { _static } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [static] _ () { }
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        optional(_static),
        fragment({
            ...FRAGMENT_ID.method,
            languages: LANGUAGES.ahk,
            body: body //
                .line(VARIABLE(1, "method"), "(", VARIABLE(2), ") {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
