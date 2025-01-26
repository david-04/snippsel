import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, oneOf, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { exportConstOrLet } from "./export-const-or-let.js";
import { _new, boolean, brackets, number, string } from "./fragments.js";

//----------------------------------------------------------------------------------------------------------------------
// Map fragments
//----------------------------------------------------------------------------------------------------------------------

const mapId = "map";
const mapShortcuts = ["m"];
const mapVoiceCommands = ["map"];

const mapOfId = `${mapId}-[of]`;
const mapOfShortcuts = mapShortcuts.flatMap(shortcut => [shortcut, `${shortcut}o`]);
const mapOfVoiceCommands = mapVoiceCommands.flatMap(voiceCommand => [voiceCommand, `${voiceCommand} of`]);

const readonlyMapOfId = `readonly-${mapOfId}`;
const readonlyMapOfShortcuts = mapOfShortcuts.flatMap(shortcut => [`r${shortcut}`, `ro${shortcut}`]);
const readonlyMapOfVoiceCommands = mapOfVoiceCommands.map(voiceCommand => `readonly ${voiceCommand}`);

const mapKeyTypes = [number, string];
const mapValueTypes = [boolean, number, string];

export const mapOf = oneOf(
    fragment({
        id: mapOfId,
        languages: LANGUAGES.ts.tsx,
        shortcuts: mapOfShortcuts,
        voiceCommands: mapOfVoiceCommands,
        body: body.line("Map<", VARIABLE(10), ">"),
    }),
    ...mapKeyTypes.map(keyType =>
        fragment({
            id: `${mapOfId}-${keyType.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: mapOfShortcuts.map(shortcut => `${shortcut}${keyType.shortcut}`),
            voiceCommands: mapOfVoiceCommands.map(voiceCommand => `${voiceCommand} ${keyType.voiceCommand}`),
            body: body.line(`Map<${keyType.body},`, VARIABLE(10), ">"),
        })
    ),
    ...mapKeyTypes.flatMap(keyType =>
        mapValueTypes.map(valueType =>
            fragment({
                id: `${mapOfId}-${keyType.id}-[and]-${valueType.id}`,
                languages: LANGUAGES.ts.tsx,
                shortcuts: mapOfShortcuts.flatMap(shortcut => [
                    `${shortcut}${keyType.shortcut}${valueType.shortcut}`,
                    `${shortcut}${keyType.shortcut}a${valueType.shortcut}`,
                ]),
                voiceCommands: mapOfVoiceCommands.flatMap(voiceCommand => [
                    `${voiceCommand} ${keyType.voiceCommand} ${valueType.voiceCommand}`,
                    `${voiceCommand} ${keyType.voiceCommand} and ${valueType.voiceCommand}`,
                ]),
                body: body.line(`Map<${keyType.body},${valueType.body}>`),
            })
        )
    )
);

export const readonlyMapOf = oneOf(
    fragment({
        id: readonlyMapOfId,
        languages: LANGUAGES.ts.tsx,
        shortcuts: readonlyMapOfShortcuts,
        voiceCommands: ["map", "map of"].map(voiceCommand => `readonly ${voiceCommand}`),
        body: body.line("ReadonlyMap<", VARIABLE(10), ">"),
    }),
    ...mapKeyTypes.map(keyType =>
        fragment({
            id: `${readonlyMapOfId}-${keyType.id}`,
            languages: LANGUAGES.ts.tsx,
            shortcuts: readonlyMapOfShortcuts.map(shortcut => `${shortcut}${keyType.shortcut}`),
            voiceCommands: readonlyMapOfVoiceCommands.map(voiceCommand => `${voiceCommand} ${keyType.voiceCommand}`),
            body: body.line(`ReadonlyMap<${keyType.body},`, VARIABLE(10), ">"),
        })
    ),
    ...mapKeyTypes.flatMap(keyType =>
        mapValueTypes.map(valueType =>
            fragment({
                id: `${readonlyMapOfId}-${keyType.id}-[and]-${valueType.id}`,
                languages: LANGUAGES.ts.tsx,
                shortcuts: readonlyMapOfShortcuts.flatMap(shortcut => [
                    `${shortcut}${keyType.shortcut}${valueType.shortcut}`,
                    `${shortcut}${keyType.shortcut}a${valueType.shortcut}`,
                ]),
                voiceCommands: readonlyMapOfVoiceCommands.flatMap(voiceCommand => [
                    `${voiceCommand} ${keyType.voiceCommand} ${valueType.voiceCommand}`,
                    `${voiceCommand} ${keyType.voiceCommand} and ${valueType.voiceCommand}`,
                ]),
                body: body.line(`ReadonlyMap<${keyType.body},${valueType.body}>`),
            })
        )
    )
);

//----------------------------------------------------------------------------------------------------------------------
// [Readonly]Map<_>
//----------------------------------------------------------------------------------------------------------------------

addSnippets(oneOf(mapOf, readonlyMapOf), [
    { removeShortcut: "m" }, // "method" wins over map
]);

//----------------------------------------------------------------------------------------------------------------------
// [[export] const|let _ =] new Map[<_>](_)
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(exportConstOrLet),
        _new,
        oneOf(
            mapOf,
            fragment({
                languages: LANGUAGES.js.jsx,
                id: mapId,
                shortcuts: mapShortcuts,
                voiceCommands: mapVoiceCommands,
                body: body.line("Map"),
            })
        ),
        brackets
    )
);
