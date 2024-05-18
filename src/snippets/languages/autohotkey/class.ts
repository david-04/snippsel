import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//---------------------------------------------------------------------------------------------------------------------
// Class
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...FRAGMENT_ID.class,
    languages: LANGUAGES.ahk,
    body: body //
        .line("class ", VARIABLE(1), " {")
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("}"),
});
