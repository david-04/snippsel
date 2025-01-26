import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { exportConstOrLet } from "./export-const-or-let.js";
import { _new, brackets, number, string } from "./fragments.js";

//----------------------------------------------------------------------------------------------------------------------
// Set fragments
//----------------------------------------------------------------------------------------------------------------------

const setId = "set";
const setShortcuts = ["s"];
const setVoiceCommands = ["set"];

const setOfId = `${setId}-[of]`;
const setOfShortcuts = setShortcuts.flatMap(shortcut => [shortcut, `${shortcut}o`]);
const setOfVoiceCommands = setVoiceCommands.flatMap(voiceCommand => [voiceCommand, `${voiceCommand} of`]);

const readonlySetOfId = `readonly-${setOfId}`;
const readonlySetOfShortcuts = setOfShortcuts.flatMap(shortcut => [`r${shortcut}`, `ro${shortcut}`]);
const readonlySetOfVoiceCommands = setOfVoiceCommands.map(voiceCommand => `readonly ${voiceCommand}`);

const setItemTypes = [number, string] as const;

export const setOf = oneOf(
    fragment({
        id: setOfId,
        languages: LANGUAGES.ts.tsx,
        shortcuts: setOfShortcuts,
        voiceCommands: setOfVoiceCommands,
        body: body.line("Set<", VARIABLE(10), ">"),
    }),
    ...setItemTypes.map(type =>
        fragment({
            id: `${setOfId}-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: setOfShortcuts.map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: setOfVoiceCommands.map(voiceCommand => `${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`Set<${type.body}>`),
        })
    )
);

export const readonlySetOf = oneOf(
    fragment({
        id: readonlySetOfId,
        languages: LANGUAGES.ts.tsx,
        shortcuts: readonlySetOfShortcuts,
        voiceCommands: readonlySetOfVoiceCommands,
        body: body.line("ReadonlySet<", VARIABLE(10), ">"),
    }),
    ...setItemTypes.map(type =>
        fragment({
            id: `${readonlySetOfId}-${type.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: readonlySetOfShortcuts.map(shortcut => `${shortcut}${type.shortcut}`),
            voiceCommands: readonlySetOfVoiceCommands.map(voiceCommand => `${voiceCommand} ${type.voiceCommand}`),
            body: body.line(`ReadonlySet<${type.body}>`),
        })
    )
);

//----------------------------------------------------------------------------------------------------------------------
// [Readonly]Set<_>
//----------------------------------------------------------------------------------------------------------------------

addSnippets(oneOf(setOf, readonlySetOf));

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
                id: setId,
                shortcuts: setShortcuts,
                voiceCommands: setVoiceCommands,
                body: body.line("Set"),
            })
        ),
        brackets
    )
);
