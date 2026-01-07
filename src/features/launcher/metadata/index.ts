import { LauncherMetadata } from "../types"

export const LAUNCHER_METADATA = [
  {
    id: "github",
    label: "GitHub",
    icon: "Github",
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
    id: "tms_prototype",
    target: {
      type: "program",
      programId: "browser",
      args: {
        title: "TMS Prototype",
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
] as const satisfies (Partial<LauncherMetadata> & { id: string })[]
