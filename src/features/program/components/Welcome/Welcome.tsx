import { processService } from "@core/services/processService"
import { useSettingsStore } from "@core/store/useSettingsStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { launcherService } from "@features/launcher/services/launcherService"
import { LauncherId } from "@features/launcher/types"
import Icon from "@shared/components/Icon"

export default function Welcome() {
  const textSections = [
    "Welcome to my interactive portfolio!",

    "I'm Ron Bodnar, a software engineer based near Los Angeles, CA. I build software that solves real problems for businesses and improves the experience for the people using it.",

    "This environment is designed to feel like a real operating system, inspired by my personal Linux Mint setup.",

    "You can explore projects, launch applications, manage windows, adjust the theme, and more — just like a real desktop environment. Feel free to explore and send any feedback.",

    "Ready to get started? Open a launcher below.",
  ]
  const launchers: LauncherId[] = ["software_center", "terminal", "system_settings", "browser"]

  const showWelcome = useSettingsStore((state) => state.showWelcome)

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

        <div className="flex justify-around gap-5">
          {launchers.map((launcher) => {
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
                <span className="text-sm text-muted">{launcherMeta.label ?? "Unknown"}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end items-center gap-1 px-3 bg-window h-7">
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
