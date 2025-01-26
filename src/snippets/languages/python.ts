import { addSnippets } from "../../compiler/api.js";
import { LANGUAGES } from "../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../compiler/data/placeholder.js";
import { body } from "../../compiler/data/snippet-body.js";
import { FRAGMENT_ID } from "../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// AWK
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    LANGUAGES.py,
    {
        ...FRAGMENT_ID.function,
        body: body.line("def ", VARIABLE(1), "(", VARIABLE(2), "):").line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...FRAGMENT_ID.class,
        body: body.line("class ", VARIABLE(1), ":").line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...FRAGMENT_ID.constructor,
        body: body.line("__init__(self", VARIABLE(1), "):").line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...FRAGMENT_ID.method,
        body: body.line("def ", VARIABLE(1), "(self", VARIABLE(2), "):").line("\t", CURSOR, SELECTED_TEXT),
    },
    {
        ...FRAGMENT_ID.enum,
        body: body
            .line("from enum import Enum")
            .line("")
            .line("class ", VARIABLE(1), "(Enum):")
            .line("\t", VARIABLE(2, "FIRST = 1\n\tSECOND = 2")),
    }
);
