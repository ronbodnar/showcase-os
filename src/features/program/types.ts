import { WindowSize } from "types"
import { ALL_PROGRAMS_META } from "./registry"
import { IconName } from "@features/theme/types"

export type ProgramId = (typeof ALL_PROGRAMS_META)[number]["id"]

export interface WindowMetadata {
  anchor?: string
  isEphemeral?: boolean
  isDraggable?: boolean
  isResizable?: boolean
  isMaximizable?: boolean
  hideControls?: boolean

  spawn?: {
    /**
     * Initial window size at creation. Can be px or % of screen.
     */
    size: { width: number; height: number; unit: "%" | "px" }

    /**
     * Optional min/max bounds for the spawn size only (applied once at creation).
     * Dragging/resizing uses the top-level minSize/maxSize.
     */
    minSize?: WindowSize
    maxSize?: WindowSize
  }

  /**
   * Restraints for resizing the window manually via hotspots or if the viewport size changes and the OS resizes the window automatically.
   */
  minSize?: WindowSize
  maxSize?: WindowSize
}

interface ProgramDetails {
  description: { short: string; long?: string }
  technologies?: string[]
  images?: string[]
  year?: { start: number; end?: number }
  githubUrl?: string
  publicUrl?: string
}

export interface ProgramMetadata {
  id: string
  name: string
  icon?: IconName
  category: ProgramCategory
  background?: {
    color?: string
    image?: string
  }
  allowMultipleInstances?: boolean
  window?: WindowMetadata
  details?: ProgramDetails
  disabled?: boolean
  disabledText?: string
  runnable?: boolean
}

export type ProgramCategory = "developer" | "system"

export interface Program {
  id: ProgramId

  meta: Omit<ProgramMetadata, "id">

  contentComponent: React.ComponentType | undefined
}
