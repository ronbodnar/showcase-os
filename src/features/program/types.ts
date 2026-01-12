import { WindowSize } from "types"
import { ALL_PROGRAMS_META } from "./registry"
import { IconName } from "@features/theme/types"

/**
 * Unique identifier derived from the central configuration files.
 */
export type ProgramId = (typeof ALL_PROGRAMS_META)[number]["id"]

/**
 * Controls the behavior and appearance of the window instance.
 */
export interface WindowMetadata {
  /** Reference point for window positioning. */
  anchor?: "top-left" | "center" | "bottom-center" | "bottom-right"
  /** If true, the window will not persist in the taskbar or session state and closes on click outside. */
  isEphemeral?: boolean
  isDraggable?: boolean
  isResizable?: boolean
  isMaximizable?: boolean
  /** Hides the close/minimize/maximize buttons in the title bar. */
  hideControls?: boolean

  /**
   * Configuration for the initial creation of the window.
   */
  spawn?: {
    /** Initial dimensions. Use '%' for responsive or 'px' for fixed sizing. */
    size: { width: number; height: number; unit: "%" | "px" }

    /**
     * Clamps the initial spawn size.
     * Resizing after spawn is governed by top-level minSize/maxSize.
     */
    minSize?: WindowSize
    maxSize?: WindowSize
  }

  /** Global constraints for manual and automatic window resizing. */
  minSize?: WindowSize
  maxSize?: WindowSize
}

/**
 * Rich content used by the Software Center and UI feedback elements.
 */
interface ProgramDetails {
  /**
   * The identity of the project.
   * - `short`: Plain text (~150 chars) for cards and tooltips.
   * - `long`: Detailed text for the Software Center page. Supports custom formatting.
   */
  description: { short: string; long?: string }
  technologies?: IconName[]
  imageUrls?: string[]
  year?: { start: number; end?: number }
  githubUrl?: string
  publicUrl?: string
}

/**
 * The manifest definition for a program.
 * This is the primary object developers edit in `src/config/`.
 */
export interface ProgramMetadata {
  id: string
  name: string
  icon?: IconName
  /** Determines which category of the Start Menu to place the program. */
  category: ProgramCategory

  /** Custom styling for the program's primary container on mobile and Software Center banners. */
  background?: {
    color?: string
    image?: string
  }
  /** If true, the OS can open multiple distinct windows for this program. */
  allowMultipleInstances?: boolean

  window?: WindowMetadata
  details?: ProgramDetails
  disabled?: boolean
  /** Custom tooltip to show when a user hovers over the program in Start Menu. */
  disabledText?: string
  /** If false, the program, when executed, will load the Software Center details page for this program. */
  runnable?: boolean
}

export type ProgramCategory = "developer" | "system"

/**
 * The runtime representation of a program, combining metadata with its React component.
 */
export interface Program {
  id: ProgramId
  /** Metadata configuration excluding the redundant ID. */
  meta: Omit<ProgramMetadata, "id">
  /** The React component to render inside the window. */
  contentComponent: React.ComponentType | undefined
}
