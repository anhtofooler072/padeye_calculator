import { useState } from "react";
import CombinedPadeye from "../components/konva/CombinedPadeye";

export default function Input() {
  const PAD_CANVAS = 520; // Shared canvas size for both views

  const [params, setParams] = useState({
    width: 180, // Total width of the plate (main plate diameter)
    baseHeight: 120, // Height of the straight rectangular section
    holeDia: 40, // Diameter of the shackle hole
    cheekDia: 70, // Diameter of cheek plate
    mainThk: 30, // Main plate thickness
    cheekThk: 20, // Cheek plate thickness
  });

  const [draftParams, setDraftParams] = useState({
    width: "180",
    baseHeight: "120",
    holeDia: "40",
    cheekDia: "70",
    mainThk: "30",
    cheekThk: "20",
  });

  const handleGenerate = () => {
    const newHoleDia = Number(draftParams.holeDia) || 40;
    let newCheekDia = Number(draftParams.cheekDia) || 70;
    let newWidth = Number(draftParams.width) || 180;
    let newBaseHeight = Number(draftParams.baseHeight) || 120;
    const newMainThk = Number(draftParams.mainThk) || 30;
    const newCheekThk = Number(draftParams.cheekThk) || 20;

    // Apply basic visual constraints
    const minCheekDia = newHoleDia + 20;
    newCheekDia = Math.max(newCheekDia, minCheekDia);

    const minWidth = newCheekDia + 20;
    newWidth = Math.max(newWidth, minWidth);

    const minBaseHeight = Math.max(newWidth / 2 + 20, newCheekDia / 2 + 20);
    newBaseHeight = Math.max(newBaseHeight, minBaseHeight);

    setParams({
      width: newWidth,
      baseHeight: newBaseHeight,
      holeDia: newHoleDia,
      cheekDia: newCheekDia,
      mainThk: Math.max(1, newMainThk),
      cheekThk: Math.max(1, newCheekThk),
    });

    setDraftParams({
      width: newWidth.toString(),
      baseHeight: newBaseHeight.toString(),
      holeDia: newHoleDia.toString(),
      cheekDia: newCheekDia.toString(),
      mainThk: Math.max(1, newMainThk).toString(),
      cheekThk: Math.max(1, newCheekThk).toString(),
    });
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar UI */}
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

        <button
          onClick={handleGenerate}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors shadow-sm">
          Generate
        </button>
      </aside>

      {/* Main View: Both canvases side by side */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center p-10 gap-10">
        <h2 className="text-2xl font-bold text-slate-800 self-start mb-2">
          Padeye Visualization
        </h2>
        <CombinedPadeye
          params={params}
          padCanvas={PAD_CANVAS}
        />
      </main>
    </div>
  );
}
