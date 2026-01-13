import { ProgramId, ProgramMetadata } from "@features/program/types"
import { launchersConfig } from "./launchers"
import { DEVELOPER_PROGRAMS_META } from "./programs-developer"
import { SYSTEM_PROGRAMS_META } from "./programs-system"
import { ThemeName } from "@features/theme/types"

interface Config {
  formspreeKey: string
  launchers: typeof launchersConfig
  programs: {
    developer: ProgramMetadata[]
    system: ProgramMetadata[]
  }
  defaultTheme: {
    light: ThemeName
    dark: ThemeName
  }
  grids: {
    mobileIconSize: number
    panelIconSize: number
    desktopIconSize: number
  }
  softwareCenter: {
    featured: ProgramId[]
    projects: ProgramId[]
    archived: ProgramId[]
  }
  windows: {
    minHeight: number
    minWidth: number
  }
}

/**
 * CONFIG
 * The main configuration file for the Showcase OS.
 * This file is used to configure the UI and behavior of the application.
 *
 */
export const config: Config = {
  formspreeKey: "mqeekgeq",
  launchers: launchersConfig,
  programs: {
    developer: DEVELOPER_PROGRAMS_META,
    system: SYSTEM_PROGRAMS_META,
  },

  defaultTheme: {
    light: "Mint-Y (light)",
    dark: "Mint-Y (dark)",
  },

  grids: {
    mobileIconSize: 48,
    panelIconSize: 42,
    desktopIconSize: 40,
  },

  /**
   * Custom configuration to build the main window for the Software Center.
   * These are the programs that are displayed in each section of the Software Center.
   * Banners are derived from the programs in the "featured" section.
   */
  softwareCenter: {
    featured: ["coreflow_erp", "showcase_os", "grid_of_words"] as ProgramId[],

    projects: ["tms", "loan_eligibility", "deliveryrouter_cli", "oed_parser"] as ProgramId[],

    archived: [
      "twitch_buddy",
      "twitch_raffle",
      "twitch_chat_irc",
      "league_of_legends_log_parser",
      "mtg_virtual_binder",
    ] as ProgramId[],
  },

  windows: {
    minHeight: 300,
    minWidth: 400,
  },
}
