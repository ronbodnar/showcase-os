import { GridId } from "@features/grid/types"
import { LauncherId, LauncherMetadata } from "@features/launcher/types"
import { GridCellPosition } from "types"

/**
 * LAUNCHERS
 * Custom launchers that can be used across the UI to launch programs or run system actions.
 * If you add a new system action you must add a launcher for it, but program launchers are created automatically.
 */
const LAUNCHER_METADATA = [
  {
    id: "github",
    label: "GitHub",
    icon: "GitHub",
    description: "View my GitHub profile (opens in new tab)",
    target: {
      type: "action",
      action: "openUrl",
      args: {
        url: "https://github.com/ronbodnar",
      },
    },
  },

  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "LinkedIn",
    description: "View my LinkedIn profile (opens in new tab)",
    target: {
      type: "action",
      action: "openUrl",
      args: {
        url: "https://www.linkedin.com/in/ronbodnar/",
      },
    },
  },

  {
    id: "resume",
    label: "Resume",
    icon: "PDFViewer",
    target: {
      type: "program",
      programId: "browser",
      args: {
        title: "Ronald Bodnar | Resume",
        url: "https://ronbodnar.com/Ronald-Bodnar_Resume.pdf",
      },
    },
  },

  {
    id: "lock_screen",
    label: "Lock Screen",
    description: "Lock the screen",
    icon: "LockScreen",
    target: {
      type: "action",
      action: "lockScreen",
    },
  },

  {
    id: "shutdown",
    label: "Shut Down",
    description: "Shut down the computer",
    icon: "Shutdown",
    target: {
      type: "action",
      action: "promptShutdown",
    },
  },

  {
    id: "start_menu",
    description: "Menu",
    draggable: false,
    target: {
      type: "program",
      programId: "start_menu",
      args: {
        title: "",
      },
    },
  },

  {
    id: "coreflow_erp",
    target: {
      type: "program",
      programId: "browser",
      args: {
        title: "CoreFlow ERP",
        url: "https://erp.ronbodnar.com/",
      },
    },
  },

  {
    id: "grid_of_words",
    target: {
      type: "program",
      programId: "browser",
      args: {
        title: "Grid of Words",
        url: "https://play.ronbodnar.com/",
      },
    },
  },

  {
    id: "tms",
    target: {
      type: "program",
      programId: "browser",
      args: {
        title: "TMS",
        url: "https://tms.ronbodnar.com/",
      },
    },
  },

  {
    id: "showcase_os",
    target: {
      type: "program",
      programId: "browser",
      args: {
        title: "Showcase OS",
        url: "https://ronbodnar.com/",
      },
    },
  },
  // Don't specify the "id" because LauncherId type is inferred from these keys.
] as const satisfies (Partial<LauncherMetadata> & { id: string })[]

/**
 * The default launcher layouts for each grid.
 * These layouts are used when a grid is first created or when the user resets the grid.
 */
const DEFAULT_LAUNCHER_LAYOUTS: Record<GridId, { id: LauncherId; position: GridCellPosition }[]> = {
  home: [
    { id: "software_center", position: { x: 0, y: 0 } },
    { id: "system_info", position: { x: 0, y: 1 } },
    { id: "linkedin", position: { x: 0, y: 2 } },
    { id: "github", position: { x: 0, y: 3 } },
    { id: "resume", position: { x: 0, y: 4 } },
  ],
  panel: [
    { id: "start_menu", position: { x: 0, y: 0 } },
    { id: "browser", position: { x: 1, y: 0 } },
  ],
}

export const launchersConfig = {
  metadata: LAUNCHER_METADATA,
  defaultLayouts: DEFAULT_LAUNCHER_LAYOUTS,
}
