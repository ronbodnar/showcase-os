import { makeIcon } from "@features/theme/helpers"
import { IconMetadata } from "@features/theme/types"

import ChevronLeftComponent from "@themeIcons/Mint-Y/actions/chevron-left.svg?react"
import ChevronRightComponent from "@themeIcons/Mint-Y/actions/chevron-right.svg?react"
import HomeComponent from "@themeIcons/Mint-Y/mobile/home.svg?react"
import OpenInNewComponent from "@themeIcons/Mint-Y/actions/open-in-new.svg?react"
import SettingsComponent from "@themeIcons/Mint-Y/actions/settings.svg?react"
import ShareComponent from "@themeIcons/Mint-Y/actions/share.svg?react"

import AppPlaceholderSrc from "@themeIcons/Mint-Y/apps/package-x-generic.png"
import BrowserSrc from "@themeIcons/Mint-Y/apps/brave-browser.png"
import CoreFlowERPSrc from "@themeIcons/Mint-Y/apps/coreflow-erp.png"
import DeliveryRouterCLISrc from "@themeIcons/Mint-Y/apps/deliveryrouter-cli.svg"
import GridOfWordsSrc from "@themeIcons/Mint-Y/apps/grid-of-words.svg"
import LeagueOfLegendsLogParserSrc from "@themeIcons/Mint-Y/apps/league-of-legends-log-parser.svg"
import LoanEligibilityMLSrc from "@themeIcons/Mint-Y/apps/loan-eligibility-ml.svg"
import MTGVirtualBinderSrc from "@themeIcons/Mint-Y/apps/mtg-virtual-binder.svg"
import OEDParserSrc from "@themeIcons/Mint-Y/apps/oed-parser.svg"
import OSDClaimManagerSrc from "@themeIcons/Mint-Y/apps/osd-claim-manager.svg"
import PDFViewerSrc from "@themeIcons/Mint-Y/apps/pdf-viewer.png"
import PhotoViewerSrc from "@themeIcons/Mint-Y/apps/photo-viewer.png"
import ShowcaseOSSrc from "@themeIcons/Mint-Y/apps/showcase-os.svg"
import SoftwareCenterSrc from "@themeIcons/Mint-Y/apps/software-center.png"
import SystemInfoSrc from "@themeIcons/Mint-Y/apps/system-info.png"
import SystemSettingsSrc from "@themeIcons/Mint-Y/apps/system-settings.png"
import TerminalSrc from "@themeIcons/Mint-Y/apps/terminal.png"
import TerminalSymbolicComponent from "@themeIcons/Mint-Y/apps/terminal-symbolic.svg?react"
import TwitchBuddySrc from "@themeIcons/Mint-Y/apps/twitch-buddy.png"
import TwitchChatIRCSrc from "@themeIcons/Mint-Y/apps/twitch-chat-irc.png"
import TwitchRaffleSrc from "@themeIcons/Mint-Y/apps/twitch-raffle.png"
import TMSSrc from "@themeIcons/Mint-Y/apps/tms.png"
import VisualStudioCodeSrc from "@themeIcons/Mint-Y/apps/visual-studio-code.png"
import AppsComponent from "@themeIcons/Mint-Y/places/apps.svg?react"
import SystemAppsSrc from "@themeIcons/Mint-Y/places/apps-system.png"
import DeveloperAppsSrc from "@themeIcons/Mint-Y/places/apps-developer.png"
import SearchComponent from "@themeIcons/Mint-Y/places/folder-saved-search-symbolic.svg?react"

export const icons: Record<string, IconMetadata> = {
  // Actions
  ChevronLeft: makeIcon(ChevronLeftComponent, "Go back"),
  ChevronRight: makeIcon(ChevronRightComponent, "Go forward"),
  Home: makeIcon(HomeComponent),
  OpenInNew: makeIcon(OpenInNewComponent),
  Settings: makeIcon(SettingsComponent),
  Share: makeIcon(ShareComponent),

  // Apps
  AppPlaceholder: makeIcon(AppPlaceholderSrc),
  Browser: makeIcon(BrowserSrc),
  CoreFlowERP: makeIcon(CoreFlowERPSrc),
  DeliveryRouterCLI: makeIcon(DeliveryRouterCLISrc),
  GridOfWords: makeIcon(GridOfWordsSrc),
  LeagueOfLegendsLogParser: makeIcon(LeagueOfLegendsLogParserSrc),
  LoanEligibilityML: makeIcon(LoanEligibilityMLSrc),
  MTGVirtualBinder: makeIcon(MTGVirtualBinderSrc),
  OEDParser: makeIcon(OEDParserSrc),
  OSDClaimManager: makeIcon(OSDClaimManagerSrc),
  PDFViewer: makeIcon(PDFViewerSrc),
  PhotoViewer: makeIcon(PhotoViewerSrc),
  ShowcaseOS: makeIcon(ShowcaseOSSrc),
  SoftwareCenter: makeIcon(SoftwareCenterSrc),
  SystemInfo: makeIcon(SystemInfoSrc),
  SystemSettings: makeIcon(SystemSettingsSrc),
  Terminal: makeIcon(TerminalSrc),
  TerminalSymbolic: makeIcon(TerminalSymbolicComponent),
  TwitchBuddy: makeIcon(TwitchBuddySrc),
  TwitchChatIRC: makeIcon(TwitchChatIRCSrc),
  TwitchRaffle: makeIcon(TwitchRaffleSrc),
  TMS: makeIcon(TMSSrc),
  VisualStudioCode: makeIcon(VisualStudioCodeSrc),

  // Places
  Apps: makeIcon(AppsComponent),
  SystemApps: makeIcon(SystemAppsSrc),
  DeveloperApps: makeIcon(DeveloperAppsSrc),
  Search: makeIcon(SearchComponent, "Search"),
}

export default icons
