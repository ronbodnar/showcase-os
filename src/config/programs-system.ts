import { ProgramMetadata } from "../features/program/types"

/**
 * SYSTEM PROGRAMS
 * System "installed" applications that are added to the Start Menu but not shown in the Software Center.
 * Launcher metadata is automatically generated from these programs.
 */
export const SYSTEM_PROGRAMS_META = [
  {
    id: "app_drawer",
    name: "All Applications",
    icon: "Apps",
    category: "system",
    details: {
      description: {
        short: "Show installed applications",
      },
    },
    window: {
      isEphemeral: true,
    },
  },
  {
    id: "browser",
    name: "Brave Browser",
    icon: "Browser",
    category: "system",
    details: {
      description: {
        short: "Access the Internet",
      },
    },
    window: {
      spawn: {
        size: { width: 1, height: 1, unit: "%" },
        minSize: { width: 600, height: 400 },
        maxSize: { width: 1920, height: 1080 },
      },
    },
  },

  {
    id: "photo_viewer",
    name: "Photo Viewer",
    icon: "PhotoViewer",
    category: "system",
    disabled: true,
    disabledText: "Photo Viewer is opened by zooming in on an image in the Software Center.",
    window: {
      spawn: {
        size: { width: 1, height: 1, unit: "%" },
        maxSize: { width: 1800, height: 900 },
      },
    },
  },

  {
    id: "system_settings",
    name: "System Settings",
    icon: "SystemSettings",
    category: "system",
    window: {
      spawn: {
        size: { width: 0.3, height: 0.5, unit: "%" },
        minSize: { width: 600, height: 600 },
        maxSize: { width: 900, height: 900 },
      },
    },
    details: {
      description: {
        short: "Customize your system",
      },
    },
  },

  {
    id: "software_center",
    name: "Software Center",
    icon: "SoftwareCenter",
    category: "system",
    window: {
      spawn: {
        size: { width: 0.4, height: 0.85, unit: "%" },
        minSize: { width: 800, height: 550 },
        maxSize: { width: 1000, height: 750 },
      },
      minSize: { width: 600, height: 500 },
    },
    details: {
      description: {
        short: "Access and manage my software",
      },
    },
  },

  {
    id: "start_menu",
    name: "Start Menu",
    icon: "StartMenu",
    category: "system",
    window: {
      isResizable: false,
      isEphemeral: true,
      hideControls: true,
      spawn: {
        size: { width: 0.35, height: 0.6, unit: "%" },
        minSize: { width: 600, height: 500 },
        maxSize: { width: 700, height: 500 },
      },
      anchor: "bottom-center",
    },
  },

  {
    id: "system_info",
    name: "System Info",
    icon: "SystemInfo",
    category: "system",
    window: {
      spawn: {
        size: { width: 0.4, height: 0.55, unit: "%" },
        minSize: { width: 700, height: 610 },
        maxSize: { width: 1000, height: 610 },
      },
    },
    details: {
      description: {
        short: "Display system information",
      },
    },
  },

  {
    id: "terminal",
    name: "Terminal",
    icon: "Terminal",
    category: "system",
    allowMultipleInstances: true,
    details: {
      description: {
        short: "Use the command line",
      },
    },
  },

  {
    id: "visual_studio_code",
    name: "Visual Studio Code",
    icon: "VisualStudioCode",
    category: "system",
    disabled: true,
    disabledText: "VSCode can be opened through project details on the Software Center.",
    details: {
      description: {
        short: "Code Editing. Redefined.",
      },
    },
    window: {
      anchor: "top-left",
      spawn: {
        size: { width: 0.6, height: 1, unit: "%" },
        minSize: { width: 600, height: 400 },
        maxSize: { width: 1500, height: 1500 },
      },
    },
  },
] as const satisfies ProgramMetadata[]
