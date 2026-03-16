import PadeyeCalculator from "../components/PadeyeCalculator.tsx";
import { ModeToggle } from "../components/mode-toggle.tsx";

export default function Input() {
  return (
    <div className="flex flex-col gap-8 p-4 bg-background min-h-screen transition-colors duration-200">
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
  );
}
