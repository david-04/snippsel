import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// () ->
//----------------------------------------------------------------------------------------------------------------------

addSnippets({
    ...FRAGMENT_ID.arrowExpression,
    languages: LANGUAGES.java,
    body: body.line("(", VARIABLE(1), ") -> ", CURSOR, SELECTED_TEXT),
});

//----------------------------------------------------------------------------------------------------------------------
// () -> { }
//----------------------------------------------------------------------------------------------------------------------

addSnippets({
    ...FRAGMENT_ID.arrowFunction,
    languages: LANGUAGES.java,
    body: body.line("(", VARIABLE(1), ") -> {").line("\t", CURSOR, SELECTED_TEXT).line("}"),
});
