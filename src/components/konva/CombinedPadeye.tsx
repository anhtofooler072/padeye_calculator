import PadeyeDraft from "./Padeye";
import PadeyeSide from "./PadeyeSide";

interface PadeyeParams {
  width: number;
  baseHeight: number;
  holeDia: number;
  cheekDia: number;
  mainThk: number;
  cheekThk: number;
}

interface CombinedPadeyeProps {
  params: PadeyeParams;
  padCanvas: number;
}

export default function CombinedPadeye({
  params,
  padCanvas,
}: CombinedPadeyeProps) {
  return (
    <div className="flex flex-row gap-10 items-center justify-center w-full">
      <div className="flex flex-col items-center">
        <span className="text-slate-600 font-semibold mb-3">Front View</span>
        <PadeyeDraft
          params={params}
          padCanvas={padCanvas}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-slate-600 font-semibold mb-3">Side View</span>
        <PadeyeSide
          params={params}
          padCanvas={padCanvas}
        />
      </div>
    </div>
  );
}
