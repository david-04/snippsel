// import { readdirSync } from "node:fs";

// export type ModuleDiscoveryOptions = {
//     rootDirectory: [dirname: string, relativePath?: string] | [importMeta: ImportMeta, relativePath?: string];
// } & ({} | { include: RegExp | ReadonlyArray<RegExp> } | { exclude: RegExp | ReadonlyArray<RegExp> });

// const test: ModuleDiscoveryOptions = {
//     //rootDirectory: [__dirname, "../.."]
//     rootDirectory: [import.meta, "../.."],
// };

// async function discoverAndImportModules() {
//     for (const file of readdirSync("build/snippets", { recursive: true }).map(file => file.toString())) {
//         if (file.endsWith(".js")) {
//             await import(`./snippets/${file}`);
//         }
//     }
// }

// function toDirectory(directoryOrMeta: string | ImportMeta) {
//     j ? directoryOrMeta : ;
//     if ("string" === typeof directoryOrMeta) {
//         return directoryOrMeta;
//     } else {
//         const { url } = directoryOrMeta;
//         if (url.startsWith("file://")) {
//         } else {
//         }
//     }
// }
