export function ProgramLoading() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full backdrop-blur-lg text-text">
      <div className="relative size-15">
        <div
          className="
            absolute w-full h-full rounded-full animate-[spin_2s_linear_infinite]
            bg-[conic-gradient(var(--color-muted)_0%,transparent_75%)]
            mask-[radial-gradient(circle,transparent_60%,black_61%)]
            "
        />
      </div>
    </div>
  )
}
