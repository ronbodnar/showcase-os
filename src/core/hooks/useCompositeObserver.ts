import { useEffect, useRef } from "react"

export interface ObservedCompositeState {
  ref: HTMLDivElement | null
  isIframe: boolean
  dirty: boolean
}

export const useCompositeObserver = ({
  windowIds,
  windowFrameRefs,
}: {
  windowIds: string[]
  windowFrameRefs: Record<string, React.RefObject<HTMLDivElement | null>>
}) => {
  const composites = useRef<Record<string, ObservedCompositeState>>({})

  useEffect(() => {
    const observers: MutationObserver[] = []

    windowIds.forEach((windowId) => {
      const refObj = windowFrameRefs[windowId]

      const original = refObj?.current
      if (!original) {
        return
      }

      const iframe = original.querySelector("iframe") as HTMLIFrameElement | null

      composites.current[windowId] = {
        ref: null,
        dirty: true,
        isIframe: !!iframe,
      }

      const observer = new MutationObserver(() => (composites.current[windowId].dirty = true))

      observer.observe(original, {
        attributes: true,
        subtree: true,
        childList: true,
      })

      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [windowIds, windowFrameRefs])

  return { composites }
}
