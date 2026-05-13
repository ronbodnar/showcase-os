import { ProgramId, ProgramMetadata } from "@features/program/types"
import { launchersConfig } from "./launchers"
import { DEVELOPER_PROGRAMS_META } from "./programs-developer"
import { SYSTEM_PROGRAMS_META } from "./programs-system"
import { ThemeName } from "@features/theme/types"
import { LauncherId } from "@features/launcher/types"
import { getProgramMeta } from "@features/program/registry"

interface AppConfig {
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
  browser: {
    favorites: ProgramMetadata[]
  }
  softwareCenter: {
    featured: ProgramId[]
    projects: ProgramId[]
    archived: ProgramId[]
  }
  welcome: {
    title: string
    text: string[]
    launchers: LauncherId[]
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
export const config: AppConfig = {
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

  browser: {
    favorites: [
      getProgramMeta("ng_modular_forms"),
      getProgramMeta("coreflow_erp"),
      getProgramMeta("showcase_os"),
      getProgramMeta("grid_of_words"),
      getProgramMeta("tms"),
    ],
  },

  /**
   * Custom configuration to build the main window for the Software Center.
   * These are the programs that are displayed in each section of the Software Center.
   * Banners are derived from the programs in the "featured" section.
   */
  softwareCenter: {
    featured: ["ng_modular_forms", "coreflow_erp", "showcase_os", "grid_of_words"] as ProgramId[],

    projects: ["tms", "loan_eligibility", "deliveryrouter_cli", "oed_parser"] as ProgramId[],

    archived: [
      "twitch_buddy",
      "twitch_raffle",
      "twitch_chat_irc",
      "league_of_legends_log_parser",
      "mtg_virtual_binder",
    ] as ProgramId[],
  },

  welcome: {
    title: "Welcome to Showcase OS",
    text: [
      "Hi, I'm Ron Bodnar — a full stack software engineer focused on building scalable, modular software systems with a focus on architecture, data orchestration, and long-term maintainability.",

      "Showcase OS is an interactive portfolio environment designed to present my projects, technical architecture, and engineering approach through a desktop-inspired experience.",

      "The system is heavily inspired by operating system design patterns, combining application launchers, window management, theming, and modular UI architecture into a unified interface.",

      "You can explore projects, launch applications, inspect technical details, and navigate the environment much like a real operating system.",

      "Ready to get started? Launch an application below.",
    ],
    launchers: ["about", "projects", "terminal", "browser"],
  },

  windows: {
    minHeight: 300,
    minWidth: 400,
  },
}
