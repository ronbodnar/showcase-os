import { Terminal as XTerm } from "@xterm/xterm"
import { useProcessStore } from "@core/store/useProcessStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { LauncherId } from "@features/launcher/types"
import { getProgramMetaFromTarget } from "@features/launcher/utils/launcher.utils"
import { executeAction } from "@features/os/actions/systemRegistry"
import { getAllProgramMetadata } from "@features/program/registry"
import { windowService } from "@features/window/services/windowService"
import { registerCommand, getAllCommands } from "./commandRegistry"
import { launcherService } from "@features/launcher/services/launcherService"

/**
 * Registry for all built-in terminal commands. Maps CLI commands to OS actions and functions.
 */

function launchProgram(term: XTerm, id: LauncherId) {
  const meta = getLauncherMeta(id)
  const programMeta = getProgramMetaFromTarget(meta.target)
  if (!meta) {
    term.writeln(`\r\n\u001b[31mError:\u001b[0m launcher '${id}' not found.`)
    return
  }
  term.writeln(`\r\nLaunching ${programMeta?.name || id}...`)
  launcherService.openLauncher(meta)
}

registerCommand({
  name: "clear",
  description: "Clear the terminal",
  execute: (term) => {
    term.reset()
    term.writeln("") // Offset the scrollable container overlay
  },
})

registerCommand({
  name: "echo",
  usage: "echo [text]",
  description: "Print input to the terminal",
  execute: (term, args) => {
    term.writeln(`\r\n${args.join(" ")}`)
  },
})

registerCommand({
  name: "exit",
  description: "Exit the terminal",
  execute: (term, _, context) => {
    term.writeln("\r\nExiting...")
    setTimeout(() => {
      term.dispose()
      windowService.closeWindow(context.windowId)
    }, 500)
  },
})

registerCommand({
  name: "help",
  description: "Show available commands or specific command help",
  usage: "help [command]",
  help: "Displays a list of all commands or detailed info for a specific command.",
  execute: (term, args) => {
    const target = args[0]

    if (target) {
      const cmd = getAllCommands().find((c) => c.name === target)
      if (!cmd) {
        term.writeln(`\r\n\u001b[31mNo help entry for '${target}'.\u001b[0m`)
        return
      }

      term.writeln(`\r\n\x1b[30mNAME\u001b[0m`)
      term.writeln(`\x1b[30m  ${cmd.name} — ${cmd.description}`)

      if (cmd.usage) {
        term.writeln(`\n\x1b[30mUSAGE\u001b[0m`)
        term.writeln(`\x1b[30m  ${cmd.usage}`)
      }

      if (cmd.help) {
        term.writeln(`\n\x1b[30mDESCRIPTION\u001b[0m`)
        term.writeln(`\x1b[30m  ${cmd.help}`)
      }

      term.writeln("")
      return
    }

    term.writeln("\r\nshowcaseOS bash, version 1.0.0-release (xtermjs, react-typescript)")
    term.writeln("These shell commands are defined internally. Type 'help' to see this list.")
    term.writeln("Type `help name` to find out more about the function `name`.\r\n")
    term.writeln("Available commands:")
    getAllCommands().forEach((cmd) => {
      term.writeln(`  \u001b[36m${cmd.name.padEnd(24)}\u001b[0m${cmd.description}`)
    })
    term.writeln("")
  },
})

registerCommand({
  name: "history",
  usage: "history [-c]",
  description: "Show command history",
  execute: (term, args, context) => {
    const target = args[0]
    if (typeof target === "string") {
      if (target === "-c") {
        context.history.length = 0
        term.writeln("\r\nHistory cleared.")
        return
      }
      term.writeln(`\r\nInvalid history target: ${target}. Usage: history [-c]`)
    }
    const history = context.history
    const cmd = "CMD".padEnd(20)
    term.writeln(`\r\n${cmd}`)
    history.forEach((cmd) => term.writeln(`  ${cmd}`))
    term.writeln("")
  },
})

registerCommand({
  name: "launch",
  usage: "launch <program_id>",
  help: "Launch a program by its ID. Example usage: launch software_center.",
  description: "Launch a program",
  execute: (term, args) => {
    const id = args[0]
    const programs = getAllProgramMetadata().filter((p) => p.runnable !== false)
    if (!id) {
      term.writeln("\r\n[help: launch <program_id>")
      term.writeln("\r\nAvailable program_id values:")
      Object.values(programs).forEach((p) => {
        term.writeln(`     - \u001b[36m${p.id}\u001b[0m`)
      })
      term.writeln("")
      return
    }
    launchProgram(term, id as LauncherId)
  },
})

registerCommand({
  name: "ps",
  description: "List running processes",
  execute: (term) => {
    const processes = Object.values(useProcessStore.getState().processes)

    const pid = "PID".padStart(7)
    const type = "TYPE".padEnd(10)
    const time = "TIME".padStart(10)
    const cmd = "CMD"

    term.writeln(`\r\n${pid} ${type} ${time} ${cmd}`)

    processes.forEach((proc) => {
      const pid = String(proc.id).padStart(7)
      const type = proc.launcher.target.type.padEnd(10)

      const diffMs = Date.now() - proc.startTimestamp
      const totalSeconds = Math.floor(diffMs / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`.padStart(10)

      let name = ""

      if (proc.launcher.target.type === "program") {
        name = proc.launcher.target.programId
      } else if (proc.launcher.target.type === "action") {
        name = proc.launcher.target.action
      }

      term.writeln(`${pid} ${type} ${time} ${name}`)
    })

    term.writeln("")
  },
})

registerCommand({
  name: "reboot",
  description: "Reboot the system",
  execute: (term) => {
    term.writeln("\r\nRebooting...")
    setTimeout(() => executeAction("reboot"), 1000)
  },
})

registerCommand({
  name: "shutdown",
  description: "Shut down the system",
  execute: (term) => {
    term.writeln("\r\nShutting down...")
    setTimeout(() => executeAction("shutdown"), 1000)
  },
})

registerCommand({
  name: "whoami",
  description: "Display the current user",
  execute: (term) => {
    term.writeln("\r\n\x1b[30mUSER:")
    term.writeln("Ron Bodnar\n")

    term.writeln("\x1b[30mORIGIN:")
    term.writeln("I started coding as a teenager, tinkering on private game servers")
    term.writeln("and rebuilding my favorite game with twists that players loved.")
    term.writeln("Along the way I learned databases, VPSes, server maintenance,")
    term.writeln("and surviving downtime under pressure.\n")

    term.writeln("\x1b[30mFIRST JOB:")
    term.writeln("Data entry. Everything was slow and tedious, so I built Java tools")
    term.writeln("to automate the work and simplify oversight.\n")

    term.writeln("\x1b[30mNOW:")
    term.writeln("I build software that solves real problems for businesses")
    term.writeln("and makes life easier for the people using it.\n")

    term.writeln("\x1b[30mINTERESTS:")
    term.writeln("When I'm not at work, I'm usually with my Yorkies, Buddy and Kenny")
    term.writeln("(they double as my rubber ducks).")
    term.writeln("I live on audiobooks—classics like Lonesome Dove and East of Eden,")
    term.writeln("plus the occasional book that sharpens my craft.")
  },
})
