import { memo } from "react"
import { overlayService } from "@core/services/overlayService"
import { IconList } from "@shared/components/IconList"
import Icon from "@shared/components/Icon"

interface SystemInfoEntry {
  label: string
  value: string | string[]
  href?: string
  tooltip?: string
  drawBottomBorder?: boolean
}

export const SystemInfo = memo(function SystemInfo() {
  const entries: SystemInfoEntry[] = [
    { label: "User", value: "Ron Bodnar" },
    {
      label: "Email",
      value: "ron.bodnar@outlook.com",
      href: "mailto:ron.bodnar@outlook.com",
    },
    { label: "Role", value: "Full-Stack Software Engineer" },
    { label: "Uptime", value: "15+ years coding (8 professionally)" },
    {
      label: "Focus",
      value: "Building scalable, user-focused systems",
    },
    {
      label: "Specialities",
      value: "Internal platforms & workflow automation",
    },
    {
      label: "Extensions",
      value: "Family, yorkies, audiobooks, tinkering with ideas",
    },
    {
      label: "Primary Stack",
      value: ["Java", "Spring", "MySQL", "Angular", "TypeScript"],
      tooltip: "Core technologies applied extensively in full-stack projects",
    },
    {
      label: "Tools & Packages",
      value: ["React", "NodeJS", "Python", "RxJS", "Docker", "GitHubActions", "Nginx"],
      tooltip: "Familiar tools leveraged confidently in production",
    },
    {
      label: "Core System",
      value: ["Git", "HTML5", "CSS3", "Linux", "JavaScript"],
      tooltip: "Foundational tech I apply across most projects",
      drawBottomBorder: false,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col pb-5 items-center overflow-y-auto">
        <div className="py-4">
          <Icon name="User" className="w-30 h-30 rounded-full" />
        </div>

        <div className="mx-4 md:mx-0 md:w-5/6 flex flex-col border border-border text-text">
          {entries.map((entry) => (
            <InfoEntry key={entry.label} {...entry} />
          ))}
        </div>
      </div>
    </div>
  )
})

interface InfoEntryProps {
  label: string
  value: string | string[]
  href?: string
  tooltip?: string
  drawBottomBorder?: boolean
}

// Renders text or an IconList if the value is an array
function InfoEntry({ href, label, value, tooltip, drawBottomBorder = true }: InfoEntryProps) {
  const isArray = Array.isArray(value)
  return (
    <div
      className={`
        flex flex-col @xl:flex-row justify-between
        ${drawBottomBorder ? "border-b border-border-lighter" : ""} 
        hover:bg-surface-hover py-2 px-6`}
    >
      <div className="flex gap-1 text-sm text-muted">
        {label}
        {tooltip && (
          <span
            className="italic text-xs text-accent"
            onMouseEnter={(e) =>
              overlayService.showOverlayWithDelay(e, "tooltip", { text: tooltip })
            }
            onMouseLeave={() => overlayService.hideOverlayIfType("tooltip")}
          >
            [?]
          </span>
        )}
      </div>

      {!isArray &&
        (href ? (
          <a
            target="_blank"
            className="text-sm text-accent underline underline-offset-4 @xl:self-end select-text"
            href={href}
          >
            {value}
          </a>
        ) : (
          <span className="text-sm @xl:self-end select-text">{value}</span>
        ))}
      {isArray && <IconList id={label} icons={value} />}
    </div>
  )
}

export default SystemInfo
