import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, optional, sequenceAll } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";
import { _async } from "./modifiers.js";

//----------------------------------------------------------------------------------------------------------------------
// Fragments
//----------------------------------------------------------------------------------------------------------------------

const arrowFunction = fragment({
    ...FRAGMENT_ID.arrowFunction,
    languages: LANGUAGES.js.jsx.ts.tsx,
    body: body.line("(", VARIABLE(1), ") => { ", VARIABLE(2), " }"),
});

const arrowExpression = fragment({
    ...FRAGMENT_ID.arrowExpression,
    languages: LANGUAGES.js.jsx.ts.tsx,
    body: body.line("(", VARIABLE(1), ") => ", VARIABLE(2)),
});

//----------------------------------------------------------------------------------------------------------------------
// Arrow function types
//----------------------------------------------------------------------------------------------------------------------

export const arrowFunctionTypes = [
    // (_) => _
    arrowExpression,
    // (_) => { _ }
    arrowFunction,
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Arrow function values
//----------------------------------------------------------------------------------------------------------------------

export const arrowFunctionValues = [
    // (_) => _
    sequenceAll(optional(_async), arrowExpression),
    // (_) => { _ }
    sequenceAll(optional(_async), arrowFunction),
] as const;

//----------------------------------------------------------------------------------------------------------------------
// Arrow function type-value paris
//----------------------------------------------------------------------------------------------------------------------

export const arrowFunctionTypesAndValues = [
    [arrowExpression, sequenceAll(optional(_async), arrowExpression)],
    [arrowFunction, sequenceAll(optional(_async), arrowFunction)],
] as const;
