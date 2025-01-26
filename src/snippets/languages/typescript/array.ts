import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, SELECTED_TEXT, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { asConst } from "./as-const-satisfies.js";
import { exportConstOrLet } from "./export-const-or-let.js";
import { _new, boolean, brackets, number, string } from "./fragments.js";

//----------------------------------------------------------------------------------------------------------------------
// Array fragments
//----------------------------------------------------------------------------------------------------------------------

const arrayId = "array";
const arrayShortcuts = ["a"];
const arrayVoiceCommands = ["array"];

const arrayOfId = `${arrayId}-[of]`;
const arrayOfShortcuts = arrayShortcuts.flatMap(shortcut => [shortcut, `${shortcut}o`]);
const arrayOfVoiceCommands = arrayVoiceCommands.flatMap(voiceCommand => [voiceCommand, `${voiceCommand} of`]);

const readonlyArrayOfId = `readonly-${arrayOfId}`;
const readonlyArrayOfShortcuts = arrayOfShortcuts.flatMap(shortcut => [`r${shortcut}`, `ro${shortcut}`]);
const readonlyArrayOfVoiceCommands = arrayOfVoiceCommands.map(voiceCommand => `readonly ${voiceCommand}`);

const arrayItemTypes = [boolean, number, string] as const;

const arrayOf = oneOf(
    fragment({
        id: arrayOfId,
        languages: LANGUAGES.ts.tsx,
        shortcuts: arrayOfShortcuts,
        voiceCommands: arrayOfVoiceCommands,
        body: body.line("Array<", VARIABLE(10), ">"),
    }),
    ...arrayItemTypes.map(type =>
        fragment({
            id: `${arrayOfId}-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: arrayOfShortcuts.map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: arrayOfVoiceCommands.map(voiceCommand => `${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`Array<${type.body}>`),
        })
    )
);

const readonlyArrayOf = oneOf(
    fragment({
        id: readonlyArrayOfId,
        languages: LANGUAGES.ts.tsx,
        shortcuts: readonlyArrayOfShortcuts,
        voiceCommands: readonlyArrayOfVoiceCommands,
        body: body.line("ReadonlyArray<", VARIABLE(10), ">"),
    }),
    ...arrayItemTypes.map(type =>
        fragment({
            id: `${readonlyArrayOfId}-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: readonlyArrayOfShortcuts.map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: readonlyArrayOfVoiceCommands.map(voiceCommand => `${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`ReadonlyArray<${type.body}>`),
        })
    )
);

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] [_] [as const]
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        fragment({
            id: "array",
            languages: LANGUAGES.js.jsx.ts.tsx,
            shortcuts: "a",
            voiceCommands: "array",
            body: body.line("[", CURSOR, SELECTED_TEXT, "]"),
        }),
        optional(asConst)
    ),
    [
        { ifId: "array", discardSnippet: true }, // already defined in "common"
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [Readonly]Array<_>
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    oneOf(arrayOf, readonlyArrayOf), //
    [
        { removeShortcut: "a" }, // already defined in "common"
        { removeVoiceCommand: /^(array)$/ }, // already defined in "common"
    ]
);

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] new Array[<_>](_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        _new,
        oneOf(
            arrayOf,
            fragment({
                id: arrayId,
                languages: LANGUAGES.js.jsx,
                shortcuts: arrayShortcuts,
                voiceCommands: arrayVoiceCommands,
                body: body.line("Array"),
            })
        ),
        brackets
    )
);
