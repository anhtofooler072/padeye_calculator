import {
  Stage,
  Layer,
  Rect,
  Group,
  Line,
  Text,
  // Arc,
  Path,
  Circle,
} from "react-konva";

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

const PadeyeSide = ({
  params,
  padCanvas,
}: {
  params: PadeyeParams;
  padCanvas: number;
}) => {
  const PAD_CANVAS = padCanvas; // px

  // Derived dimensions to match exact front view scale
  const radius = params.width / 2;
  const mainHeight = params.baseHeight + radius;
  const cheekHeight = params.cheekDia;

  // Use front view dimensions to calculate an identical scale across both canvases
  const frontDrawingWidth = params.width;
  const frontDrawingHeight = mainHeight;
  const maxDrawingSize = PAD_CANVAS * 0.45; // reduced from 0.6 to allow shackle overlay to fit
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

  // --- Shackle Calculations ---
  const cx = totalDrawingWidthSide / 2;
  const hasShackle = !!(params.shackleA && params.shackleB && params.shackleC);

  // Outer shackle bounds (approximated based on pin diameter for eye thickness)
  const shackleEarThickness = params.shackleB ? params.shackleB * 1.0 : 0;

  // New Shackle Component Y limits
  const earBottomY =
    holeCenterY + (params.shackleB ? params.shackleB / 2 : 0) + 15;
  const innerBowTopY =
    holeCenterY -
    (params.shackleB ? params.shackleB / 2 : 0) -
    (params.shackleC || 0);
  const outerBowTopY = innerBowTopY - shackleEarThickness;
  const slingR =
    (params.slingD || (params.shackleB ? params.shackleB * 0.8 : 0)) / 2;

  // Dynamic offset for plate top annotations
  const topOfDrawing = hasShackle ? Math.min(0, outerBowTopY) : 0;
  const annY1 = topOfDrawing - 30; // Main plate Y
  const annY2 = topOfDrawing - 55; // Cheek plate Y
  const annLabelY = earBottomY + 25; // A/Clearance Label Y

  // Dynamic X offsets for multileaders to avoid shackle and sling
  const leftLeaderX = hasShackle
    ? Math.min(
        -75,
        (cx - params.shackleA! / 2 - shackleEarThickness) * scale - 55,
      )
    : -75;
  const rightLeaderEndX = hasShackle
    ? Math.max(
        totalDrawingWidthSide * scale + 70,
        (cx + params.shackleA! / 2 + shackleEarThickness) * scale + 80, // Push well past the C label
      )
    : totalDrawingWidthSide * scale + 70;
  const rightLeaderTextX = rightLeaderEndX - 40;

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
              fill="#cbd5e1" // Light green
            />

            {/* Main Plate */}
            <Rect
              x={params.cheekThk * scale}
              y={0}
              width={params.mainThk * scale}
              height={mainHeight * scale}
              stroke="#334155"
              strokeWidth={2}
              fill="#e2e8f0" // Light red / pinkish
            />

            {/* Right Cheek Plate */}
            <Rect
              x={(params.cheekThk + params.mainThk) * scale}
              y={cheekOffsetY * scale}
              width={params.cheekThk * scale}
              height={cheekHeight * scale}
              stroke="#334155"
              strokeWidth={2}
              fill="#cbd5e1" // Light green
            />

            {/* --- Shackle Overlay --- */}
            {hasShackle && (
              <Group>
                {/* Pin */}
                <Rect
                  x={
                    (cx - params.shackleA! / 2 - shackleEarThickness - 10) *
                    scale
                  }
                  y={(holeCenterY - params.shackleB! / 2) * scale}
                  width={
                    (params.shackleA! + 2 * shackleEarThickness + 20) * scale
                  }
                  height={params.shackleB! * scale}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dash={[5, 5]}
                  fill="transparent"
                />

                {/* Left Shackle Ear & Body up to the Bow */}
                <Path
                  data={`M ${(cx - params.shackleA! / 2) * scale} ${earBottomY * scale} 
                         L ${(cx - params.shackleA! / 2) * scale} ${(innerBowTopY + params.shackleA! / 2) * scale} 
                         A ${(params.shackleA! / 2) * scale} ${(params.shackleA! / 2) * scale} 0 0 1 ${(cx + params.shackleA! / 2) * scale} ${(innerBowTopY + params.shackleA! / 2) * scale} 
                         L ${(cx + params.shackleA! / 2) * scale} ${earBottomY * scale}`}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dash={[5, 5]}
                  fill="transparent"
                />

                {/* Sling Overlay (inside the bow) */}
                <Circle
                  x={cx * scale}
                  y={(innerBowTopY + slingR + 2) * scale}
                  radius={slingR * scale}
                  stroke="#10b981"
                  strokeWidth={2}
                  dash={[4, 4]}
                  fill="transparent"
                />

                {/* Outer edge of Shackle Ear & Body */}
                <Path
                  data={`M ${(cx - params.shackleA! / 2 - shackleEarThickness) * scale} ${earBottomY * scale} 
                         L ${(cx - params.shackleA! / 2 - shackleEarThickness) * scale} ${(innerBowTopY + params.shackleA! / 2) * scale} 
                         A ${(params.shackleA! / 2 + shackleEarThickness) * scale} ${(params.shackleA! / 2 + shackleEarThickness) * scale} 0 0 1 ${(cx + params.shackleA! / 2 + shackleEarThickness) * scale} ${(innerBowTopY + params.shackleA! / 2) * scale} 
                         L ${(cx + params.shackleA! / 2 + shackleEarThickness) * scale} ${earBottomY * scale}`}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dash={[5, 5]}
                  fill="transparent"
                />

                {/* Ear bottom arcs (simplified) */}
                <Line
                  points={[
                    (cx - params.shackleA! / 2 - shackleEarThickness) * scale,
                    earBottomY * scale,
                    (cx - params.shackleA! / 2) * scale,
                    earBottomY * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dash={[5, 5]}
                />
                <Line
                  points={[
                    (cx + params.shackleA! / 2) * scale,
                    earBottomY * scale,
                    (cx + params.shackleA! / 2 + shackleEarThickness) * scale,
                    earBottomY * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dash={[5, 5]}
                />

                {/* Shackle Inside Width (A) Annotation */}
                <Line
                  points={[
                    (cx - params.shackleA! / 2) * scale,
                    (earBottomY + 5) * scale,
                    (cx - params.shackleA! / 2) * scale,
                    (annLabelY + 5) * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                  dash={[2, 2]}
                />
                <Line
                  points={[
                    (cx + params.shackleA! / 2) * scale,
                    (earBottomY + 5) * scale,
                    (cx + params.shackleA! / 2) * scale,
                    (annLabelY + 5) * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                  dash={[2, 2]}
                />
                <Line
                  points={[
                    (cx - params.shackleA! / 2) * scale,
                    annLabelY * scale,
                    (cx + params.shackleA! / 2) * scale,
                    annLabelY * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                  pointerLength={4}
                  pointerWidth={4}
                  lineCap="round"
                />
                <Text
                  text={`A = ${params.shackleA} mm`}
                  x={cx * scale - 30}
                  y={(annLabelY + 5) * scale}
                  fontSize={11}
                  fill="#d97706"
                />

                {/* Shackle Inside Length (C) Annotation */}
                <Line
                  points={[
                    (cx + slingR + 6) * scale,
                    innerBowTopY * scale,
                    (cx + params.shackleA! / 2 + shackleEarThickness + 40) *
                      scale,
                    innerBowTopY * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                  dash={[2, 2]}
                />
                <Line
                  points={[
                    (cx + params.shackleA! / 2 + shackleEarThickness + 10) *
                      scale,
                    (holeCenterY - params.shackleB! / 2) * scale,
                    (cx + params.shackleA! / 2 + shackleEarThickness + 40) *
                      scale,
                    (holeCenterY - params.shackleB! / 2) * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                  dash={[2, 2]}
                />
                <Line
                  points={[
                    (cx + params.shackleA! / 2 + shackleEarThickness + 30) *
                      scale,
                    (holeCenterY - params.shackleB! / 2) * scale,
                    (cx + params.shackleA! / 2 + shackleEarThickness + 30) *
                      scale,
                    innerBowTopY * scale,
                  ]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                  pointerLength={4}
                  pointerWidth={4}
                  lineCap="round"
                />
                <Text
                  text={`C = ${params.shackleC} mm`}
                  x={
                    (cx + params.shackleA! / 2 + shackleEarThickness + 35) *
                    scale
                  }
                  y={
                    ((innerBowTopY + holeCenterY - params.shackleB! / 2) / 2) *
                      scale -
                    8
                  }
                  fontSize={11}
                  fill="#d97706"
                />
              </Group>
            )}

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

            {/* --- Main Plate Annotation (Multileader) --- */}
            <Group>
              <Line
                points={[
                  (params.cheekThk + params.mainThk / 2) * scale,
                  15,
                  -30,
                  -35,
                  leftLeaderX,
                  -35,
                ]}
                stroke="#64748b"
                strokeWidth={1}
              />
              <Circle
                x={(params.cheekThk + params.mainThk / 2) * scale}
                y={15}
                radius={2.5}
                fill="#64748b"
              />
              <Text
                text={`THK.${params.mainThk}`}
                x={leftLeaderX}
                y={-50}
                fontSize={11}
                fill="#64748b"
              />
            </Group>

            {/* --- Cheek Plate Annotation (Multileader) --- */}
            <Group>
              <Line
                points={[
                  (params.cheekThk * 1.5 + params.mainThk) * scale,
                  cheekOffsetY * scale + 15,
                  totalDrawingWidthSide * scale + 30,
                  cheekOffsetY * scale - 25,
                  rightLeaderEndX,
                  cheekOffsetY * scale - 25,
                ]}
                stroke="#64748b"
                strokeWidth={1}
              />
              <Circle
                x={(params.cheekThk * 1.5 + params.mainThk) * scale}
                y={cheekOffsetY * scale + 15}
                radius={2.5}
                fill="#64748b"
              />
              <Text
                text={`THK.${params.cheekThk}`}
                x={rightLeaderTextX}
                y={cheekOffsetY * scale - 40}
                fontSize={11}
                fill="#64748b"
              />
            </Group>

            {/* Full Width Line Annotation */}
            <Line
              points={[
                0,
                mainHeight * scale + 20,
                totalDrawingWidthSide * scale,
                mainHeight * scale + 20,
              ]}
              stroke="#64748b"
              strokeWidth={1}
              pointerLength={6}
              pointerWidth={6}
              lineCap="round"
            />
            <Line
              points={[0, mainHeight * scale + 16, 0, mainHeight * scale + 24]}
              stroke="#64748b"
              strokeWidth={1}
            />
            <Line
              points={[
                totalDrawingWidthSide * scale,
                mainHeight * scale + 16,
                totalDrawingWidthSide * scale,
                mainHeight * scale + 24,
              ]}
              stroke="#64748b"
              strokeWidth={1}
            />
            <Text
              text={`Total Thickness: ${totalDrawingWidthSide} mm`}
              x={(totalDrawingWidthSide * scale) / 2 - 50}
              y={mainHeight * scale + 30}
              fontSize={12}
              fill="#64748b"
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default PadeyeSide;
