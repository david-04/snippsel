import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequenceAll } from "../../../compiler/data/snippet-fragment.js";
import { snippetRepository } from "../../../compiler/data/snippet-repository.js";
import { FRAGMENT_ID } from "../../constants/fragment-ids.js";
import { enumModifiers } from "./fragments/modifiers.js";

//---------------------------------------------------------------------------------------------------------------------
// [export] enum _ { }
//----------------------------------------------------------------------------------------------------------------------

snippetRepository.add(
    sequenceAll(
        enumModifiers,
        fragment({
            ...FRAGMENT_ID.enum,
            languages: LANGUAGES.ts.tsx,
            body: body //
                .line("enum ", VARIABLE(1), " {")
                .line("\t", CURSOR, SELECTED_TEXT)
                .line("}"),
        })
    )
);
