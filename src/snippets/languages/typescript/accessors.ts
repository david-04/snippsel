import { addSnippets } from "../../../compiler/api.js";
import { LANGUAGES } from "../../../compiler/data/language.js";
import { CURSOR, VARIABLE } from "../../../compiler/data/placeholder.js";
import { body } from "../../../compiler/data/snippet-body.js";
import { fragment, optional, sequence } from "../../../compiler/data/snippet-fragment.js";
import { publicProtectedPrivate } from "./fragments.js";

//---------------------------------------------------------------------------------------------------------------------
// [public|protected|private] get _ () { return this._ }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(publicProtectedPrivate),
        fragment({
            id: "getter",
            shortcuts: ["get", "getter"],
            voiceCommands: ["getter"],
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body //
                .line("get ", VARIABLE(1), "() {")
                .line("\treturn this._", VARIABLE(1), CURSOR, ";")
                .line("}"),
        })
    )
);

//---------------------------------------------------------------------------------------------------------------------
// [public|protected|private] set _ (_) { this._ = _; }
//----------------------------------------------------------------------------------------------------------------------

addSnippets(
    sequence(
        optional(publicProtectedPrivate),
        fragment({
            id: "setter",
            shortcuts: ["set", "setter"],
            voiceCommands: ["setter"],
            languages: LANGUAGES.js.jsx.ts.tsx,
            body: body //
                .line("set ", VARIABLE(1), "(value: ", VARIABLE(2), ") {")
                .line("\tthis._", VARIABLE(1), CURSOR, " = value;")
                .line("}"),
        })
    )
);
