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

  // Derived dimensions to match exact front view scale
  const radius = params.width / 2;
  const mainHeight = params.baseHeight + radius;
  const cheekHeight = params.cheekDia;

  // Use front view dimensions to calculate an identical scale across both canvases
  const frontDrawingWidth = params.width;
  const frontDrawingHeight = mainHeight;
  const maxDrawingSize = PAD_CANVAS * 0.6;
  const scaleXFront = maxDrawingSize / frontDrawingWidth;
  const scaleYFront = maxDrawingSize / frontDrawingHeight;
  const scale = Math.min(scaleXFront, scaleYFront);

  // Side view actual width
  const totalDrawingWidthSide = params.cheekThk * 2 + params.mainThk;
  const scaledWidth = totalDrawingWidthSide * scale;
  const scaledHeight = mainHeight * scale;

  // Center horizontally
  const offsetX = (PAD_CANVAS - scaledWidth) / 2;
  // Offset Y: place the top of the bounding box so the base aligns perfectly
  // The front view bounding box height is the same as the side view main plate height.
  // absoluteBaseY = (PAD_CANVAS - scaledHeight) / 2 + scaledHeight
  // Because main plate starts at y=0, offsetY is simply:
  const offsetY = (PAD_CANVAS - scaledHeight) / 2;

  // Center of the pin hole from the top edge is `radius`
  const holeCenterY = radius;
  // Cheek plates are centered symmetrically on the pin hole
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
                totalDrawingWidthSide * scale + 30,
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
                totalDrawingWidthSide * scale,
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
                totalDrawingWidthSide * scale,
                mainHeight * scale + 16,
                totalDrawingWidthSide * scale,
                mainHeight * scale + 24,
              ]}
              stroke="#0ea5e9"
              strokeWidth={1}
            />
            <Text
              text={`Total Thickness: ${totalDrawingWidthSide} mm`}
              x={(totalDrawingWidthSide * scale) / 2 - 50}
              y={mainHeight * scale + 30}
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
