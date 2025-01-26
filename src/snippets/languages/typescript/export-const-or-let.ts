import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { is } from "./fragments/conjunctions.js";
import { _const, _export, _let } from "./fragments/keywords.js";

//----------------------------------------------------------------------------------------------------------------------
// [export] const|let _ = _
//----------------------------------------------------------------------------------------------------------------------

export const exportConstOrLet = sequence(
    optional(_export),
    oneOf(_const, _let),
    fragment({
        id: "[value]",
        languages: LANGUAGES.js.jsx.ts.tsx,
        shortcuts: "",
        voiceCommands: "",
        body: body.line(VARIABLE(1)),
    }),
    is
);

addSnippets(
    sequence(
        exportConstOrLet,
        fragment({
            id: "[identifier]",
            languages: LANGUAGES.js.jsx.ts.tsx,
            shortcuts: "",
            voiceCommands: "",
            body: body.line(CURSOR),
        })
    )
);

//----------------------------------------------------------------------------------------------------------------------
// [export] const|let _ = "_"
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        exportConstOrLet,
        fragment({
            id: "string",
            languages: LANGUAGES.js.jsx.ts.tsx,
            shortcuts: "s",
            voiceCommands: "string",
            body: body.line('"', SELECTED_TEXT, CURSOR, '"'),
        })
    )
);
