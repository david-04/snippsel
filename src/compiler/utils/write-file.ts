import { mkdirSync, writeFileSync } from "fs";

//----------------------------------------------------------------------------------------------------------------------
// Create directory and generate file
//----------------------------------------------------------------------------------------------------------------------

export function writeFile(directory: string, filename: string, fileContent: string) {
    mkdirSync(directory, { recursive: true });
    writeFileSync(`${directory}/${filename}`, fileContent, { encoding: "utf8", flag: "w" });
}
