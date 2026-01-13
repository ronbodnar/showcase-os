import { ProgramId } from "../types"
import StartMenu from "./StartMenu/StartMenu"

/**
 * Bridges static ProgramIds to their executable React components.
 * Entry points should be added here to be resolvable by the ProgramService.
 *
 * NOTE:
 *    Components using 'loader' are code-split into separate chunks and will be lazy-loaded.
 *    A spinner will be shown while loading.
 */
export const PROGRAM_COMPONENTS: Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<ProgramId, { loader: () => Promise<any> } | { component: React.ComponentType<any> }>
> = {
  app_drawer: { loader: () => import("./AppDrawer/AppDrawer") },
  browser: { loader: () => import("./Browser/Browser") },
  connect: { loader: () => import("./Connect/Connect") },
  photo_viewer: { loader: () => import("./PhotoViewer/PhotoViewer") },
  software_center: { loader: () => import("./SoftwareCenter/SoftwareCenter") },

  start_menu: { component: StartMenu },

  system_info: { loader: () => import("./SystemInfo/SystemInfo") },
  system_settings: { loader: () => import("./SystemSettings/SystemSettings") },
  terminal: { loader: () => import("./Terminal/Terminal") },
  visual_studio_code: { loader: () => import("./VisualStudioCode/VisualStudioCode") },
}
