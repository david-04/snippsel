import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { _export } from "./fragments.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] type _ = _
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(_export),
        fragment({
            languages: LANGUAGES.ts.tsx,
            id: "type-[is]",
            shortcuts: "t",
            voiceCommands: "type",
            body: body.line("type ", VARIABLE(1), " = ", CURSOR),
        })
    )
);

//---------------------------------------------------------------------------------------------------------------------
// [export] type _<_> = _
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(_export),
        fragment({
            languages: LANGUAGES.ts.tsx,
            id: "generic-type-[is]",
            shortcuts: "gt",
            voiceCommands: "generic type",
            body: body.line("type ", VARIABLE(1), "<", VARIABLE(2, "T"), "> = ", CURSOR),
        })
    )
);
