import PadeyeCalculator from "../components/PadeyeCalculator.tsx";
import { ModeToggle } from "../components/mode-toggle.tsx";
import { CanvasText } from "../components/ui/canvas-text.tsx";
import { cn } from "@/lib/utils";

export default function Input() {
  return (
    <>
      {/* Grid Texture Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="flex flex-col gap-8 p-4 min-h-screen transition-colors duration-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2
            className={cn(
              "font-['Montserrat'] group relative max-w-2xl text-left text-lg leading-20 font-bold tracking-tight text-balance text-neutral-600 sm:text-4xl md:text-5xl xl:text-6xl dark:text-neutral-300",
            )}>
            Padeye Design{" "}
            <CanvasText
              text="Validation"
              backgroundClassName="bg-orange-500 dark:bg-orange-600 !text-white"
              colors={[
                "rgba(249, 115, 22, 1)",
                "rgba(249, 115, 22, 0.9)",
                "rgba(249, 115, 22, 0.8)",
                "rgba(249, 115, 22, 0.7)",
                "rgba(249, 115, 22, 0.6)",
                "rgba(249, 115, 22, 0.5)",
                "rgba(249, 115, 22, 0.4)",
                "rgba(249, 115, 22, 0.3)",
                "rgba(249, 115, 22, 0.2)",
                "rgba(249, 115, 22, 0.1)",
              ]}
              lineGap={4}
              animationDuration={20}
            />
          </h2>
          <div className="shrink-0">
            <ModeToggle />
          </div>
        </div>

        {/* Calculator based on README */}
        <section>
          <PadeyeCalculator />
        </section>
      </div>
    </>
  );
}
