import {
  Stage,
  Layer,
  Path,
  Circle,
  Group,
  Line,
  Text,
  Arrow,
} from "react-konva";

interface PadeyeParams {
  width: number;
  baseHeight: number;
  holeDia: number;
  cheekDia: number;
  mainThk: number;
  cheekThk: number;
}

const PadeyeDraft = ({ params }: { params: PadeyeParams }) => {
  // Derived Values
  const radius = params.width / 2;
  const holeRadius = params.holeDia / 2;
  const cheekRadius = params.cheekDia / 2;

  // Normalization logic
  const PAD_CANVAS = 400; // px

  // Calculate actual bounding dimensions of the Padeye shape
  // Top arc goes up by `radius`, base goes down to `baseHeight`
  const totalDrawingWidth = params.width;
  const totalDrawingHeight = params.baseHeight + radius;

  // Leave some padding around the drawing (e.g., 60% of canvas size) for annotations
  const maxDrawingSize = PAD_CANVAS * 0.6;
  const scaleX = maxDrawingSize / totalDrawingWidth;
  const scaleY = maxDrawingSize / totalDrawingHeight;

  // Preserve aspect ratio
  const scale = Math.min(scaleX, scaleY);

  // Actual rendered bounding box dimensions
  const scaledWidth = totalDrawingWidth * scale;
  const scaledHeight = totalDrawingHeight * scale;

  // Center the drawing completely in the canvas
  const offsetX = (PAD_CANVAS - scaledWidth) / 2;
  // Offset Y: Since the top arc reaches Y = -radius * scale,
  // adding `radius * scale` pushes it down to start exactly at Y = 0 of its bounding box.
  // Then we add the remaining space divided by 2 to center the bounding box vertically in the canvas.
  const offsetY = (PAD_CANVAS - scaledHeight) / 2 + radius * scale;

  // Center of the hole is at the top of the rectangle
  //   const centerX = radius;
  //   const centerY = radius;

  return (
    <div className="bg-white p-4 rounded shadow-inner border border-slate-200">
      <Stage
        width={PAD_CANVAS}
        height={PAD_CANVAS}>
        <Layer>
          <Group
            x={offsetX}
            y={offsetY}>
            {/* 1 & 2. The Main Padeye Body (Combined Rectangle + Top Outline) */}
            <Path
              data={`M 0 ${params.baseHeight * scale} L 0 0 A ${radius * scale} ${radius * scale} 0 0 1 ${params.width * scale} 0 L ${params.width * scale} ${params.baseHeight * scale} Z`}
              stroke="#334155"
              strokeWidth={2}
              fill="#f8fafc"
            />

            {/* 3. The Shackle Hole */}
            <Circle
              x={radius * scale}
              y={0}
              radius={holeRadius * scale}
              stroke="#334155"
              strokeWidth={2}
              fill="white"
            />

            {/* 4. The Cheek Plate */}
            <Circle
              x={radius * scale}
              y={0}
              radius={cheekRadius * scale}
              stroke="#334155"
              strokeWidth={2}
            />

            {/* 5. Center Line / Crosshair Annotation */}
            <Line
              points={[radius * scale - 12, 0, radius * scale + 12, 0]}
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <Line
              points={[radius * scale, -12, radius * scale, 12]}
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />

            {/* Dimension Label (Hole) */}
            <Text
              text={`Ø ${params.holeDia}`}
              x={radius * scale - 15}
              y={holeRadius * scale + 5}
              fontSize={12}
              fill="#64748b"
            />

            {/* Multileader for Cheek Plate */}
            <Group>
              <Arrow
                points={[
                  radius * scale + cheekRadius * scale * 0.707 + 30,
                  -cheekRadius * scale * 0.707 - 30,
                  radius * scale + cheekRadius * scale * 0.707,
                  -cheekRadius * scale * 0.707,
                ]}
                stroke="#64748b"
                strokeWidth={1}
                fill="#64748b"
                pointerLength={6}
                pointerWidth={6}
              />
              <Line
                points={[
                  radius * scale + cheekRadius * scale * 0.707 + 30,
                  -cheekRadius * scale * 0.707 - 30,
                  radius * scale + cheekRadius * scale * 0.707 + 60,
                  -cheekRadius * scale * 0.707 - 30,
                ]}
                stroke="#64748b"
                strokeWidth={1}
              />
              <Text
                text={`Cheek Ø ${params.cheekDia}`}
                x={radius * scale + cheekRadius * scale * 0.707 + 30}
                y={-cheekRadius * scale * 0.707 - 45}
                fontSize={12}
                fill="#64748b"
              />
            </Group>

            {/* --- Width Annotation (Base Length) --- */}
            <Line
              points={[
                0,
                params.baseHeight * scale + 20,
                params.width * scale,
                params.baseHeight * scale + 20,
              ]}
              stroke="#0ea5e9"
              strokeWidth={1}
              pointerLength={6}
              pointerWidth={6}
              lineCap="round"
            />
            {/* Arrows for width */}
            <Line
              points={[
                0,
                params.baseHeight * scale + 16,
                0,
                params.baseHeight * scale + 24,
              ]}
              stroke="#0ea5e9"
              strokeWidth={1}
            />
            <Line
              points={[
                params.width * scale,
                params.baseHeight * scale + 16,
                params.width * scale,
                params.baseHeight * scale + 24,
              ]}
              stroke="#0ea5e9"
              strokeWidth={1}
            />
            {/* Width label */}
            <Text
              text={`Width: ${params.width} mm`}
              x={(params.width * scale) / 2 - 40}
              y={params.baseHeight * scale + 25}
              fontSize={12}
              fill="#0ea5e9"
            />

            {/* --- Height Annotation (Base Height) --- */}
            <Line
              points={[
                params.width * scale + 20,
                0,
                params.width * scale + 20,
                params.baseHeight * scale,
              ]}
              stroke="#f59e42"
              strokeWidth={1}
              pointerLength={6}
              pointerWidth={6}
              lineCap="round"
            />
            {/* Arrows for height */}
            <Line
              points={[
                params.width * scale + 16,
                0,
                params.width * scale + 24,
                0,
              ]}
              stroke="#f59e42"
              strokeWidth={1}
            />
            <Line
              points={[
                params.width * scale + 16,
                params.baseHeight * scale,
                params.width * scale + 24,
                params.baseHeight * scale,
              ]}
              stroke="#f59e42"
              strokeWidth={1}
            />
            {/* Height label */}
            <Text
              text={`Height: ${params.baseHeight} mm`}
              x={params.width * scale + 40}
              y={(params.baseHeight * scale) / 2 - 10}
              fontSize={12}
              fill="#f59e42"
              rotation={90}
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default PadeyeDraft;
