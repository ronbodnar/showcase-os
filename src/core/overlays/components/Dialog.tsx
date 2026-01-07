import { motion } from "motion/react"

export interface DialogProps {
  title?: string
  content?: React.ComponentType
}

export function Dialog({ title, content: ContentComponent }: DialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-xs"
    >
      <div className="flex flex-col items-center bg-surface text-text p-4 rounded-3xl shadow-2xl border border-border min-w-[300px] max-w-[50vw]">
        <h1 className="text-xl font-semibold m-3">{title}</h1>
        {ContentComponent && <ContentComponent />}
      </div>
    </motion.div>
  )
}
