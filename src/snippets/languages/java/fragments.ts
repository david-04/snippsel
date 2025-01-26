import { LANGUAGES } from "../../../compiler/data/language.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// Java modifiers
//----------------------------------------------------------------------------------------------------------------------

export const _public = fragment({ languages: LANGUAGES.java, ...FRAGMENT_ID.public });
export const _protected = fragment({ languages: LANGUAGES.java, ...FRAGMENT_ID.protected });
export const _private = fragment({ languages: LANGUAGES.java, ...FRAGMENT_ID.private });
export const publicProtectedPrivate = oneOf(_public, _protected, _private);

export const _static = fragment({ languages: LANGUAGES.java, ...FRAGMENT_ID.static });
export const _final = fragment({ languages: LANGUAGES.java, ...FRAGMENT_ID.final });
export const _abstract = fragment({ languages: LANGUAGES.java, ...FRAGMENT_ID.abstract });

export const publicStaticFinal = sequence(optional(publicProtectedPrivate), optional(_static), optional(_final));

export const publicStaticFinalAbstract = oneOf(
    publicStaticFinal,
    sequence(optional(publicProtectedPrivate), _abstract)
);
