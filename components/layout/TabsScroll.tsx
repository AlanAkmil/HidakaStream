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
    <div className="scrollbar-none flex gap-5 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            "shrink-0 whitespace-nowrap pb-2 font-display text-[15px] transition-colors",
            active === item
              ? "border-b-2 border-signal font-semibold text-paper"
              : "text-static"
          )}
        >
          {labels?.[item] ?? item}
        </button>
      ))}
    </div>
  );
}
