import { makeIcon } from "@features/theme/helpers"
import { ThemeIconSet } from "@features/theme/types"

import UserSrc from "@sharedIcons/user.png"

import ChevronLeftComponent from "@themeIcons/Mint-Y/actions/chevron-left.svg?react"
import ChevronRightComponent from "@themeIcons/Mint-Y/actions/chevron-right.svg?react"
import HomeComponent from "@themeIcons/Mint-Y/mobile/home.svg?react"
import MailComponent from "@themeIcons/Mint-Y/actions/mail-unread-symbolic.svg?react"
import MailSendSuccess from "@themeIcons/Mint-Y/actions/mail-mark-notjunk-symbolic.svg?react"
import MapPinComponent from "@themeIcons/Mint-Y/actions/mark-location-symbolic.svg?react"
import OpenInNewComponent from "@themeIcons/Mint-Y/actions/open-in-new.svg?react"
import SendComponent from "@themeIcons/Mint-Y/actions/send.svg?react"
import SettingsComponent from "@themeIcons/Mint-Y/actions/applications-system-symbolic.svg?react"
import ShareComponent from "@themeIcons/Mint-Y/actions/share.svg?react"

import AppPlaceholderSrc from "@themeIcons/Mint-Y/apps/package-x-generic.png"
import BrowserSrc from "@themeIcons/Mint-Y/apps/brave-browser.png"
import ConnectComponent from "@themeIcons/Mint-Y/apps/internet-mail.png"
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

import AngularSrc from "@sharedIcons/tech/angular.svg"
import AWSSrc from "@sharedIcons/tech/aws.svg"
import ChartJSSrc from "@sharedIcons/tech/chartjs.svg"
import CSS3Src from "@sharedIcons/tech/css3.svg"
import DockerSrc from "@sharedIcons/tech/docker.svg"
import ExpressComponent from "@sharedIcons/tech/express.svg?react"
import GitSrc from "@sharedIcons/tech/git.svg"
import GithubComponent from "@sharedIcons/tech/github.svg?react"
import GithubActionsSrc from "@sharedIcons/tech/github-actions.svg"
import HTML5Src from "@sharedIcons/tech/html5.svg"
import IntelliJSrc from "@sharedIcons/tech/intellij-idea.svg"
import JasmineSrc from "@sharedIcons/tech/jasmine.svg"
import JavaSrc from "@sharedIcons/tech/java.svg"
import JavaScriptSrc from "@sharedIcons/tech/javascript.svg"
import JQuerySrc from "@sharedIcons/tech/jquery.svg"
import JUnitSrc from "@sharedIcons/tech/junit.svg"
import JupyterSrc from "@sharedIcons/tech/jupyter.svg"
import LinkedInSrc from "@sharedIcons/tech/linkedin.svg"
import LinuxSrc from "@sharedIcons/tech/linux.svg"
import MongoDBSrc from "@sharedIcons/tech/mongodb.svg"
import MySQLSrc from "@sharedIcons/tech/mysql.svg"
import NginxSrc from "@sharedIcons/tech/nginx.svg"
import NodeJSSrc from "@sharedIcons/tech/node.js.svg"
import NumPySrc from "@sharedIcons/tech/numpy.svg"
import PandasSrc from "@sharedIcons/tech/pandas.svg"
import PHPSrc from "@sharedIcons/tech/php.svg"
import PostmanSrc from "@sharedIcons/tech/postman.svg"
import PythonSrc from "@sharedIcons/tech/python.svg"
import ReactSrc from "@sharedIcons/tech/react.svg"
import RxJSSrc from "@sharedIcons/tech/rxjs.svg"
import ScikitLearnSrc from "@sharedIcons/tech/scikit-learn.svg"
import SpringSrc from "@sharedIcons/tech/spring.svg"
import TailwindCSSSrc from "@sharedIcons/tech/tailwind-css.svg"
import TypeScriptSrc from "@sharedIcons/tech/typescript.svg"
import ViteSrc from "@sharedIcons/tech/vite.svg"
import VSCodeSrc from "@sharedIcons/tech/vscode.svg"

export const sharedIconSet: Partial<ThemeIconSet> = {
  User: makeIcon(UserSrc),

  // Actions
  ChevronLeft: makeIcon(ChevronLeftComponent, "Go back"),
  ChevronRight: makeIcon(ChevronRightComponent, "Go forward"),
  Home: makeIcon(HomeComponent),
  Mail: makeIcon(MailComponent),
  MailSendSuccess: makeIcon(MailSendSuccess),
  MapPin: makeIcon(MapPinComponent),
  OpenInNew: makeIcon(OpenInNewComponent),
  Send: makeIcon(SendComponent),
  Settings: makeIcon(SettingsComponent),
  Share: makeIcon(ShareComponent),

  // Apps
  AppPlaceholder: makeIcon(AppPlaceholderSrc),
  Browser: makeIcon(BrowserSrc),
  Connect: makeIcon(ConnectComponent),
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

  // Tech Icons
  Angular: makeIcon(AngularSrc),
  AWS: makeIcon(AWSSrc),
  ChartJS: makeIcon(ChartJSSrc),
  CSS3: makeIcon(CSS3Src),
  Docker: makeIcon(DockerSrc),
  Express: makeIcon(ExpressComponent),
  Git: makeIcon(GitSrc),
  GitHub: makeIcon(GithubComponent),
  GitHubActions: makeIcon(GithubActionsSrc, "GitHub Actions"),
  HTML5: makeIcon(HTML5Src),
  IntelliJ: makeIcon(IntelliJSrc, "IntelliJ IDEA"),
  Jasmine: makeIcon(JasmineSrc),
  Java: makeIcon(JavaSrc),
  JavaScript: makeIcon(JavaScriptSrc),
  JQuery: makeIcon(JQuerySrc),
  JUnit: makeIcon(JUnitSrc),
  Jupyter: makeIcon(JupyterSrc, "Jupyter Notebook"),
  LinkedIn: makeIcon(LinkedInSrc),
  Linux: makeIcon(LinuxSrc),
  MongoDB: makeIcon(MongoDBSrc),
  MySQL: makeIcon(MySQLSrc),
  Nginx: makeIcon(NginxSrc),
  NodeJS: makeIcon(NodeJSSrc),
  NumPy: makeIcon(NumPySrc),
  Pandas: makeIcon(PandasSrc),
  PHP: makeIcon(PHPSrc),
  Postman: makeIcon(PostmanSrc),
  Python: makeIcon(PythonSrc),
  React: makeIcon(ReactSrc),
  RxJS: makeIcon(RxJSSrc),
  ScikitLearn: makeIcon(ScikitLearnSrc, "Scikit-Learn"),
  Spring: makeIcon(SpringSrc, "Spring Ecosystem (Spring Boot, Spring Data, Spring Security)"),
  TailwindCSS: makeIcon(TailwindCSSSrc, "Tailwind CSS"),
  TypeScript: makeIcon(TypeScriptSrc),
  Vite: makeIcon(ViteSrc),
  VSCode: makeIcon(VSCodeSrc, "Visual Studio Code"),
} as const

export default sharedIconSet
