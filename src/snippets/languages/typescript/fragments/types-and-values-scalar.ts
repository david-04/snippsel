import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf, sequenceAll } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";
import { or } from "./conjunctions.js";

//----------------------------------------------------------------------------------------------------------------------
// Scalar data types
//----------------------------------------------------------------------------------------------------------------------

export const _undefined = fragment({ ...FRAGMENT_ID.undefined, languages: LANGUAGES.js.jsx.ts.tsx });
export const _boolean = fragment({ ...FRAGMENT_ID.boolean, languages: LANGUAGES.ts.tsx });
export const _number = fragment({ ...FRAGMENT_ID.number, languages: LANGUAGES.ts.tsx });
export const _string = fragment({ ...FRAGMENT_ID.string, languages: LANGUAGES.ts.tsx, body: body.line("string") });

export const scalarTypes = [_boolean, _number, _string] as const;

//----------------------------------------------------------------------------------------------------------------------
// Scalar values
//----------------------------------------------------------------------------------------------------------------------

export const _true = fragment({ ...FRAGMENT_ID.true, languages: LANGUAGES.js.jsx.ts.tsx });
export const _false = fragment({ ...FRAGMENT_ID.false, languages: LANGUAGES.js.jsx.ts.tsx });
export const zero = fragment({ ...FRAGMENT_ID.zero, languages: LANGUAGES.js.jsx.ts.tsx });
export const one = fragment({ ...FRAGMENT_ID.one, languages: LANGUAGES.js.jsx.ts.tsx });

export const stringLiteral = fragment({
    ...FRAGMENT_ID.string,
    id: '""',
    languages: LANGUAGES.ts.tsx,
    body: body.line('"', VARIABLE(10), '"'),
});

export const scalarValues = [_undefined, _true, _false, zero, one, stringLiteral] as const;

//----------------------------------------------------------------------------------------------------------------------
// Combinations of data types and values
//----------------------------------------------------------------------------------------------------------------------

export const scalarTypesAndValues = [
    [_boolean, oneOf(_true, _false)],
    [sequenceAll(_boolean, or, _undefined), oneOf(_true, _false, _undefined)],
    [_number, oneOf(zero, one)],
    [sequenceAll(_number, or, _undefined), oneOf(zero, one, _undefined)],
    [_string, stringLiteral],
    [sequenceAll(_string, or, _undefined), oneOf(stringLiteral, _undefined)],
] as const;
