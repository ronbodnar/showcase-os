import { IconMetadata } from "@features/theme/types"
import { makeIcon } from "@features/theme/helpers"

import AddListComponent from "@themeIcons/Mint-Y/actions/list-add.svg?react"
import DeleteEditComponent from "@themeIcons/Mint-Y/actions/edit-delete-symbolic.svg?react"
import StartMenuComponent from "@themeIcons/Mint-Y/actions/linuxmint-logo-ring-symbolic.svg?react"
import PinWindowComponent from "@themeIcons/Mint-Y/actions/xapp-pin-symbolic.svg?react"
import RefreshComponent from "@themeIcons/Mint-Y/actions/refresh.svg?react"
import UnpinWindowComponent from "@themeIcons/Mint-Y/actions/xapp-unpin-symbolic.svg?react"
import WindowCloseComponent from "@themeIcons/Mint-Y/actions/window-close-symbolic.svg?react"
import WindowRestoreComponent from "@themeIcons/Mint-Y/actions/window-restore-symbolic.svg?react"
import WindowMaximizeComponent from "@themeIcons/Mint-Y/actions/window-maximize-symbolic.svg?react"
import WindowMinimizeComponent from "@themeIcons/Mint-Y/actions/window-minimize-symbolic.svg?react"
import WindowNewComponent from "@themeIcons/Mint-Y/actions/window-new-symbolic.svg?react"
import LockScreenSrc from "@themeIcons/Mint-Y/apps/lock-screen.png"
import ShutdownSrc from "@themeIcons/Mint-Y/apps/shutdown.png"

import ComputerComponent from "@themeIcons/Mint-Y/devices/computer-symbolic.svg?react"
import RemovableMediaComponent from "@themeIcons/Mint-Y/devices/drive-removable-media-symbolic.svg?react"
import VolumeComponent from "@themeIcons/Mint-Y/status/audio-status-volume-medium-symbolic.svg?react"
import HighSecurityComponent from "@themeIcons/Mint-Y/status/security-high-symbolic.svg?react"
import DropboxComponent from "@themeIcons/Mint-Y/status/dropboxstatus-logo.svg?react"
import NetworkWiredComponent from "@themeIcons/Mint-Y/status/network-wired-symbolic.svg?react"
import BluetoothComponent from "@themeIcons/Mint-Y/status/bluetooth-symbolic.svg?react"
import BatteryComponent from "@themeIcons/Mint-Y/status/battery-level-90-symbolic.svg?react"

export const desktopIcons: Record<string, IconMetadata> = {
  // Actions
  Add: makeIcon(AddListComponent),
  Delete: makeIcon(DeleteEditComponent),
  StartMenu: makeIcon(StartMenuComponent),
  PinWindow: makeIcon(PinWindowComponent),
  Refresh: makeIcon(RefreshComponent),
  UnpinWindow: makeIcon(UnpinWindowComponent),
  WindowClose: makeIcon(WindowCloseComponent),
  WindowRestore: makeIcon(WindowRestoreComponent),
  WindowMaximize: makeIcon(WindowMaximizeComponent),
  WindowMinimize: makeIcon(WindowMinimizeComponent),
  WindowNew: makeIcon(WindowNewComponent),

  // Apps
  LockScreen: makeIcon(LockScreenSrc),
  Shutdown: makeIcon(ShutdownSrc),

  // Devices
  Computer: makeIcon(ComputerComponent),
  RemovableMedia: makeIcon(RemovableMediaComponent, "Removable drives"),

  // Status
  Volume: makeIcon(VolumeComponent, "Volume: 20%"),
  HighSecurity: makeIcon(HighSecurityComponent, "The system is up to date"),
  Dropbox: makeIcon(DropboxComponent, "Dropbox"),
  NetworkWired: makeIcon(NetworkWiredComponent, "Connected to the wired network"),
  Bluetooth: makeIcon(BluetoothComponent, "Bluetooth Enabled"),
  Battery: makeIcon(BatteryComponent, "Mouse (90%)"),
}

export default desktopIcons
