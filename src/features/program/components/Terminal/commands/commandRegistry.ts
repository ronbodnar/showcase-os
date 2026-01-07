import { Terminal as XTerm } from "@xterm/xterm"

export interface Command {
  name: string
  usage?: string
  help?: string
  description: string
  execute: (
    term: XTerm,
    args: string[],
    context: { windowId: string; history: string[] },
  ) => Promise<void> | void
}

const commandRegistry = new Map<string, Command>()

export function registerCommand(command: Command) {
  commandRegistry.set(command.name, command)
}

export function getCommand(name: string): Command | undefined {
  return commandRegistry.get(name)
}

export function getAllCommands(): Command[] {
  return Array.from(commandRegistry.values())
}
