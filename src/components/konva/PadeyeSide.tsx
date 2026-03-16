import { useState } from "react";
import { Stage, Layer, Rect, Group, Line, Text, Arrow } from "react-konva";

const PadeyeSide = () => {
  const [params, setParams] = useState({
    mainThk: 30, // Main plate thickness
    mainHeight: 200, // Total height of the main plate visible
    cheekThk: 20, // Cheek plate thickness
    cheekHeight: 100, // Cheek plate height (diameter)
  });

  const [draftParams, setDraftParams] = useState({
    mainThk: "30",
    mainHeight: "200",
    cheekThk: "20",
    cheekHeight: "100",
  });

  const handleGenerate = () => {
    const newMainThk = Number(draftParams.mainThk) || 30;
    const newMainHeight = Number(draftParams.mainHeight) || 200;
    const newCheekThk = Number(draftParams.cheekThk) || 20;
    let newCheekHeight = Number(draftParams.cheekHeight) || 100;

    // Apply basic visual constraints
    newCheekHeight = Math.min(newCheekHeight, newMainHeight);

    setParams({
      mainThk: newMainThk,
      mainHeight: newMainHeight,
      cheekThk: newCheekThk,
      cheekHeight: newCheekHeight,
    });

    setDraftParams({
      mainThk: newMainThk.toString(),
      mainHeight: newMainHeight.toString(),
      cheekThk: newCheekThk.toString(),
      cheekHeight: newCheekHeight.toString(),
    });
  };

  const PAD_CANVAS = 350; // px

  // Calculate actual bounding dimensions
  const totalDrawingWidth = params.cheekThk * 2 + params.mainThk;
  const totalDrawingHeight = params.mainHeight;

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
  const offsetY = (PAD_CANVAS - scaledHeight) / 2;

  // Cheek plates are typicaly placed near the top/hole.
  // We'll offset them a bit from the top.
  const cheekOffsetY = (params.mainHeight - params.cheekHeight) * 0.25;

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar UI */}
      <aside className="w-72 bg-white p-6 border-r border-slate-300 flex flex-col gap-6 overflow-y-auto">
        <h1 className="font-bold text-lg text-slate-800">
          Side View Generator
        </h1>

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

        {/* Main Plate Height Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            Main Plate Height
          </label>
          <div className="relative">
            <input
              type="number"
              value={draftParams.mainHeight}
              onChange={(e) =>
                setDraftParams({ ...draftParams, mainHeight: e.target.value })
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

        {/* Cheek Plate Height Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            Cheek Plate Height
          </label>
          <div className="relative">
            <input
              type="number"
              value={draftParams.cheekHeight}
              onChange={(e) =>
                setDraftParams({ ...draftParams, cheekHeight: e.target.value })
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
                  height={params.cheekHeight * scale}
                  stroke="#334155"
                  strokeWidth={2}
                  fill="#bbf7d0" // Light green
                />

                {/* Main Plate */}
                <Rect
                  x={params.cheekThk * scale}
                  y={0}
                  width={params.mainThk * scale}
                  height={params.mainHeight * scale}
                  stroke="#334155"
                  strokeWidth={2}
                  fill="#fecdd3" // Light red / pinkish
                />

                {/* Right Cheek Plate */}
                <Rect
                  x={(params.cheekThk + params.mainThk) * scale}
                  y={cheekOffsetY * scale}
                  width={params.cheekThk * scale}
                  height={params.cheekHeight * scale}
                  stroke="#334155"
                  strokeWidth={2}
                  fill="#bbf7d0" // Light green
                />

                {/* --- Main Plate Annotation --- */}
                <Group>
                  <Arrow
                    points={[
                      (params.cheekThk + params.mainThk / 2) * scale - 30,
                      -30,
                      (params.cheekThk + params.mainThk / 2) * scale,
                      0,
                    ]}
                    stroke="#64748b"
                    strokeWidth={1}
                    fill="#64748b"
                    pointerLength={6}
                    pointerWidth={6}
                  />
                  <Text
                    text={`Main Plate (${params.mainThk}mm)`}
                    x={(params.cheekThk + params.mainThk / 2) * scale - 120}
                    y={-40}
                    fontSize={12}
                    fill="#64748b"
                  />
                </Group>

                {/* --- Cheek Plate Annotation --- */}
                <Group>
                  <Arrow
                    points={[
                      (params.cheekThk * 2 + params.mainThk) * scale + 50,
                      cheekOffsetY * scale - 20,
                      (params.cheekThk + params.mainThk + params.cheekThk / 2) *
                        scale,
                      cheekOffsetY * scale,
                    ]}
                    stroke="#64748b"
                    strokeWidth={1}
                    fill="#64748b"
                    pointerLength={6}
                    pointerWidth={6}
                  />
                  <Text
                    text={`Cheek Plate (${params.cheekThk}mm)`}
                    x={(params.cheekThk * 2 + params.mainThk) * scale + 55}
                    y={cheekOffsetY * scale - 30}
                    fontSize={12}
                    fill="#64748b"
                  />
                </Group>

                {/* Full Width Line Annotation */}
                <Line
                  points={[
                    0,
                    params.mainHeight * scale + 20,
                    totalDrawingWidth * scale,
                    params.mainHeight * scale + 20,
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
                    params.mainHeight * scale + 16,
                    0,
                    params.mainHeight * scale + 24,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Line
                  points={[
                    totalDrawingWidth * scale,
                    params.mainHeight * scale + 16,
                    totalDrawingWidth * scale,
                    params.mainHeight * scale + 24,
                  ]}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
                <Text
                  text={`Total Thickness: ${totalDrawingWidth} mm`}
                  x={(totalDrawingWidth * scale) / 2 - 50}
                  y={params.mainHeight * scale + 25}
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
