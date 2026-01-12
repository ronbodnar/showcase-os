import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { LauncherMetadata } from "@features/launcher/types"
import { getProgramMetaFromTarget } from "@features/launcher/utils/launcher.utils"
import { ProgramId } from "@features/program/types"
import { debugMessage } from "@shared/utils/utils"

export const PROCESS_STORE_NAME = "process-store"

export interface ProcessState {
  id: number
  displayId: string
  launcher: LauncherMetadata
  programId: ProgramId
  startTimestamp: number
  running: boolean
}

interface State {
  nextProcessId: number
  processes: Record<number, ProcessState>
  processesByProgramId: Record<string, ProcessState[]>
}

interface Action {
  getNextProcessId: () => number
  addProcess: (
    id: number,
    launcher: LauncherMetadata, // The launcher that began the process
    displayId: string, // The display component (Window, AppCard) that the process is running in
  ) => void
  stopProcess: (processId: number) => void
  removeProcess: (processId: number) => void
  reset: () => void
}

type ProcessStore = State & Action

const defaultState: State = {
  nextProcessId: 0,
  processes: {} as Record<number, ProcessState>,
  processesByProgramId: {} as Record<ProgramId, ProcessState[]>,
}

export const useProcessStore = create<ProcessStore>()(
  devtools(
    (set, get) => ({
      ...defaultState,

      getNextProcessId: () => ++get().nextProcessId,

      addProcess: (id, launcher, displayId) =>
        set((state) => {
          const process = {
            id,
            displayId,
            launcher,
            programId: getProgramMetaFromTarget(launcher.target)?.id,
            startTimestamp: Date.now(),
            running: true,
          } as ProcessState

          const processesByProgramId = { ...state.processesByProgramId }
          const list = processesByProgramId[process.programId] || []
          processesByProgramId[process.programId] = [...list, process]

          return {
            processes: { ...state.processes, [id]: process },
            processesByProgramId: processesByProgramId,
          }
        }),

      removeProcess: (processId) => {
        set((state) => {
          const programId = state.processes[processId]?.programId
          if (!programId) {
            debugMessage("Cannot remove process without a program ID")
            return state
          }

          const updatedProcesses = { ...state.processes }
          delete updatedProcesses[processId]

          const processesByProgramId = { ...state.processesByProgramId }
          const filteredProcesses = processesByProgramId[programId].filter(
            (p) => p.id !== processId,
          )
          if (filteredProcesses.length === 0) {
            delete processesByProgramId[programId]
          } else {
            processesByProgramId[programId] = filteredProcesses
          }

          return {
            processes: updatedProcesses,
            processesByProgramId: processesByProgramId,
          }
        })
      },

      reset: () => set(defaultState),
    }),
    { name: PROCESS_STORE_NAME },
  ),
)
