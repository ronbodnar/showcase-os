import { IconName } from "@features/theme/types"
import Icon from "../icon/Icon"

export const IconList = ({ id, icons }: { id: string | number; icons: string[] }) => {
  return (
    <div className="flex flex-wrap gap-y-2">
      {icons.map((tech, index) => (
        <div key={id + tech} className={`flex gap-1 ${getTechMargin(tech, index, icons)}`}>
          <Icon name={tech as IconName} tooltip={"icon"} className="w-6 h-6" />
        </div>
      ))}
    </div>
  )
}

function getTechMargin(tech: string, index: number, technologies: string[]) {
  const isLast = index === technologies.length - 1
  const thinIcons = ["MongoDB"]
  const nextIsThin = index < technologies.length - 1 && thinIcons.includes(technologies[index + 1])

  if (isLast) return ""
  return thinIcons.includes(tech) || nextIsThin ? "mr-2" : "mr-4"
}
