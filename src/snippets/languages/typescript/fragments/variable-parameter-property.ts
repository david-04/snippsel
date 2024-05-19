import { LANGUAGES } from "../../../../compiler/data/language.js";
import { VARIABLE, placeholder } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { explicitOrImplied, fragment, oneOf, sequence } from "../../../../compiler/data/snippet-fragment.js";
import { FRAGMENT_ID } from "../../../constants/fragment-ids.js";
import { _const, _let, propertyModifiers, variableModifiers } from "./modifiers.js";

//----------------------------------------------------------------------------------------------------------------------
// [export] const
// [export] let
//----------------------------------------------------------------------------------------------------------------------

export const variableDeclaration = sequence(variableModifiers, oneOf(_const, _let), placeholder());

//----------------------------------------------------------------------------------------------------------------------
// #[property]
// [public|private|protected] [static] [readonly] [property]
//----------------------------------------------------------------------------------------------------------------------

const propertyDeclarationJs = sequence(
    fragment({ ...FRAGMENT_ID.private, languages: LANGUAGES.js.jsx, body: body.line("#") }),
    explicitOrImplied(
        fragment({
            ...FRAGMENT_ID.property,
            languages: LANGUAGES.js.jsx,
            leadingSeparator: "",
            body: body.line(VARIABLE(1)),
        })
    )
);

const propertyDeclarationTs = sequence(
    propertyModifiers,
    explicitOrImplied(
        fragment({
            ...FRAGMENT_ID.parameterOrProperty,
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body.line(VARIABLE(1)),
        })
    )
);

export const propertyDeclaration = oneOf(propertyDeclarationJs, propertyDeclarationTs);

//----------------------------------------------------------------------------------------------------------------------
// Any variable, parameter or property
//----------------------------------------------------------------------------------------------------------------------

export const variableOrPropertyDeclaration = oneOf(variableDeclaration, propertyDeclaration);
