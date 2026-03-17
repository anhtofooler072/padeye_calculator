import PadeyeDraft from "./Padeye";
import PadeyeSide from "./PadeyeSide";
import { usePadeye } from "../calculator/PadeyeContext";

interface PadeyeParams {
  width: number;
  baseHeight: number;
  holeDia: number;
  cheekDia: number;
  mainThk: number;
  cheekThk: number;
  shackleA?: number;
  shackleB?: number;
  shackleC?: number;
  slingD?: number;
}

interface CombinedPadeyeProps {
  params: PadeyeParams;
  padCanvas: number;
  constraint?: boolean;
}

export default function CombinedPadeye({
  params,
  padCanvas,
  constraint = true,
}: CombinedPadeyeProps) {
  const { setFrontViewDataURL, setSideViewDataURL } = usePadeye();

  const mergedParams = {
    shackleA: 80,
    shackleB: 38.1,
    shackleC: 133,
    slingD: 30,
    ...params,
  };

  const totalThickness = mergedParams.mainThk + 2 * mergedParams.cheekThk;
  const shackleA = mergedParams.shackleA;
  const isJawWidthValid = shackleA > totalThickness;
  const isThicknessValid = totalThickness > 0.75 * shackleA;

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
        <div className="flex flex-col items-center">
          <span className="text-slate-600 font-semibold mb-3">Front View</span>
          <PadeyeDraft
            params={mergedParams}
            padCanvas={padCanvas}
            onImageReady={setFrontViewDataURL}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-slate-600 font-semibold mb-3">Side View</span>
          <PadeyeSide
            params={mergedParams}
            padCanvas={padCanvas}
            onImageReady={setSideViewDataURL}
          />
        </div>
      </div>

      {constraint && (!isJawWidthValid || !isThicknessValid) && (
        <div className="text-amber-700 bg-amber-50 p-3 rounded-md text-center text-sm font-medium border border-amber-200 max-w-2xl mx-auto shadow-sm">
          ⚠️ <strong>Clearance Constraint Warning:</strong>
          {!isJawWidthValid &&
            ` Jaw width A (${shackleA}mm) must be greater than total padeye thickness (${totalThickness}mm).`}
          {!isThicknessValid &&
            ` Total thickness (${totalThickness}mm) should be greater than 75% of Jaw width A (${(0.75 * shackleA).toFixed(1)}mm).`}
        </div>
      )}
    </div>
  );
}
