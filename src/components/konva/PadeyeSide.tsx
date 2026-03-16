import { Stage, Layer, Rect, Group, Line, Text } from "react-konva";

interface PadeyeParams {
  width: number;
  baseHeight: number;
  holeDia: number;
  cheekDia: number;
  mainThk: number;
  cheekThk: number;
}

const PadeyeSide = ({ params }: { params: PadeyeParams }) => {
  const PAD_CANVAS = 400; // px

  // Derived dimensions
  const mainDia = params.width;
  const mainHeight = params.baseHeight + mainDia / 2;
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
  const holeCenterY = mainDia / 2;
  // Cheek plates are centered on the hole
  const cheekOffsetY = holeCenterY - cheekHeight / 2;

  return (
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
              points={[0, mainHeight * scale + 16, 0, mainHeight * scale + 24]}
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
  );
};

export default PadeyeSide;
