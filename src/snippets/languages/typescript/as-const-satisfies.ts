import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, sequence } from "../../../compiler/data/snippet-fragment.js";

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

addSnippets(asConst);

//----------------------------------------------------------------------------------------------------------------------
// satisfies
//----------------------------------------------------------------------------------------------------------------------

export const _satisfies = fragment({
    id: "satisfies",
    languages: LANGUAGES.ts.tsx,
    shortcuts: "sf",
    voiceCommands: "satisfies",
    body: body.line("satisfies "),
});

addSnippets(_satisfies);

//----------------------------------------------------------------------------------------------------------------------
// as const satisfies
//----------------------------------------------------------------------------------------------------------------------

export const asConstSatisfies = sequence(
    asConst,
    fragment({
        id: "satisfies",
        languages: LANGUAGES.ts.tsx,
        shortcuts: "s",
        voiceCommands: "satisfies",
        body: body.line("satisfies "),
    })
);

addSnippets(asConstSatisfies);
