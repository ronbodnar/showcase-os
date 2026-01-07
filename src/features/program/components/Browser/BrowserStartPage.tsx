import { IconName } from "@features/theme/types"
import Icon from "@shared/components/icon/Icon"

export function BrowserStartPage({ onLaunchApp }: { onLaunchApp: (url: string) => void }) {
  const favorites = [
    { name: "CoreFlow ERP", url: "https://erp.ronbodnar.com/", icon: "CoreFlowERP" },
    { name: "Showcase OS", url: "https://ronbodnar.com/", icon: "ShowcaseOS" },
    { name: "Grid of Words", url: "https://play.ronbodnar.com/", icon: "GridOfWords" },
    { name: "TMS Prototype", url: "https://tms.ronbodnar.com/", icon: "TMSPrototype" },
  ]

  return (
    <div className="absolute inset-0 flex items-start justify-center bg-linear-to-br from-window to-window/90 text-text p-8">
      <div className="grid grid-cols-4 gap-8 max-w-3xl w-full">
        {favorites.map((app) => (
          <button
            key={app.url}
            onClick={() => onLaunchApp(app.url)}
            className="flex flex-col items-center group gap-3 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-xl bg-surface-alt border border-border flex items-center justify-center backdrop-blur-sm group-hover:bg-surface-hover group-hover:scale-105 group-hover:border-accent/90 transition-all shadow-lg">
              <Icon name={app.icon as IconName} className="w-8 h-8 text-gray-200" />
            </div>
            <span className="text-sm font-medium text-text transition-colors">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
