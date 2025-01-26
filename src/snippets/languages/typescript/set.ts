import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { exportConstOrLet } from "./export-const-or-let.js";
import { brackets, readonlySetOf, set, setOf } from "./fragments/container-types.js";
import { _new } from "./fragments/keywords.js";

//----------------------------------------------------------------------------------------------------------------------
// [Readonly]Set<_>(_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(sequence(oneOf(setOf, readonlySetOf), brackets));

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] new Set[<_>](_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        _new,
        oneOf(
            setOf,
            fragment({
                languages: LANGUAGES.js.jsx,
                ...set,
                body: body.line("Set"),
            })
        ),
        brackets
    )
);
