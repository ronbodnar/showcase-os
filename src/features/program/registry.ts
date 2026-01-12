import { SYSTEM_PROGRAMS_META } from "@config/programs-system"
import { DEVELOPER_PROGRAMS_META } from "@config/programs-developer"
import { ProgramId, ProgramMetadata } from "./types"

export const ALL_PROGRAMS_META = [
  ...SYSTEM_PROGRAMS_META,
  ...DEVELOPER_PROGRAMS_META,
] as const satisfies ProgramMetadata[]

const PROGRAM_META_MAP: Record<ProgramId, ProgramMetadata> = Object.fromEntries(
  ALL_PROGRAMS_META.sort((a, b) => a.name.localeCompare(b.name)).map((meta) => [meta.id, meta]),
) as Record<ProgramId, ProgramMetadata>

export function getProgramMeta(id: ProgramId): ProgramMetadata {
  return PROGRAM_META_MAP[id]
}

export function getAllProgramMetadata(): ProgramMetadata[] {
  return ALL_PROGRAMS_META
}
