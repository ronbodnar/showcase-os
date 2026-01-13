import { OSPlatform } from "@core/store/useOSStore"
import { Themes } from "."

export type ThemeName = keyof typeof Themes

export interface Theme {
  name: string
  scheme: "dark" | "light"

  font: Record<string, string>

  /**
   * Color tokens mapped to CSS variables.
   * Ensure these match the @theme rules in index.css for Tailwind utility support.
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

  /** Currently loaded icons; starts as a partial set until loadIcons is called */
  icons: Partial<ThemeIconSet>

  /** Dynamic import for platform-specific (Mobile/Desktop) icon assets */
  loadIcons: (platform: OSPlatform) => Promise<Partial<ThemeIconSet>>
}

export interface ThemeAccent {
  name: string
  color: string
  hover: string
}

export interface ThemeWallpaper {
  name: string
  /** Dynamic loaders for resolution-specific assets to optimize bandwidth */
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
  /** Supports both standard image paths and React-wrapped SVGs */
  src: string | React.FC<React.SVGProps<SVGSVGElement>>
}

export type IconName = keyof ThemeIconSet

/**
 * Comprehensive manifest of all system icons.
 * Using a flat interface prevents deep-nesting resolution logic.
 */
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
  Add: IconMetadata
  ChevronLeft: IconMetadata
  ChevronRight: IconMetadata
  Delete: IconMetadata
  Home: IconMetadata
  Mail: IconMetadata
  MailSendSuccess: IconMetadata
  MapPin: IconMetadata
  OpenInNew: IconMetadata
  PinWindow: IconMetadata
  Refresh: IconMetadata
  Send: IconMetadata
  Settings: IconMetadata
  Share: IconMetadata
  StartMenu: IconMetadata
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
  Connect: IconMetadata
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
  PDFViewer: IconMetadata
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
  TMS: IconMetadata
  VisualStudioCode: IconMetadata

  // Tech Icons
  Angular: IconMetadata
  AWS: IconMetadata
  ChartJS: IconMetadata
  CSS3: IconMetadata
  Docker: IconMetadata
  Express: IconMetadata
  Git: IconMetadata
  GitHub: IconMetadata
  GitHubActions: IconMetadata
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
