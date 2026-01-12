import { Button } from "@shared/components/Button"
import Icon from "@shared/components/Icon"

export interface CarouselControlsProps {
  index: number
  items: number
  prev: () => void
  next: () => void
  setIndex: (index: number) => void
}

export function CarouselControls({ index, items, prev, next, setIndex }: CarouselControlsProps) {
  return (
    <section className="absolute right-2 bottom-2 bg-black/30 px-2 py-1 rounded-3xl z-20 flex items-center gap-3">
      <Button onClick={prev}>
        <Icon
          name="ChevronLeft"
          className="text-stone-200 w-4 h-4 hover:brightness-110 cursor-pointer"
        />
      </Button>

      <div className="flex gap-2">
        {[...Array(items)].map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-stone-200" : "bg-stone-200/20"}`}
          />
        ))}
      </div>

      <Button onClick={next}>
        <Icon
          name="ChevronRight"
          className="text-stone-200 w-4 h-4 hover:brightness-110 cursor-pointer"
        />
      </Button>
    </section>
  )
}
