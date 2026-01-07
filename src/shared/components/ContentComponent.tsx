import { debugMessage, isValidObject } from "@shared/utils/utils"

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType | React.LazyExoticComponent<React.ComponentType<any>>
  args?: Record<string, unknown>
}

export function ContentComponent({ component: Component, args }: Props) {
  if (!Component || !isValidObject(args)) {
    debugMessage("ContentComponent component or args are missing or invalid", Component, args)
    return null
  }
  return <Component {...args} />
}
