import PadeyeCalculator from "../components/PadeyeCalculator.tsx";

export default function Input() {
  return (
    <div className="flex flex-col gap-8 p-4 bg-slate-50 min-h-screen">
      <div className="text-3xl font-bold text-slate-800">
        Padeye Design Validation
      </div>

      {/* Calculator based on README */}
      <section>
        <PadeyeCalculator />
      </section>
    </div>
  );
}
