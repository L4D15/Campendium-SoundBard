// Declare that "ready" has run so fvtt-types narrows `game` to the fully-initialized
// shape — eliminating `| undefined` from settings, i18n, keybindings, socket, etc.
//
// Register SoundBard's settings keys so game.settings.get/set/register accept
// "soundbard" as a valid namespace. The bank value is typed as Record<string, unknown>
// (rather than AllBanksData directly) because AllBanksData lacks an index signature
// and would cause ToRuntimeType<AllBanksData> to resolve to never, breaking `type: Object`.

export {};

declare module "@league-of-foundry-developers/foundry-vtt-types/configuration" {
  interface AssumeHookRan {
    ready: never;
  }

  interface SettingConfig {
    "soundbard.soundBank": Record<string, unknown>;
    "soundbard.activeBank": number;
    "soundbard.masterVolume": number;
    "soundbard.masterReverb": number;
    "soundbard.columns": number;
    "soundbard.rows": number;
  }

  // V13 reworked scene controls — commented out in fvtt-types beta (needs individual attention).
  // Hooks.HookName = keyof configuration.Hooks.HookConfig, so augmenting here adds the hook name.
  namespace Hooks {
    interface HookConfig {
      getSceneControlButtons: (controls: Record<string, unknown>) => void;
    }
  }
}
