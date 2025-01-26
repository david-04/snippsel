import { addSnippets } from "../../../compiler/api.js";
import { oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { is } from "./fragments/conjunctions.js";
import { _const, _export, _let } from "./fragments/keywords.js";
import { identifierPlaceholder, valuePlaceholder } from "./fragments/placeholders.js";

//----------------------------------------------------------------------------------------------------------------------
// [export] const|let _ = _
//----------------------------------------------------------------------------------------------------------------------

export const exportConstOrLet = sequence(optional(_export), oneOf(_const, _let), identifierPlaceholder, is);

addSnippets(sequence(exportConstOrLet, valuePlaceholder));
