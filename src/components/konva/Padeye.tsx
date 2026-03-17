import { useRef, useEffect } from "react";
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
import { useTheme } from "../theme-provider";

interface PadeyeParams {
  width: number;
  baseHeight: number;
  holeDia: number;
  cheekDia: number;
  mainThk: number;
  cheekThk: number;
}

const PadeyeDraft = ({
  params,
  padCanvas,
  onImageReady,
}: {
  params: PadeyeParams;
  padCanvas: number;
  onImageReady?: (url: string) => void;
}) => {
  const { theme } = useTheme();
  const stageRef = useRef<any>(null);

  // We determine if it's dark mode either if explicitly 'dark' or if 'system' resolves to 'dark'
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Colors
  const strokeColor = isDark ? "#94a3b8" : "#334155";
  const mainFill = isDark ? "#334155" : "#e2e8f0";
  const holeFill = isDark ? "#121212" : "white"; // matching close to neutral-950/background
  const crosshairColor = isDark ? "#475569" : "#cbd5e1";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const canvasBgClass = isDark
    ? "bg-neutral-900 border-neutral-800"
    : "bg-white border-slate-200";

  // Derived Values
  const radius = params.width / 2;
  const holeRadius = params.holeDia / 2;
  const cheekRadius = params.cheekDia / 2;

  // Normalization logic
  const PAD_CANVAS = padCanvas; // px

  // Calculate actual bounding dimensions of the Padeye shape
  // Top arc goes up by `radius`, base goes down to `baseHeight`
  const totalDrawingWidth = params.width;
  const totalDrawingHeight = params.baseHeight + radius;

  // Leave some padding around the drawing (e.g., 45% of canvas size) for annotations and shackle
  const maxDrawingSize = PAD_CANVAS * 0.45;
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

  // Render to DataURL whenever params or layout changes
  useEffect(() => {
    if (onImageReady && stageRef.current) {
      // Small timeout ensures the stage is fully rendered
      setTimeout(() => {
        if (stageRef.current) {
          onImageReady(stageRef.current.toDataURL({ pixelRatio: 2 }));
        }
      }, 500);
    }
  }, [params, PAD_CANVAS, onImageReady, theme, isDark]);

  return (
    <div className={`p-4 rounded shadow-inner border ${canvasBgClass}`}>
      <Stage
        width={PAD_CANVAS}
        height={PAD_CANVAS}
        ref={stageRef}>
        <Layer>
          <Group
            x={offsetX}
            y={offsetY}>
            {/* 1 & 2. The Main Padeye Body (Combined Rectangle + Top Outline) */}
            <Path
              data={`M 0 ${params.baseHeight * scale} L 0 0 A ${radius * scale} ${radius * scale} 0 0 1 ${params.width * scale} 0 L ${params.width * scale} ${params.baseHeight * scale} Z`}
              stroke={strokeColor}
              strokeWidth={2}
              fill={mainFill}
            />

            {/* 3. The Shackle Hole */}
            <Circle
              x={radius * scale}
              y={0}
              radius={holeRadius * scale}
              stroke={strokeColor}
              strokeWidth={2}
              fill={holeFill}
            />

            {/* 4. The Cheek Plate */}
            <Circle
              x={radius * scale}
              y={0}
              radius={cheekRadius * scale}
              stroke={strokeColor}
              strokeWidth={2}
            />

            {/* 5. Center Line / Crosshair Annotation */}
            <Line
              points={[radius * scale - 12, 0, radius * scale + 12, 0]}
              stroke={crosshairColor}
              strokeWidth={1.5}
            />
            <Line
              points={[radius * scale, -12, radius * scale, 12]}
              stroke={crosshairColor}
              strokeWidth={1.5}
            />

            {/* Dimension Label (Hole) */}
            <Text
              text={`R3 = ${holeRadius}`}
              x={radius * scale - 25}
              y={holeRadius * scale + 5}
              fontSize={12}
              fill={textColor}
            />

            {/* Multileader for Main Plate */}
            <Group>
              <Arrow
                points={[
                  radius * scale - radius * scale * 0.707 - 30,
                  -radius * scale * 0.707 - 30,
                  radius * scale - radius * scale * 0.707,
                  -radius * scale * 0.707,
                ]}
                stroke={textColor}
                strokeWidth={1}
                fill={textColor}
                pointerLength={6}
                pointerWidth={6}
              />
              <Line
                points={[
                  radius * scale - radius * scale * 0.707 - 30,
                  -radius * scale * 0.707 - 30,
                  radius * scale - radius * scale * 0.707 - 80,
                  -radius * scale * 0.707 - 30,
                ]}
                stroke={textColor}
                strokeWidth={1}
              />
              <Text
                text={`R1 = ${radius}`}
                x={radius * scale - radius * scale * 0.707 - 80}
                y={-radius * scale * 0.707 - 45}
                fontSize={12}
                fill={textColor}
              />
            </Group>

            {/* Multileader for Cheek Plate */}
            <Group>
              <Arrow
                points={[
                  radius * scale + cheekRadius * scale * 0.707 + 30,
                  -cheekRadius * scale * 0.707 - 30,
                  radius * scale + cheekRadius * scale * 0.707,
                  -cheekRadius * scale * 0.707,
                ]}
                stroke={textColor}
                strokeWidth={1}
                fill={textColor}
                pointerLength={6}
                pointerWidth={6}
              />
              <Line
                points={[
                  radius * scale + cheekRadius * scale * 0.707 + 30,
                  -cheekRadius * scale * 0.707 - 30,
                  radius * scale + cheekRadius * scale * 0.707 + 80,
                  -cheekRadius * scale * 0.707 - 30,
                ]}
                stroke={textColor}
                strokeWidth={1}
              />
              <Text
                text={`R2 = ${cheekRadius}`}
                x={radius * scale + cheekRadius * scale * 0.707 + 30}
                y={-cheekRadius * scale * 0.707 - 45}
                fontSize={12}
                fill={textColor}
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
              stroke={textColor}
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
              stroke={textColor}
              strokeWidth={1}
            />
            <Line
              points={[
                params.width * scale,
                params.baseHeight * scale + 16,
                params.width * scale,
                params.baseHeight * scale + 24,
              ]}
              stroke={textColor}
              strokeWidth={1}
            />
            {/* Width label */}
            <Text
              text={`Width: ${params.width} mm`}
              x={(params.width * scale) / 2 - 40}
              y={params.baseHeight * scale + 25}
              fontSize={12}
              fill={textColor}
            />

            {/* --- Height Annotation (Base Height) --- */}
            <Line
              points={[
                params.width * scale + 20,
                0,
                params.width * scale + 20,
                params.baseHeight * scale,
              ]}
              stroke={textColor}
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
              stroke={textColor}
              strokeWidth={1}
            />
            <Line
              points={[
                params.width * scale + 16,
                params.baseHeight * scale,
                params.width * scale + 24,
                params.baseHeight * scale,
              ]}
              stroke={textColor}
              strokeWidth={1}
            />
            {/* Height label */}
            <Text
              text={`Height: ${params.baseHeight} mm`}
              x={params.width * scale + 40}
              y={(params.baseHeight * scale) / 2 - 10}
              fontSize={12}
              fill={textColor}
              rotation={90}
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default PadeyeDraft;
