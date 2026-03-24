# snippsel

A utility to define code snippets through a TypeScript API and generate snippet definitions for VSCode.

## Defining simple snippets

This example shows how to define a single snippet:

```typescript
addSnippets({
    id: "for-each-index",
    // the snippet can be exported for multiple languages
    languages: LANGUAGES.js.jsx.ts.tsx,
    // the snippet can haves multiple shortcuts
    shortcuts: ["f", "fe", "fei"],
    // fluent API to to create the snippet body
    body: body
        .line(
            "for (let ",
            VARIABLE(1, "index"), // placeholders with preset values
            " = ",
            VARIABLE(2, "0"),
            "; ",
            VARIABLE(1), // can reference previous placeholders
            " < ",
            VARIABLE(3, "100"),
            "; ",
            VARIABLE(1),
            "++) {"
        )
        // specify where to insert selected text
        // and where to put the cursor at the end
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("}"),
});
```

Using placeholders like `VARIABLE`, `CURSOR` and `SELECTED_TEXT` creates an abstracted representation of the code snippet in memory. This representation can be translated into the specific snippet language of any editor. However, at the moment, only VSCode is supported.

## Snippet permutations

Where `snippsel` really shines is when it comes to generating permutations - to quickly generate a comprehensive set of code snippet variations. For example, the simplest possible class method definition in TypeScript would look like this:

```typescript
/* shortcut: m   */ method() { }
```

Class methods can also have an optional access modifier like `public` or `private`. This adds three variations of the "method" snippet:

```typescript
/* shortcut: um  */ public    method() { }
/* shortcut: om  */ protected method() { }
/* shortcut: im  */ private   method() { }
```

Methods can also be `static`, which doubles the amount of snippets defined so far:

```typescript
/* shortcut: sm   */           static method() { }

/* shortcut: usm  */ public    static method() { }
/* shortcut: osm  */ protected static method() { }
/* shortcut: ism  */ private   static method() { }
```

Methods can also be `async`, which - once more - doubles the amount of snippets:

```typescript
/* shortcut: am   */                  async method() { }

/* shortcut: uam  */ public           async method() { }
/* shortcut: oam  */ protected        async method() { }
/* shortcut: iam  */ private          async method() { }

/* shortcut:  sam */           static async method() { }
/* shortcut: usam */ public    static async method() { }
/* shortcut: osam */ protected static async method() { }
/* shortcut: isam */ private   static async method() { }
```

It requires a total of 16 code snippets to cover all possible scenarios.

`snippsel` supports snippets at scale by defining small fragments and combining them based on rules into all possible permutations.

## Defining fragments

In `snippsel`, each component of a code fragment can be defined as a re-usable fragment:

```typescript
//-----------------------------------------------------------------------------
// The method itself
//-----------------------------------------------------------------------------

const _method = fragment({
    id: "method",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "m",
    body: body //
        .line(VARIABLE(1), "(", VARIABLE(2), ") {")
        .line("\t", CURSOR, SELECTED_TEXT)
        .line("}"),
});

//-----------------------------------------------------------------------------
// Access modifiers
//-----------------------------------------------------------------------------

const _public = fragment({
    id: "public",
    languages: LANGUAGES.ts.tsx,
    shortcuts: ["u", "pub"],
    body: body.line("public"),
});

const _protected = fragment({
    id: "protected",
    languages: LANGUAGES.ts.tsx,
    shortcuts: ["o", "pro"],
    body: body.line("protected"),
});

const _private = fragment({
    id: "private",
    languages: LANGUAGES.ts.tsx,
    shortcuts: ["i", "pri"],
    body: body.line("private"),
});

//-----------------------------------------------------------------------------
// static
//-----------------------------------------------------------------------------

const _static = fragment({
    id: "static",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "s",
    body: body.line("static"),
});

//-----------------------------------------------------------------------------
// async
//-----------------------------------------------------------------------------

const _async = fragment({
    id: "async",
    languages: LANGUAGES.js.jsx.ts.tsx,
    shortcuts: "a",
    body: body.line("async"),
});
```

Each fragment defines the languages that it is valid for. While the plain method itself is valid in JavaScript and TypeScript, the access modifiers like `public` and `private` are only valid in TypeScript.

Each fragment (or snippet) can also have more than one shortcut associated with it. For example, the `public` fragment would create a snippet with the shortcut `u` and another one with the shortcut `pub`.

## Creating permutations

`snippsel` can use fragments (as defined above) to create permutations:

```typescript
addSnippets(
    sequence(
        optional(oneOf(_public, _protected, _private)),
 	    optional(_static),
        optional(_async),
        _method
    )
);
```

`snippsel` creates all possible combinations. However, it only generates each snippet only for those languages that are supported by all fragments that form the snippet.

A permutation like `static method` or `static async method` would generate JavaScript and TypeScript snippets. But permutations like `private method` or `public async method` would only generate TypeScript snippets.

The fragments' shortcuts are permutated as well. The `public` fragment contains the two shortcuts `u` and `pub`. This will export the snippet for `public method` under two different shortcuts: `um` and `pubm`.

## Filtering out permutations

Permuting fragments can create a large number of snippets. Some of them might accidentally have the same shortcut. They can be filtered out when generating the permutations:

```typescript
addSnippets(
    sequence(optional(oneOf(_public, _protected, _private)), optional(_static), optional(_async), _method),
    // filter rules
    [
        {
            // condition: pick at least one
            ifId: "static-method", // only apply to the snippet with this id
            ifLanguage: LANGUAGES.ts.tsx.toLanguages(), // only apply to these languages
            // action: pick one of them
            removeShortcut: "pubm", // remove this one shortcut (but keep the rest)
            discardSnippet: true, // discard the whole snippet (with all shortcuts)
        },
        // add more filter rules here...
    ]
);

```

Each rule has a condition (e.g. which snippet ID and/or languages it applies to) and an action (e.g. remove shortcuts or discard the snippet altogether). The string-based operators (`ifId` and `removeShortcut`) accept multiple values as an array and/or regular expression, e.g.

- `"static-method"`
- `["public-method", "public-static-method"]`
- `/^public-(static-)?method$/`
- `["static-method", /.*public.*/]`

## How to use

Clone this repository and replace the files in `src/snippets` with your own code snippets. There is no need to import these files anywhere. The main application will traverse through the `snippets` directory and import all files automatically.

Review the configuration on top of [src/snippsel.ts](src/snippsel.ts) and set the `shortcutPrefix` either to an empty string or to whatever prefix you want prepended to each shortcut. Then either compile and run the application:

```shell
tsc -b && node build/snippsel.js
```

...or run the application directly, e.g.:

```shell
tsx src/snippsel.ts
```

The application can generate different files (depending on the configuration):

- `dist/reports` contains text and CSV reports, listing all generated shortcuts.
- `dist/vscode` contains VSCode snippets. Copy these files into your VSCode user data directory.
- `dist/talon` contains files for Talon voice recognition. This feature is deprecated. Don't use
- `dist/autohotkey` contains files for AutoHotkey. The file format is unstable and subject to change in the future.
