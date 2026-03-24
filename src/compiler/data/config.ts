export type Config = { readonly shortcutPrefix: string; readonly enableAutoHotkey: boolean } & (
    | {
          readonly enableVoiceCommands: true;
          readonly voiceCommandPrefix: string;
      }
    | {
          readonly enableVoiceCommands: false;
          readonly voiceCommandPrefix?: string;
      }
);
