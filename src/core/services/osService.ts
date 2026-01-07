import { OSPlatform, OSStatus, useOSStore } from "@core/store/useOSStore"

export const osService = {
  setStatus: (status: OSStatus) => useOSStore.getState().setStatus(status),
  getPlatform: () => useOSStore.getState().platform,
  setPlatform: (platform: OSPlatform) => useOSStore.getState().setPlatform(platform),

  hasStatus: (status: OSStatus) => useOSStore.getState().hasStatus(status),
  hasPlatform: (platform: OSPlatform) => useOSStore.getState().hasPlatform(platform),
  isDesktop: () => useOSStore.getState().isDesktop(),
  isMobile: () => useOSStore.getState().isMobile(),
}
