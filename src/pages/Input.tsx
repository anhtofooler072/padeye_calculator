import PadeyeCalculator from "../components/PadeyeCalculator.tsx";
import { ModeToggle } from "../components/mode-toggle.tsx";

export default function Input() {
  return (
    <>
      {/* Grid Texture Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="flex flex-col gap-8 p-4 min-h-screen transition-colors duration-200">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold text-foreground">
            Padeye Design Validation
          </div>
          <ModeToggle />
        </div>

        {/* Calculator based on README */}
        <section>
          <PadeyeCalculator />
        </section>
      </div>
    </>
  );
}
