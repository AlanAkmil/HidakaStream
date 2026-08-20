import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "signal" | "alert";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        variant === "default" && "border-line text-static",
        variant === "signal" && "border-signal text-signal",
        variant === "alert" && "border-alert text-alert"
      )}
    >
      {children}
    </span>
  );
}
