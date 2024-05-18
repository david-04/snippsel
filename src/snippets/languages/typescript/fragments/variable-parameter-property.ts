import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE, placeholderFragment } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment, oneOf, sequenceAll } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";
import { _const, _let, propertyModifiers, variableModifiers } from "./modifiers.js";

//----------------------------------------------------------------------------------------------------------------------
// [export] const|let
//----------------------------------------------------------------------------------------------------------------------

export const variableDeclaration = sequenceAll(variableModifiers, oneOf(_const, _let), placeholderFragment());

//----------------------------------------------------------------------------------------------------------------------
// #property
// [public|private|protected] [static] [readonly] property[?]
//----------------------------------------------------------------------------------------------------------------------

export const propertyDeclaration = oneOf(
    sequenceAll(
        fragment({ ...FRAGMENT_ID.private, languages: LANGUAGES.js.jsx, body: body.line("#") }),
        fragment({
            ...FRAGMENT_ID.property,
            languages: LANGUAGES.js.jsx,
            body: body.line(VARIABLE(1)),
            leadingSeparator: "",
        })
    ),
    sequenceAll(
        propertyModifiers,
        fragment({
            ...FRAGMENT_ID.parameterOrProperty,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body.line(VARIABLE(1)),
        })
    )
);

//----------------------------------------------------------------------------------------------------------------------
// Any variable, parameter or property
//----------------------------------------------------------------------------------------------------------------------

export const variableOrPropertyDeclaration = oneOf(variableDeclaration, propertyDeclaration);
