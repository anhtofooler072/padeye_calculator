import React from "react";

export interface DraftParams {
  width: string;
  baseHeight: string;
  holeDia: string;
  cheekDia: string;
  mainThk: string;
  cheekThk: string;
  shackleA: string;
  shackleB: string;
  shackleC: string;
  slingD: string;
}

interface PadeyeConfigProps {
  draftParams: DraftParams;
  setDraftParams: React.Dispatch<React.SetStateAction<DraftParams>>;
  onGenerate: () => void;
}

export default function PadeyeConfig({
  draftParams,
  setDraftParams,
  onGenerate,
}: PadeyeConfigProps) {
  return (
    <aside className="w-72 bg-white p-6 border-r border-slate-300 flex flex-col gap-6 overflow-y-auto">
      <h1 className="font-bold text-lg text-slate-800">Padeye Config</h1>

      {/* Plate Width / Main Dia Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Main Plate Dia (Width)
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.width}
            onChange={(e) =>
              setDraftParams({ ...draftParams, width: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Cheek Plate Diameter Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Cheek Plate Dia
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.cheekDia}
            onChange={(e) =>
              setDraftParams({ ...draftParams, cheekDia: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Base Height Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Base Height
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.baseHeight}
            onChange={(e) =>
              setDraftParams({ ...draftParams, baseHeight: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Hole Diameter Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Hole Diameter
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.holeDia}
            onChange={(e) =>
              setDraftParams({ ...draftParams, holeDia: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Main Plate Thickness Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Main Plate Thick.
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.mainThk}
            onChange={(e) =>
              setDraftParams({ ...draftParams, mainThk: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Cheek Plate Thickness Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Cheek Plate Thick.
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.cheekThk}
            onChange={(e) =>
              setDraftParams({ ...draftParams, cheekThk: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Shackle Inside Width (A) Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Shackle Width (A)
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.shackleA}
            onChange={(e) =>
              setDraftParams({ ...draftParams, shackleA: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Shackle Inside Length (C) Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Shackle Length (C)
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.shackleC}
            onChange={(e) =>
              setDraftParams({ ...draftParams, shackleC: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Shackle Pin Dia (B) Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Shackle Pin Dia (B)
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.shackleB}
            onChange={(e) =>
              setDraftParams({ ...draftParams, shackleB: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      {/* Sling Diameter Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
          Sling Diameter
        </label>
        <div className="relative">
          <input
            type="number"
            value={draftParams.slingD}
            onChange={(e) =>
              setDraftParams({ ...draftParams, slingD: e.target.value })
            }
            className="w-full border border-slate-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 transition-shadow"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">
            mm
          </span>
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors shadow-sm">
        Generate
      </button>
    </aside>
  );
}
