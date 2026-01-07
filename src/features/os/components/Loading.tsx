export function Loading() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm text-stone-200">
      <div className="relative size-20">
        <div
          className="
            absolute w-full h-full rounded-full animate-[spin_1.6s_linear_infinite]
            bg-[conic-gradient(var(--color-accent)_0%,transparent_85%)]
            mask-[radial-gradient(circle,transparent_60%,black_61%)]
            "
        ></div>

        <div
          className="
            absolute inset-0 rounded-full animate-[spin_2.2s_linear_infinite]
            [animation-direction:reverse]
            bg-[conic-gradient(transparent_0%,var(--color-text)_10%,transparent_20%)]
            opacity-40
            mask-[radial-gradient(circle,transparent_58%,black_59%)]
          "
        />
      </div>
      <h2 className="text-lg">Preparing the environment...</h2>
    </div>
  )
}
