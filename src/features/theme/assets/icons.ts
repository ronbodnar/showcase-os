import { IconMetadata, IconName } from "../types"
import { makeIcon } from "../helpers"

// Themes can override these icons if they wish, but they are theme agnostic.
export const defaultIcons: Record<IconName, IconMetadata> = {
  User: makeIcon(() => import("@sharedIcons/user.png")),

  // Actions
  ChevronLeft: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/chevron-left.svg?react"),
    "Go back",
  ),
  ChevronRight: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/chevron-right.svg?react"),
    "Go forward",
  ),
  Home: makeIcon(() => import("@themeIcons/Mint-Y/mobile/home.svg?react")),
  Mail: makeIcon(() => import("@themeIcons/Mint-Y/actions/mail-unread-symbolic.svg?react")),
  MailSendSuccess: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/mail-mark-notjunk-symbolic.svg?react"),
  ),
  MapPin: makeIcon(() => import("@themeIcons/Mint-Y/actions/mark-location-symbolic.svg?react")),
  OpenInNew: makeIcon(() => import("@themeIcons/Mint-Y/actions/open-in-new.svg?react")),
  Send: makeIcon(() => import("@themeIcons/Mint-Y/actions/send.svg?react")),
  Settings: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/applications-system-symbolic.svg?react"),
  ),
  Share: makeIcon(() => import("@themeIcons/Mint-Y/actions/share.svg?react")),

  // Places
  Apps: makeIcon(() => import("@themeIcons/Mint-Y/places/apps.svg?react")),
  SystemApps: makeIcon(() => import("@themeIcons/Mint-Y/places/apps-system.png")),
  DeveloperApps: makeIcon(() => import("@themeIcons/Mint-Y/places/apps-developer.png")),
  Search: makeIcon(
    () => import("@themeIcons/Mint-Y/places/folder-saved-search-symbolic.svg?react"),
    "Search",
  ),

  // Programs / Apps
  AppPlaceholder: makeIcon(() => import("@themeIcons/Mint-Y/apps/package-x-generic.png")),
  Browser: makeIcon(() => import("@themeIcons/Mint-Y/apps/brave-browser.png")),
  Connect: makeIcon(() => import("@themeIcons/Mint-Y/apps/internet-mail.png")),
  CoreFlowERP: makeIcon(() => import("@themeIcons/Mint-Y/apps/coreflow-erp.png")),
  DeliveryRouterCLI: makeIcon(() => import("@themeIcons/Mint-Y/apps/deliveryrouter-cli.svg")),
  GridOfWords: makeIcon(() => import("@themeIcons/Mint-Y/apps/grid-of-words.svg")),
  LeagueOfLegendsLogParser: makeIcon(
    () => import("@themeIcons/Mint-Y/apps/league-of-legends-log-parser.svg"),
  ),
  LoanEligibilityML: makeIcon(() => import("@themeIcons/Mint-Y/apps/loan-eligibility-ml.svg")),
  MTGVirtualBinder: makeIcon(() => import("@themeIcons/Mint-Y/apps/mtg-virtual-binder.svg")),
  OEDParser: makeIcon(() => import("@themeIcons/Mint-Y/apps/oed-parser.svg")),
  OSDClaimManager: makeIcon(() => import("@themeIcons/Mint-Y/apps/osd-claim-manager.svg")),
  PDFViewer: makeIcon(() => import("@themeIcons/Mint-Y/apps/pdf-viewer.png")),
  PhotoViewer: makeIcon(() => import("@themeIcons/Mint-Y/apps/photo-viewer.png")),
  ShowcaseOS: makeIcon(() => import("@themeIcons/Mint-Y/apps/showcase-os.svg")),
  SoftwareCenter: makeIcon(() => import("@themeIcons/Mint-Y/apps/software-center.png")),
  SystemInfo: makeIcon(() => import("@themeIcons/Mint-Y/apps/system-info.png")),
  SystemSettings: makeIcon(() => import("@themeIcons/Mint-Y/apps/system-settings.png")),
  Terminal: makeIcon(() => import("@themeIcons/Mint-Y/apps/terminal.png")),
  TerminalSymbolic: makeIcon(() => import("@themeIcons/Mint-Y/apps/terminal-symbolic.svg?react")),
  TwitchBuddy: makeIcon(() => import("@themeIcons/Mint-Y/apps/twitch-buddy.png")),
  TwitchChatIRC: makeIcon(() => import("@themeIcons/Mint-Y/apps/twitch-chat-irc.png")),
  TwitchRaffle: makeIcon(() => import("@themeIcons/Mint-Y/apps/twitch-raffle.png")),
  TMS: makeIcon(() => import("@themeIcons/Mint-Y/apps/tms.png")),
  VisualStudioCode: makeIcon(() => import("@themeIcons/Mint-Y/apps/visual-studio-code.png")),

  // Mobile
  FiveG: makeIcon(() => import("@themeIcons/Mint-Y/mobile/5g.svg?react")),
  AppStack: makeIcon(() => import("@themeIcons/Mint-Y/mobile/window-stack.svg?react")),
  BatteryMobile: makeIcon(() => import("@themeIcons/Mint-Y/mobile/android-battery-full.svg?react")),
  MobileSignal: makeIcon(() => import("@themeIcons/Mint-Y/mobile/android-cell-5-bar.svg?react")),
  PowerOff: makeIcon(() => import("@themeIcons/Mint-Y/mobile/mode_off_on.svg?react")),
  Wifi: makeIcon(() => import("@themeIcons/Mint-Y/mobile/android-wifi-4-bar.svg?react")),
  Bell: makeIcon(() => import("@themeIcons/Mint-Y/mobile/notification-bell.svg?react")),

  // Technologies
  Angular: makeIcon(() => import("@sharedIcons/tech/angular.svg")),
  AWS: makeIcon(() => import("@sharedIcons/tech/aws.svg")),
  ChartJS: makeIcon(() => import("@sharedIcons/tech/chartjs.svg")),
  CSS3: makeIcon(() => import("@sharedIcons/tech/css3.svg")),
  Docker: makeIcon(() => import("@sharedIcons/tech/docker.svg")),
  Express: makeIcon(() => import("@sharedIcons/tech/express.svg?react")),
  Git: makeIcon(() => import("@sharedIcons/tech/git.svg")),
  GitHub: makeIcon(() => import("@sharedIcons/tech/github.svg?react")),
  GitHubActions: makeIcon(() => import("@sharedIcons/tech/github-actions.svg"), "GitHub Actions"),
  HTML5: makeIcon(() => import("@sharedIcons/tech/html5.svg")),
  IntelliJ: makeIcon(() => import("@sharedIcons/tech/intellij-idea.svg"), "IntelliJ IDEA"),
  Jasmine: makeIcon(() => import("@sharedIcons/tech/jasmine.svg")),
  Java: makeIcon(() => import("@sharedIcons/tech/java.svg")),
  JavaScript: makeIcon(() => import("@sharedIcons/tech/javascript.svg")),
  JQuery: makeIcon(() => import("@sharedIcons/tech/jquery.svg")),
  JUnit: makeIcon(() => import("@sharedIcons/tech/junit.svg")),
  Jupyter: makeIcon(() => import("@sharedIcons/tech/jupyter.svg"), "Jupyter Notebook"),
  LinkedIn: makeIcon(() => import("@sharedIcons/tech/linkedin.svg")),
  Linux: makeIcon(() => import("@sharedIcons/tech/linux.svg")),
  MongoDB: makeIcon(() => import("@sharedIcons/tech/mongodb.svg")),
  MySQL: makeIcon(() => import("@sharedIcons/tech/mysql.svg")),
  Nginx: makeIcon(() => import("@sharedIcons/tech/nginx.svg")),
  NodeJS: makeIcon(() => import("@sharedIcons/tech/node.js.svg")),
  NumPy: makeIcon(() => import("@sharedIcons/tech/numpy.svg")),
  Pandas: makeIcon(() => import("@sharedIcons/tech/pandas.svg")),
  PHP: makeIcon(() => import("@sharedIcons/tech/php.svg")),
  Postman: makeIcon(() => import("@sharedIcons/tech/postman.svg")),
  Python: makeIcon(() => import("@sharedIcons/tech/python.svg")),
  React: makeIcon(() => import("@sharedIcons/tech/react.svg")),
  RxJS: makeIcon(() => import("@sharedIcons/tech/rxjs.svg")),
  ScikitLearn: makeIcon(() => import("@sharedIcons/tech/scikit-learn.svg"), "Scikit-Learn"),
  Spring: makeIcon(
    () => import("@sharedIcons/tech/spring.svg"),
    "Spring Ecosystem (Spring Boot, Spring Data, Spring Security)",
  ),
  TailwindCSS: makeIcon(() => import("@sharedIcons/tech/tailwind-css.svg"), "Tailwind CSS"),
  TypeScript: makeIcon(() => import("@sharedIcons/tech/typescript.svg")),
  Vite: makeIcon(() => import("@sharedIcons/tech/vite.svg")),
  VSCode: makeIcon(() => import("@sharedIcons/tech/vscode.svg"), "Visual Studio Code"),

  // Actions
  Add: makeIcon(() => import("@themeIcons/Mint-Y/actions/list-add.svg?react")),
  Delete: makeIcon(() => import("@themeIcons/Mint-Y/actions/edit-delete-symbolic.svg?react")),
  StartMenu: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/linuxmint-logo-ring-symbolic.svg?react"),
  ),
  PinWindow: makeIcon(() => import("@themeIcons/Mint-Y/actions/xapp-pin-symbolic.svg?react")),
  Refresh: makeIcon(() => import("@themeIcons/Mint-Y/actions/refresh.svg?react")),
  UnpinWindow: makeIcon(() => import("@themeIcons/Mint-Y/actions/xapp-unpin-symbolic.svg?react")),
  WindowClose: makeIcon(() => import("@themeIcons/Mint-Y/actions/window-close-symbolic.svg?react")),
  WindowRestore: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/window-restore-symbolic.svg?react"),
  ),
  WindowMaximize: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/window-maximize-symbolic.svg?react"),
  ),
  WindowMinimize: makeIcon(
    () => import("@themeIcons/Mint-Y/actions/window-minimize-symbolic.svg?react"),
  ),
  WindowNew: makeIcon(() => import("@themeIcons/Mint-Y/actions/window-new-symbolic.svg?react")),

  // Apps
  LockScreen: makeIcon(() => import("@themeIcons/Mint-Y/apps/lock-screen.png")),
  Shutdown: makeIcon(() => import("@themeIcons/Mint-Y/apps/shutdown.png")),

  // Devices
  Computer: makeIcon(() => import("@themeIcons/Mint-Y/devices/computer-symbolic.svg?react")),
  RemovableMedia: makeIcon(
    () => import("@themeIcons/Mint-Y/devices/drive-removable-media-symbolic.svg?react"),
    "Removable drives",
  ),

  // Status
  Volume: makeIcon(
    () => import("@themeIcons/Mint-Y/status/audio-status-volume-medium-symbolic.svg?react"),
    "Volume: 20%",
  ),
  HighSecurity: makeIcon(
    () => import("@themeIcons/Mint-Y/status/security-high-symbolic.svg?react"),
    "The system is up to date",
  ),
  Dropbox: makeIcon(
    () => import("@themeIcons/Mint-Y/status/dropboxstatus-logo.svg?react"),
    "Dropbox",
  ),
  NetworkWired: makeIcon(
    () => import("@themeIcons/Mint-Y/status/network-wired-symbolic.svg?react"),
    "Connected to the wired network",
  ),
  Bluetooth: makeIcon(
    () => import("@themeIcons/Mint-Y/status/bluetooth-symbolic.svg?react"),
    "Bluetooth Enabled",
  ),
  Battery: makeIcon(
    () => import("@themeIcons/Mint-Y/status/battery-level-90-symbolic.svg?react"),
    "Mouse (90%)",
  ),
} as const

export default defaultIcons
