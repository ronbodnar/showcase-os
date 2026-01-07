import { v4 as uuidv4 } from "uuid"

export const appCardService = {
  createAppCard: (processId: number, title?: string) => {
    return {
      id: uuidv4(),
      title: title ?? "Untitled",
      processId,
      active: true,
    }
  },
}
