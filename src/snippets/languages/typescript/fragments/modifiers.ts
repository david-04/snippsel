import { LANGUAGES } from "../../../../compiler/data/language.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";

//----------------------------------------------------------------------------------------------------------------------
// Atomic modifiers
//----------------------------------------------------------------------------------------------------------------------

export const _export = fragment({ languages: LANGUAGES.js.jsx.ts.tsx, ...FRAGMENT_ID.export });

export const _public = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.public });
export const _protected = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.protected });
export const _private = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.private });
export const publicProtectedPrivate = oneOf(_public, _protected, _private);

export const _static = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.static });
export const _abstract = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.abstract });
export const _readonly = fragment({ languages: LANGUAGES.ts.tsx, ...FRAGMENT_ID.readonly });
export const _async = fragment({ languages: LANGUAGES.js.jsx.ts.tsx, ...FRAGMENT_ID.async });

export const _const = fragment({ ...FRAGMENT_ID.const, languages: LANGUAGES.js.jsx.ts.tsx, body: body.line("const") });
export const _let = fragment({ ...FRAGMENT_ID.let, languages: LANGUAGES.js.jsx.ts.tsx, body: body.line("let") });

//----------------------------------------------------------------------------------------------------------------------
// Combined optional modifiers
//----------------------------------------------------------------------------------------------------------------------

export const classModifiers = sequence(optional(_export), optional(_abstract));
export const interfaceModifiers = optional(_export);
export const enumModifiers = optional(_export);
export const namespaceModifiers = optional(_export);

export const functionModifiers = sequence(optional(_export), optional(_async));
export const arrowFunctionModifiers = optional(_async);
export const methodModifiers = sequence(optional(publicProtectedPrivate), optional(_static), optional(_async));
export const constructorModifiers = optional(publicProtectedPrivate);

export const variableModifiers = optional(_export);
export const propertyModifiers = sequence(optional(publicProtectedPrivate), optional(_static), optional(_readonly));
export const typeModifiers = optional(_export);
