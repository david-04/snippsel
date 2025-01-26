import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { _readonly, _static, publicProtectedPrivate } from "./fragments/keywords.js";

//----------------------------------------------------------------------------------------------------------------------
// [private|protected|public] [static] [readonly] _
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(publicProtectedPrivate),
        optional(_static),
        optional(_readonly),
        fragment({
            id: "[property/parameter]",
            languages: LANGUAGES.ts.tsx,
            shortcuts: ["", "p"],
            voiceCommands: ["", "parameter", "property"],
            body: body.line(VARIABLE(1)),
        })
    ),
    [
        { removeShortcut: "p" }, // "print" wins over "property"
        { removeShortcut: "s" }, // "set" wins over "static"
        { removeShortcut: "ip" }, // "interpolation" wins over "private-property"
        { removeShortcut: /^[iou]$/ }, // "if" wins over "private"
    ]
);
