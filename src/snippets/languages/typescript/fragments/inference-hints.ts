import { LANGUAGES } from "../../../../compiler/data/language.js";
import { CURSOR } from "../../../../compiler/data/placeholder.js";
import { body } from "../../../../compiler/data/snippet-body.js";
import { fragment } from "../../../../compiler/data/snippet-fragment.js";

//----------------------------------------------------------------------------------------------------------------------
// as const
//----------------------------------------------------------------------------------------------------------------------

export const asConst = fragment({
    id: "as-const",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "ac",
    voiceCommands: "as const",
    body: body.line("as const"),
});

//----------------------------------------------------------------------------------------------------------------------
// satisfies
//----------------------------------------------------------------------------------------------------------------------

export const _satisfies = fragment({
    id: "satisfies",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "sf",
    voiceCommands: "satisfies",
    body: body.line("satisfies ", CURSOR),
});

//----------------------------------------------------------------------------------------------------------------------
// as const satisfies
//----------------------------------------------------------------------------------------------------------------------

export const asConstSatisfies = fragment({
    id: "as-const-satsifies",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "acs",
    voiceCommands: "as const satisfies",
    body: body.line("as const satisfies ", CURSOR),
});
