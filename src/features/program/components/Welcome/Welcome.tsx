import { config } from "@config/config"
import { processService } from "@core/services/processService"
import { useSettingsStore } from "@core/store/useSettingsStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { launcherService } from "@features/launcher/services/launcherService"
import { LauncherId } from "@features/launcher/types"
import Icon from "@shared/components/Icon"

export default function Welcome() {
  const { title, text, launchers } = config.welcome

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
        <Icon name={launcherMeta.icon ?? "AppPlaceholder"} className="w-10 h-10" />
        <span className="text-sm text-muted text-center">{launcherMeta.label ?? "Unknown"}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-1 flex-col gap-5 p-5 text-text">
        <h1 className="m-0 text-2xl font-bold border-b border-border-lighter text-center">
          {title}
        </h1>

        <div className="flex flex-col gap-5 my-4">
          {text.map((section, i) => (
            <p key={i} className="text-sm">
              {section}
            </p>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="flex flex-1 w-full justify-evenly flex-col gap-5 lg:hidden">
          <div className="grid grid-cols-3 gap-5">{launchers.slice(0, 3).map(renderLauncher)}</div>

          <div className="flex justify-around gap-5">
            {launchers.slice(3, 5).map(renderLauncher)}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex lg:flex-1 flex-wrap items-start justify-around gap-5">
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
