import { ColorBars } from "@/components/ui/ColorBars";

export function Footer() {
  return (
    <footer className="border-t border-tapeLine">
      <ColorBars height="h-1" />
      <div className="mx-auto max-w-6xl px-5 py-6">
        <p className="font-mono text-[10px] leading-relaxed text-fog">
          HidakaStream cuma mengindeks tautan yang sudah publik dari tbcpl.lol
          dan tidak menghosting konten apa pun. Semua link mengarah ke pihak
          ketiga.
        </p>
      </div>
    </footer>
  );
}
