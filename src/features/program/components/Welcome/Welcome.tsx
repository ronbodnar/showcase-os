import { processService } from "@core/services/processService"
import { useOSStore } from "@core/store/useOSStore"
import { useSettingsStore } from "@core/store/useSettingsStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { launcherService } from "@features/launcher/services/launcherService"
import { LauncherId } from "@features/launcher/types"
import Icon from "@shared/components/Icon"

export default function Welcome() {
  const isDesktop = useOSStore((state) => state.isDesktop())

  const textSections = [
    "Welcome to my interactive portfolio!",

    `This environment is designed to feel like a real operating system, inspired by${isDesktop ? "" : " Android and"} my personal Linux Mint setup.`,

    `You can explore projects, launch applications,${isDesktop ? " manage windows," : ""} adjust the theme, and more — just like a real ${isDesktop ? "desktop" : "mobile"} environment. Feel free to explore and send any feedback.`,

    `Ready to get started? ${isDesktop ? "Open" : "Tap"} a launcher below.`,
  ]
  const launchers: LauncherId[] = ["about", "projects", "terminal", "system_settings", "browser"]

  const showWelcome = useSettingsStore((state) => state.showWelcome)

  const renderLauncher = (launcher: LauncherId) => {
    const launcherMeta = getLauncherMeta(launcher)

    const handleClick = () => {
      processService.stopProcessesWithProgramId("welcome")
      launcherService.openLauncher(launcherMeta)
    }

    return (
      <div
        key={launcher}
        className="flex flex-col items-center gap-2 cursor-pointer hover:drop-shadow-2xl hover:drop-shadow-neutral-950/50 hover:brightness-110"
        onClick={handleClick}
      >
        <Icon name={launcherMeta.icon ?? "AppPlaceholder"} className="w-8 h-8" />
        <span className="text-sm text-muted text-center">{launcherMeta.label ?? "Unknown"}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-1 flex-col gap-5 p-5 text-text">
        <h1 className="text-2xl font-bold border-b border-border-lighter pb-5">
          Welcome to Showcase OS
        </h1>

        {textSections.map((section, i) => (
          <p key={i} className="text-sm">
            {section}
          </p>
        ))}

        {/* Mobile layout */}
        <div className="flex flex-1 w-full justify-evenly flex-col gap-5 lg:hidden">
          <div className="grid grid-cols-3 gap-5">{launchers.slice(0, 3).map(renderLauncher)}</div>

          <div className="flex justify-around gap-5">
            {launchers.slice(3, 5).map(renderLauncher)}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex lg:flex-1 flex-wrap items-center justify-around gap-5">
          {launchers.map(renderLauncher)}
        </div>
      </div>

      <div className="flex justify-end items-center gap-1 px-3 bg-window h-10 lg:h-7">
        <input
          type="checkbox"
          className="text-text accent-accent rounded"
          checked={showWelcome}
          onChange={(e) => useSettingsStore.getState().setShowingWelcome(e.target.checked)}
        />
        <p className="text-sm text-text">Show this dialog at startup</p>
      </div>
    </div>
  )
}
