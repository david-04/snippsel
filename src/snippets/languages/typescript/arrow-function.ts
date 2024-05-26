//----------------------------------------------------------------------------------------------------------------------
// [async] () =>
//----------------------------------------------------------------------------------------------------------------------

// addSnippets(
//     sequenceAll(
//         arrowFunctionModifiers,
//         fragment({
//             ...FRAGMENT_ID.arrowExpression,
//             languages: LANGUAGES.js.jsx.ts.tsx,
//             body: body.line("(", VARIABLE(1), ") => ", CURSOR, SELECTED_TEXT),
//         })
//     )
// );

//----------------------------------------------------------------------------------------------------------------------
// [async] () => {}
//----------------------------------------------------------------------------------------------------------------------

// addSnippets(
//     sequenceAll(
//         arrowFunctionModifiers,
//         fragment({
//             ...FRAGMENT_ID.arrowFunction,
//             languages: LANGUAGES.js.jsx.ts.tsx,
//             body: body.line("(", VARIABLE(1), ") => {").line("\t", CURSOR, SELECTED_TEXT).line("}"),
//         })
//     )
// );
