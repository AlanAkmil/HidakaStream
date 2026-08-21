export function ColorBars({
  animated = false,
  height = "h-1.5",
}: {
  animated?: boolean;
  height?: string;
}) {
  return (
    <div
      className={`w-full ${height} bg-bars bg-[length:200%_100%] ${
        animated ? "animate-staticPulse" : ""
      }`}
      aria-hidden="true"
    />
  );
}
