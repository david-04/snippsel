import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(LANGUAGES.rb, {
    ...FRAGMENT_ID.function,
    body: body.line("def ", VARIABLE(1)).line("\t", CURSOR, SELECTED_TEXT).line("end"),
});
