import { programService } from "@features/program/services/programService"
import { ProgramId } from "../types"

export const useProgramComponent = (id?: ProgramId) => {
  if (!id) return undefined
  return programService.loadProgramComponent(id)
}
