import { LANGUAGES } from "../../../compiler/data/language.js";
import { fragment } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// AutoHotkey modifiers
//----------------------------------------------------------------------------------------------------------------------

export const _static = fragment({ languages: LANGUAGES.ahk, ...FRAGMENT_ID.static });
