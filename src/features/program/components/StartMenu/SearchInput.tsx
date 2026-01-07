import Icon from "@shared/components/icon/Icon"

export function SearchInput({
  onSearch,
}: {
  onSearch: (e: React.FormEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search by name, description, or technology"
        className="w-full outline outline-accent placeholder-muted rounded-sm bg-surface px-2 py-1 text-text text-sm"
        onInput={onSearch}
        autoFocus={true}
      />
      <Icon name="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-text" />
    </div>
  )
}
