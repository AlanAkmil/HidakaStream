import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "phosphor" | "alert";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider",
        variant === "default" && "bg-tapeLine/60 text-fog",
        variant === "phosphor" && "bg-phosphor text-ink",
        variant === "alert" && "bg-staticRed text-ink"
      )}
    >
      {children}
    </span>
  );
}
