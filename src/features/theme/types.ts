import { OSPlatform } from "@core/store/useOSStore"
import { Themes } from "."

export type ThemeName = keyof typeof Themes

/**
 * These are these supported options for the theme system. Certain options can be overridden by the user settings.
 *
 * All colors support CSS color formats (Hex, RGB, HSL, OKLCH, etc.)
 *
 * For colors to be applied, they must also be added in applyTheme.ts
 */
export interface Theme {
  name: string
  scheme: "dark" | "light"

  font: Record<string, string>

  /*
   * If any colors are added here, ensure they are also added in index.css @theme rules for Tailwind to create utility
   */
  colors: {
    shell: string
    window: string
    surface: string
    surfaceHover: string
    surfaceAlt: string
    surfaceHoverAlt: string
    surfaceAccent: string
    surfaceAccentHover: string
    text: string
    muted: string
    accent: string
    accentHover: string
    danger: string
    dangerHover: string
    border: string
    borderDarker: string
    borderLighter: string
    scrollbar: string
  }

  accentOptions: ThemeAccent[]

  defaultWallpaper: ThemeWallpaper
  wallpaperOptions: ThemeWallpaper[]
  icons: Partial<ThemeIconSet>
  loadIcons: (platform: OSPlatform) => Promise<Partial<ThemeIconSet>>
}

export interface ThemeAccent {
  name: string
  color: string
  hover: string
}

export interface ThemeWallpaper {
  name: string
  loaders: Record<WallpaperResolution, () => Promise<{ default: string }>>
}

export type WallpaperResolution =
  | "desktop-ultrawide"
  | "desktop-4k"
  | "desktop-1440p"
  | "desktop-1080p"
  | "mobile-1440p"
  | "mobile-1080p"
  | "thumbnail"

export interface IconMetadata {
  title?: string
  src: string | React.FC<React.SVGProps<SVGSVGElement>>
  //src?: string
  //Component?: React.FC<React.SVGProps<SVGSVGElement>>
}

export type IconName = keyof ThemeIconSet

// Flat interface to allow for easier type checking and to avoid having to use a resolver
interface ThemeIconSet {
  // Portrait/Avatar of the dev for System Info
  User: IconMetadata

  // Mobile
  Bell: IconMetadata
  FiveG: IconMetadata
  AppStack: IconMetadata
  BatteryMobile: IconMetadata
  MobileSignal: IconMetadata
  PowerOff: IconMetadata
  Wifi: IconMetadata

  // Actions
  ChevronLeft: IconMetadata
  ChevronRight: IconMetadata
  Home: IconMetadata
  Share: IconMetadata
  Delete: IconMetadata
  Add: IconMetadata
  StartMenu: IconMetadata
  OpenInNew: IconMetadata
  PinWindow: IconMetadata
  Settings: IconMetadata
  Refresh: IconMetadata
  UnpinWindow: IconMetadata
  WindowClose: IconMetadata
  WindowRestore: IconMetadata
  WindowMaximize: IconMetadata
  WindowMinimize: IconMetadata
  WindowNew: IconMetadata

  // Status
  TrashFull: IconMetadata
  TrashEmpty: IconMetadata
  Volume: IconMetadata
  HighSecurity: IconMetadata
  Dropbox: IconMetadata
  NetworkWired: IconMetadata
  Bluetooth: IconMetadata
  Battery: IconMetadata

  // Devices
  Computer: IconMetadata
  RemovableMedia: IconMetadata

  // Places
  Apps: IconMetadata
  SystemApps: IconMetadata
  DeveloperApps: IconMetadata
  Search: IconMetadata

  // Apps
  About: IconMetadata
  AppPlaceholder: IconMetadata
  Browser: IconMetadata
  CoreFlowERP: IconMetadata
  DeliveryRouterCLI: IconMetadata
  Files: IconMetadata
  GridOfWords: IconMetadata
  LeagueOfLegendsLogParser: IconMetadata
  LoanEligibilityML: IconMetadata
  LockScreen: IconMetadata
  MTGVirtualBinder: IconMetadata
  OEDParser: IconMetadata
  OSDClaimManager: IconMetadata
  PhotoViewer: IconMetadata
  ShowcaseOS: IconMetadata
  SystemSettings: IconMetadata
  SoftwareCenter: IconMetadata
  Shutdown: IconMetadata
  SystemInfo: IconMetadata
  Terminal: IconMetadata
  TerminalSymbolic: IconMetadata
  TwitchBuddy: IconMetadata
  TwitchChatIRC: IconMetadata
  TwitchRaffle: IconMetadata
  TMSPrototype: IconMetadata
  VisualStudioCode: IconMetadata

  // Tech Icons
  Angular: IconMetadata
  AWS: IconMetadata
  ChartJS: IconMetadata
  CSS3: IconMetadata
  Docker: IconMetadata
  Express: IconMetadata
  Git: IconMetadata
  Github: IconMetadata
  GithubActions: IconMetadata
  HTML5: IconMetadata
  IntelliJ: IconMetadata
  Jasmine: IconMetadata
  Java: IconMetadata
  JavaScript: IconMetadata
  JQuery: IconMetadata
  JUnit: IconMetadata
  Jupyter: IconMetadata
  Linux: IconMetadata
  LinkedIn: IconMetadata
  MongoDB: IconMetadata
  MySQL: IconMetadata
  Nginx: IconMetadata
  NodeJS: IconMetadata
  NumPy: IconMetadata
  Pandas: IconMetadata
  PHP: IconMetadata
  Postman: IconMetadata
  Python: IconMetadata
  React: IconMetadata
  RxJS: IconMetadata
  ScikitLearn: IconMetadata
  Spring: IconMetadata
  TailwindCSS: IconMetadata
  TypeScript: IconMetadata
  Vite: IconMetadata
  VSCode: IconMetadata
}
