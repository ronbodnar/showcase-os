import "./commands/defaultCommands"

import "@xterm/xterm/css/xterm.css"
import { Terminal as XTerm } from "@xterm/xterm"

import { FitAddon } from "@xterm/addon-fit"
import { useEffect, useMemo, useRef } from "react"
import { getAllCommands, getCommand } from "./commands/commandRegistry"
import { useOSStore } from "@core/store/useOSStore"
import { useTheme } from "@features/theme/hooks/useTheme"
import { useWindowStore } from "@features/window/store/useWindowStore"

interface TerminalProps {
  windowId: string
}

export default function Terminal({ windowId }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<XTerm | null>(null)
  const fitAddon = useMemo(() => new FitAddon(), [])

  const isMobile = useOSStore((state) => state.platform === "mobile")
  const isFocused = useWindowStore((state) => state.zOrder[state.zOrder.length - 1] === windowId)
  const theme = useTheme()

  // Focus terminal when window is focused
  useEffect(() => {
    if (isFocused && termRef.current) {
      requestAnimationFrame(() => {
        termRef.current?.focus()
      })
    }
  }, [isFocused])

  // Initialize ResizeObserver to handle dynamic resizing
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(() => {
      fitAddon.fit()
      termRef.current?.focus()
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [fitAddon])

  // Theme terminal
  useEffect(() => {
    if (termRef.current?.options.theme) {
      termRef.current.options.theme = {
        ...termRef.current.options.theme,
        background: theme.colors.window,
        black: theme.colors.text,
      }
    }
  }, [theme])

  // Initialize terminal and fit addon
  useEffect(() => {
    if (!containerRef.current || termRef.current) return

    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "monospace",
      fontSize: 12,
      theme: { background: theme.colors.window, black: theme.colors.text },
    })

    term.loadAddon(fitAddon)
    term.open(containerRef.current)
    term.focus()
    fitAddon.fit()

    termRef.current = term

    // Buffer spacing for pushing text below mobile ScrollableContent
    if (isMobile) {
      term.write("\r\n")
    }

    term.writeln("\x1b[30mType 'help' to see available commands.\r\n")

    let buffer = ""
    const history: string[] = []
    let historyIndex = -1

    const prompt = () => term.write("\x1b[32mron@showcase-os\x1b[30m\x1b[34m~\x1b[30m$ ")

    const handleCommand = async (input: string) => {
      if (!input) return
      history.push(input)
      historyIndex = history.length
      const [cmd, ...args] = input.split(" ")
      const command = getCommand(cmd)
      if (command) {
        try {
          const execResult = command.execute(term, args, { windowId, history })
          if (execResult instanceof Promise) {
            await execResult
          }
        } catch (e) {
          term.writeln(`\r\n\u001b[31mError executing ${cmd}:\u001b[0m ${e}`)
        }
      } else {
        term.writeln(`\r\nCommand not found: ${cmd}`)
      }
    }

    term.onData((data) => {
      if (data === "\r") {
        // Enter key
        handleCommand(buffer.trim())
        buffer = ""
        prompt()
      } else if (data === "\u007F") {
        // Backspace
        if (buffer.length > 0) {
          buffer = buffer.slice(0, -1)
          term.write("\b \b")
        }
      } else if (data === "\x09") {
        // Tab key
        const commands = getAllCommands().map((c) => c.name)
        const matches = commands.filter((cmd) => cmd.startsWith(buffer))
        if (matches.length === 1) {
          // Only one match, auto-complete
          buffer = matches[0]
          term.write("\x1b[2K\r") // clear line
          prompt()
          term.write(buffer)
        } else if (matches.length > 1) {
          // Multiple matches: list options
          term.write("\r\n")
          matches.forEach((m) => term.writeln(`  ${m}`))
          prompt()
          term.write(buffer)
        }
      } else if (data === "\x1b[A") {
        // Up arrow / previous command
        if (history.length === 0) {
          return
        }
        historyIndex = Math.max(0, historyIndex - 1)
        buffer = history[historyIndex]

        term.write("\x1b[2K\r") // Clear current line
        prompt()
        term.write(buffer)
      } else if (data === "\x1b[B") {
        // Down arrow / next command
        if (history.length === 0) {
          return
        }
        historyIndex = Math.min(history.length, historyIndex + 1)
        buffer = historyIndex < history.length ? history[historyIndex] : ""

        term.write("\x1b[2K\r") // Clear current line
        prompt()
        term.write(buffer)
      } else {
        buffer += data
        term.write(data)
      }
    })

    prompt()
  }, [windowId, isMobile, fitAddon, theme])

  return (
    <div className="w-full h-full bg-window text-text">
      {/* 99% height to account for the scrollable container overlay */}
      <div
        ref={containerRef}
        className={`w-full ${isMobile ? "h-[99%]" : "h-full"}`}
        style={{ overflow: "hidden" }}
      />
    </div>
  )
}
