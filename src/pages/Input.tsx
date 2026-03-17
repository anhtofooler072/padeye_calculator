import { useState } from "react";
import CombinedPadeye from "../components/konva/CombinedPadeye";
import PadeyeConfig from "../components/konva/PadeyeConfig";
import PadeyeCalculator from "../components/PadeyeCalculator.tsx";

export default function Input() {
  const PAD_CANVAS = 520; // Shared canvas size for both views

  const [params, setParams] = useState({
    width: 180, // Total width of the plate (main plate diameter)
    baseHeight: 120, // Height of the straight rectangular section
    holeDia: 40, // Diameter of the shackle hole
    cheekDia: 70, // Diameter of cheek plate
    mainThk: 30, // Main plate thickness
    cheekThk: 20, // Cheek plate thickness
    shackleA: 80,
    shackleB: 38.1,
    shackleC: 133,
    slingD: 30,
  });

  const [draftParams, setDraftParams] = useState({
    width: "180",
    baseHeight: "120",
    holeDia: "40",
    cheekDia: "70",
    mainThk: "30",
    cheekThk: "20",
    shackleA: "80",
    shackleB: "38.1",
    shackleC: "133",
    slingD: "30",
  });

  const handleGenerate = () => {
    const newHoleDia = Number(draftParams.holeDia) || 40;
    let newCheekDia = Number(draftParams.cheekDia) || 70;
    let newWidth = Number(draftParams.width) || 180;
    let newBaseHeight = Number(draftParams.baseHeight) || 120;
    const newMainThk = Number(draftParams.mainThk) || 30;
    const newCheekThk = Number(draftParams.cheekThk) || 20;
    const newShackleA = Number(draftParams.shackleA) || 80;
    const newShackleB = Number(draftParams.shackleB) || 38.1;
    const newShackleC = Number(draftParams.shackleC) || 133;
    const newSlingD = Number(draftParams.slingD) || 30;

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
      shackleA: newShackleA,
      shackleB: newShackleB,
      shackleC: newShackleC,
      slingD: newSlingD,
    });

    setDraftParams({
      width: newWidth.toString(),
      baseHeight: newBaseHeight.toString(),
      holeDia: newHoleDia.toString(),
      cheekDia: newCheekDia.toString(),
      mainThk: Math.max(1, newMainThk).toString(),
      cheekThk: Math.max(1, newCheekThk).toString(),
      shackleA: newShackleA.toString(),
      shackleB: newShackleB.toString(),
      shackleC: newShackleC.toString(),
      slingD: newSlingD.toString(),
    });
  };

  // return (
  //   <div className="flex h-screen bg-slate-100">
  //     {/* Sidebar UI */}
  //     <PadeyeConfig
  //       draftParams={draftParams}
  //       setDraftParams={setDraftParams}
  //       onGenerate={handleGenerate}
  //     />

  //     {/* Main View: Both canvases side by side */}
  //     <main className="flex-1 overflow-y-auto flex flex-col items-center p-10 gap-10">
  //       <h2 className="text-2xl font-bold text-slate-800 self-start mb-2">
  //         Padeye Visualization
  //       </h2>
  //       <CombinedPadeye
  //         params={params}
  //         padCanvas={PAD_CANVAS}
  //       />
  //     </main>
  //   </div>
  // );
  return <PadeyeCalculator />;
}
