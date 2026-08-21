"use client";

import { cn } from "@/lib/utils";

export function TabsScroll<T extends string>({
  items,
  active,
  onChange,
  labels,
}: {
  items: T[];
  active: T;
  onChange: (v: T) => void;
  labels?: Partial<Record<T, string>>;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            "shrink-0 whitespace-nowrap rounded-md border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition-all active:scale-95",
            active === item
              ? "border-phosphor bg-phosphor/10 text-phosphor"
              : "border-tapeLine bg-tape text-fog hover:border-fog"
          )}
        >
          {labels?.[item] ?? item}
        </button>
      ))}
    </div>
  );
}
