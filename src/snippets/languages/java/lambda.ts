import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// () ->
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...FRAGMENT_ID.arrowExpression,
    languages: LANGUAGES.java,
    body: body.line("(", VARIABLE(1), ") -> ", CURSOR, SELECTED_TEXT),
});

//----------------------------------------------------------------------------------------------------------------------
// () -> { }
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add({
    ...FRAGMENT_ID.arrowFunction,
    languages: LANGUAGES.java,
    body: body.line("(", VARIABLE(1), ") -> {").line("\t", CURSOR, SELECTED_TEXT).line("}"),
});
