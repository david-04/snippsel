import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { FRAGMENT_ID } from "../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// Ruby
//----------------------------------------------------------------------------------------------------------------------

addSnippets(LANGUAGES.rb, {
    ...FRAGMENT_ID.function,
    body: body.line("def ", VARIABLE(1)).line("\t", CURSOR, SELECTED_TEXT).line("end"),
});
