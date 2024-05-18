import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//---------------------------------------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...FRAGMENT_ID.constructor,
    languages: LANGUAGES.ahk,
    body: body //
        .line("__New(", VARIABLE(1), ") {")
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("}"),
});
