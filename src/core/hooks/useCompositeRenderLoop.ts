import { useEffect } from "react"
import { ObservedCompositeState } from "./useCompositeObserver"
import { ContainerSize } from "types"

export const useCompositeRenderLoop = ({
  renderSize,
  composites,
  compositeSourceRefs,
}: {
  renderSize: ContainerSize
  composites: React.RefObject<Record<string, ObservedCompositeState>>
  compositeSourceRefs: Record<string, React.RefObject<HTMLDivElement | null>>
}) => {
  useEffect(() => {
    let animationFrameId: number
    let lastTimestamp = 0
    const targetFPS = 20 // 15–30 is reasonable; 20fps is smooth enough
    const frameDuration = 1000 / targetFPS

    function updateComposites(timestamp: number) {
      if (timestamp - lastTimestamp >= frameDuration) {
        lastTimestamp = timestamp

        Object.entries(composites.current).forEach(([windowId, composite]) => {
          if (!composite.dirty) return

          const refObj = compositeSourceRefs[windowId]
          const original = refObj.current

          const { isIframe, ref: compositeEl } = composite

          if (!compositeEl || !original) return

          composite.dirty = false

          compositeEl.innerHTML = ""

          const width = isIframe ? 1200 : (original.clientWidth ?? 1)
          const height = isIframe ? 800 : (original.clientHeight ?? 1)

          const widthScale = renderSize.width / width
          const heightScale = renderSize.height / height
          const scale = Math.min(widthScale, heightScale)

          const scaledWidth = width * scale
          const scaledHeight = height * scale

          const offsetX = (renderSize.width - scaledWidth) / 2
          const offsetY = (renderSize.height - scaledHeight) / 2

          if (composite.isIframe) {
            compositeEl.innerHTML = `<div class="flex items-center justify-center w-full h-full text-8xl text-text/70">Preview unavailable</div>`
          } else {
            const clone = original.cloneNode(true) as HTMLElement
            compositeEl.appendChild(clone)
          }

          compositeEl.style.top = offsetY + "px"
          compositeEl.style.left = offsetX + "px"
          compositeEl.style.width = width + "px"
          compositeEl.style.height = height + "px"
          compositeEl.style.transform = `scale(${scale})`
        })
      }

      animationFrameId = requestAnimationFrame(updateComposites)
    }

    animationFrameId = requestAnimationFrame(updateComposites)

    return () => cancelAnimationFrame(animationFrameId)
  }, [renderSize, composites, compositeSourceRefs])
}
