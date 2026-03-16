import { useState } from "react";
import { Stage, Layer, Rect, Group, Line, Text } from "react-konva";

const PadeyeSide = () => {
  const [params, setParams] = useState({
    mainDia: 180, // Main plate diameter
    cheekDia: 70, // Cheek plate diameter
    baseHeight: 120, // Base height
    mainThk: 30, // Main plate thickness
    cheekThk: 20, // Cheek plate thickness
  });

  const [draftParams, setDraftParams] = useState({
    mainDia: "180",
    cheekDia: "70",
    baseHeight: "120",
    mainThk: "30",
    cheekThk: "20",
  });

  const handleGenerate = () => {
    const newMainDia = Number(draftParams.mainDia) || 180;
    const newCheekDia = Number(draftParams.cheekDia) || 70;
    const newBaseHeight = Number(draftParams.baseHeight) || 120;
    const newMainThk = Number(draftParams.mainThk) || 30;
    const newCheekThk = Number(draftParams.cheekThk) || 20;

    setParams({
      mainDia: newMainDia,
      cheekDia: newCheekDia,
      baseHeight: newBaseHeight,
      mainThk: newMainThk,
      cheekThk: newCheekThk,
    });

    setDraftParams({
      mainDia: newMainDia.toString(),
      cheekDia: newCheekDia.toString(),
      baseHeight: newBaseHeight.toString(),
      mainThk: newMainThk.toString(),
      cheekThk: newCheekThk.toString(),
    });
  };

  const PAD_CANVAS = 400; // px

  // Derived dimensions
  const mainHeight = params.baseHeight + params.mainDia / 2;
  const cheekHeight = params.cheekDia;

  // Calculate actual bounding dimensions
  const totalDrawingWidth = params.cheekThk * 2 + params.mainThk;
  const totalDrawingHeight = mainHeight;

  // Leave some padding around the drawing (e.g., 60% of canvas size)
  const maxDrawingSize = PAD_CANVAS * 0.6;
  const scaleX = maxDrawingSize / totalDrawingWidth;
  const scaleY = maxDrawingSize / totalDrawingHeight;

  // Preserve aspect ratio
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = totalDrawingWidth * scale;
  const scaledHeight = totalDrawingHeight * scale;

  // Center the drawing completely in the canvas
  const offsetX = (PAD_CANVAS - scaledWidth) / 2;
  const offsetY = (PAD_CANVAS - scaledHeight) / 2 + 25; // Shift down slightly for top dimension lines

  // Center of padding hole from top of main plate is radius = mainDia / 2
  const holeCenterY = params.mainDia / 2;
  // Cheek plates are centered on the hole
  const cheekOffsetY = holeCenterY - cheekHeight / 2;

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar UI */}
      <aside className="w-72 bg-white p-6 border-r border-slate-300 flex flex-col gap-6 overflow-y-auto">
        <h1 className="font-bold text-lg text-slate-800">
          Side View Generator
        </h1>

        {/* Main Plate Diameter Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            Main Plate Dia
          </label>
          <div className="relative">
            <input
              type="number"
              value={draftParams.mainDia}
              onChange={(e) =>
                setDraftParams({ ...draftParams, mainDia: e.target.value })
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

      {/* Canvas */}
      <main className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white p-4 rounded shadow-inner border border-slate-200">
          <Stage
            width={PAD_CANVAS}
            height={PAD_CANVAS}>
            <Layer>
              <Group
                x={offsetX}
                y={offsetY}>
                {/* Left Cheek Plate */}
                <Rect
                  x={0}
                  y={cheekOffsetY * scale}
                  width={params.cheekThk * scale}
                  height={cheekHeight * scale}
                  stroke="#334155"
                  strokeWidth={2}
                  fill="#bbf7d0" // Light green
                />

                {/* Main Plate */}
                <Rect
                  x={params.cheekThk * scale}
                  y={0}
                  width={params.mainThk * scale}
                  height={mainHeight * scale}
                  stroke="#334155"
                  strokeWidth={2}
                  fill="#fecdd3" // Light red / pinkish
                />

                {/* Right Cheek Plate */}
                <Rect
                  x={(params.cheekThk + params.mainThk) * scale}
                  y={cheekOffsetY * scale}
                  width={params.cheekThk * scale}
                  height={cheekHeight * scale}
                  stroke="#334155"
                  strokeWidth={2}
                  fill="#bbf7d0" // Light green
                />

                {/* --- Center Line (Pin Hole Axis) --- */}
                <Line
                  points={[
                    -30,
                    holeCenterY * scale,
                    totalDrawingWidth * scale + 30,
                    holeCenterY * scale,
                  ]}
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  dash={[20, 6, 4, 6]}
                />

                {/* --- Main Plate Annotation --- */}
                {/* Extension lines */}
                <Line
                  points={[
                    params.cheekThk * scale,
                    0,
                    params.cheekThk * scale,
                    -25,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  dash={[4, 4]}
                />
                <Line
                  points={[
                    (params.cheekThk + params.mainThk) * scale,
                    0,
                    (params.cheekThk + params.mainThk) * scale,
                    -25,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  dash={[4, 4]}
                />
                <Line
                  points={[
                    params.cheekThk * scale,
                    -20,
                    (params.cheekThk + params.mainThk) * scale,
                    -20,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  lineCap="round"
                />
                <Line
                  points={[
                    params.cheekThk * scale,
                    -24,
                    params.cheekThk * scale,
                    -16,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Line
                  points={[
                    (params.cheekThk + params.mainThk) * scale,
                    -24,
                    (params.cheekThk + params.mainThk) * scale,
                    -16,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Text
                  text={`${params.mainThk} mm`}
                  x={(params.cheekThk + params.mainThk / 2) * scale - 20}
                  y={-35}
                  fontSize={12}
                  fill="#0ea5e9"
                />

                {/* --- Cheek Plate Annotation --- */}
                {/* Extension lines */}
                <Line
                  points={[
                    (params.cheekThk + params.mainThk) * scale,
                    cheekOffsetY * scale,
                    (params.cheekThk + params.mainThk) * scale,
                    -50,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  dash={[4, 4]}
                />
                <Line
                  points={[
                    (params.cheekThk * 2 + params.mainThk) * scale,
                    cheekOffsetY * scale,
                    (params.cheekThk * 2 + params.mainThk) * scale,
                    -50,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  dash={[4, 4]}
                />
                <Line
                  points={[
                    (params.cheekThk * 2 + params.mainThk) * scale,
                    -45,
                    (params.cheekThk + params.mainThk) * scale,
                    -45,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  lineCap="round"
                />
                <Line
                  points={[
                    (params.cheekThk + params.mainThk) * scale,
                    -49,
                    (params.cheekThk + params.mainThk) * scale,
                    -41,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Line
                  points={[
                    (params.cheekThk * 2 + params.mainThk) * scale,
                    -49,
                    (params.cheekThk * 2 + params.mainThk) * scale,
                    -41,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Text
                  text={`${params.cheekThk} mm`}
                  x={(params.cheekThk * 1.5 + params.mainThk) * scale - 20}
                  y={-60}
                  fontSize={12}
                  fill="#0ea5e9"
                />

                {/* Full Width Line Annotation */}
                <Line
                  points={[
                    0,
                    mainHeight * scale + 20,
                    totalDrawingWidth * scale,
                    mainHeight * scale + 20,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  pointerLength={6}
                  pointerWidth={6}
                  lineCap="round"
                />
                <Line
                  points={[
                    0,
                    mainHeight * scale + 16,
                    0,
                    mainHeight * scale + 24,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Line
                  points={[
                    totalDrawingWidth * scale,
                    mainHeight * scale + 16,
                    totalDrawingWidth * scale,
                    mainHeight * scale + 24,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Text
                  text={`Total Thickness: ${totalDrawingWidth} mm`}
                  x={(totalDrawingWidth * scale) / 2 - 50}
                  y={mainHeight * scale + 25}
                  fontSize={12}
                  fill="#0ea5e9"
                />
              </Group>
            </Layer>
          </Stage>
        </div>
      </main>
    </div>
  );
};

export default PadeyeSide;
