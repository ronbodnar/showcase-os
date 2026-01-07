import { IconMetadata } from "@features/theme/types"
import { makeIcon } from "@features/theme/helpers"

import BellComponent from "@themeIcons/Mint-Y/mobile/notification-bell.svg?react"
import FiveGComponent from "@themeIcons/Mint-Y/mobile/5g.svg?react"
import AppStackComponent from "@themeIcons/Mint-Y/mobile/window-stack.svg?react"
import BatteryMobileComponent from "@themeIcons/Mint-Y/mobile/android-battery-full.svg?react"
import MobileSignalComponent from "@themeIcons/Mint-Y/mobile/android-cell-5-bar.svg?react"
import PowerOffComponent from "@themeIcons/Mint-Y/mobile/mode_off_on.svg?react"
import WifiComponent from "@themeIcons/Mint-Y/mobile/android-wifi-4-bar.svg?react"

export const mobileIcons: Record<string, IconMetadata> = {
  FiveG: makeIcon(FiveGComponent),
  AppStack: makeIcon(AppStackComponent),
  BatteryMobile: makeIcon(BatteryMobileComponent),
  MobileSignal: makeIcon(MobileSignalComponent),
  PowerOff: makeIcon(PowerOffComponent),
  Wifi: makeIcon(WifiComponent),
  Bell: makeIcon(BellComponent),
}

export default mobileIcons
