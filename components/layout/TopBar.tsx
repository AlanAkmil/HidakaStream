"use client";

interface TopBarProps {
  query: string;
  onQueryChange: (v: string) => void;
  onSearch: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export function TopBar({
  query,
  onQueryChange,
  onSearch,
  onRefresh,
  refreshing,
}: TopBarProps) {
  return (
    <div className="flex items-center gap-2.5 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="flex flex-1 items-center gap-2 rounded-md border border-tapeLine bg-tape px-3.5 py-2.5 transition-colors focus-within:border-phosphor/60"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-fog"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari channel, contoh: sport..."
          className="w-full truncate bg-transparent font-mono text-sm text-paper placeholder:text-fog/70 focus:outline-none"
        />
        {query && (
          <button
            type="submit"
            className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-wide text-phosphor"
          >
            Cari
          </button>
        )}
      </form>

      <button
        onClick={onRefresh}
        aria-label="Muat ulang indeks"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-tapeLine bg-tape text-phosphor transition-all active:scale-90 hover:border-phosphor/60"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          className={refreshing ? "animate-spin" : ""}
        >
          <path
            d="M4 4V9H9M20 20V15H15M5.5 9C6.6 6.1 9.5 4 13 4C17.4 4 21 7.6 21 12M18.5 15C17.4 17.9 14.5 20 11 20C6.6 20 3 16.4 3 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
