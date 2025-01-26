import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { asConst } from "./as-const-satisfies.js";
import { exportConstOrLet } from "./export-const-or-let.js";
import { array, arrayOfType, brackets, readonlyArrayOfType } from "./fragments/container-types.js";
import { _new } from "./fragments/keywords.js";

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] [_] [as const]
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        fragment({
            languages: LANGUAGES.js.jsx.ts.tsx,
            ...array,
            body: body.line("[", CURSOR, SELECTED_TEXT, "]"),
        }),
        optional(asConst)
    ),
    [
        { ifId: "array", discardSnippet: true }, // already defined in "common"
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [Readonly]Array<_>(_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(oneOf(arrayOfType, readonlyArrayOfType), brackets), //
    [
        { ifId: "array-[of]", discardSnippet: true }, // already defined in "common"
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] new Array(_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        _new,
        fragment({
            languages: LANGUAGES.js.jsx,
            ...array,
            body: body.line("Array"),
        }),
        brackets
    )
);

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] new Array<_>(_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(sequence(optional(exportConstOrLet), _new, arrayOfType, brackets));
