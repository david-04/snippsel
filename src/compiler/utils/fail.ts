//----------------------------------------------------------------------------------------------------------------------
// Print an error message and exit
//----------------------------------------------------------------------------------------------------------------------

export function fail(message: string) {
    console.error(`⛔ ERROR: ${message}`);
    process.exit(1);
}
