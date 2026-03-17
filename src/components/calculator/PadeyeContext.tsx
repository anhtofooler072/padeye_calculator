import React, { createContext, useContext, useState } from "react";
import materials from "@/data/materials.json";
import shackles from "@/data/shackles.json";
import slings from "@/data/slings.json";

// eslint-disable-next-line react-refresh/only-export-components
export const initialInputs = {
  SLp: 11397,
  n: 1.5,
  Fy: 245,
  Fu: 400,
  R1: 90,
  R2: 60,
  R3: 30,
  t1: 30,
  t2: 10,
  H: 90,
  L: 250,
  alpha: 61,
  B: 38.1,
  C: 133,
  A: 57,
  d1: 42,
  G1: 4,
  h_wm: 6,
};

// eslint-disable-next-line react-refresh/only-export-components
export function usePadeyeLogic() {
  const [inputs, setInputs] = useState(initialInputs);
  const [selectedMaterial, setSelectedMaterial] = useState("SS400");
  const [selectedShackle, setSelectedShackle] = useState("13-1/2T");
  const [selectedSling, setSelectedSling] = useState("42");

  const [frontViewDataURL, setFrontViewDataURL] = useState<string>("");
  const [sideViewDataURL, setSideViewDataURL] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));

    if (name === "Fy" || name === "Fu") setSelectedMaterial("custom");
    if (name === "B" || name === "C" || name === "A")
      setSelectedShackle("custom");
    if (name === "d1") setSelectedSling("custom");
  };

  const handleMaterialChange = (matId: string | null) => {
    if (!matId) return;
    setSelectedMaterial(matId);
    if (matId === "custom") return;
    const mat = materials.find((m) => m.id === matId);
    if (mat) setInputs((prev) => ({ ...prev, Fy: mat.fy_mpa, Fu: mat.fu_mpa }));
  };

  const handleShackleChange = (shackleId: string | null) => {
    if (!shackleId) return;
    setSelectedShackle(shackleId);
    if (shackleId === "custom") return;
    const shackle = shackles.find((s) => s.wll === shackleId);
    if (shackle)
      setInputs((prev) => ({
        ...prev,
        A: shackle.a,
        B: shackle.b,
        C: shackle.c,
      }));
  };

  const handleSlingChange = (slingId: string | null) => {
    if (!slingId) return;
    setSelectedSling(slingId);
    if (slingId === "custom") return;
    const sling = slings.find((s) => s.id === slingId);
    if (sling) setInputs((prev) => ({ ...prev, d1: sling.diameter }));
  };

  const calculatedF1_kG = inputs.n * inputs.SLp;
  const calculatedF2_kG = 0.05 * inputs.SLp;
  const F1 = calculatedF1_kG;
  const F2 = calculatedF2_kG;

  const { Fy, Fu, R1, R2, R3, t1, t2, H, L, alpha, B, C, A, d1, G1, h_wm } =
    inputs;
  const alphaRad = alpha * (Math.PI / 180);

  const pinClearance = 2 * R3 - B;
  const sideClearance = C + B / 2 - R1 - d1 - G1;
  const shackleFit = 0.5 * (A - t1 - 2 * t2);
  const cheekClearance = R1 - R2 - t2;

  const A_I = 2 * ((R1 - R3) * t1 + 2 * (R2 - R3) * t2);
  const A_II = L * t1;
  const A_III = (R1 - R3) * t1 + 2 * (R2 - R3) * t2;
  const Sz_II = (t1 * L * L) / 6;
  const Sx_II = (L * t1 * t1) / 6;

  const dn_rup = 0.5 * (Fu * 10.1972);
  const dn_yld = 0.6 * (Fy * 10.1972);
  const dn_shrup = 0.3 * (Fu * 10.1972);
  const dn_shyld = 0.4 * (Fy * 10.1972);
  const dn_bear = 0.9 * (Fy * 10.1972);

  const du1 = F1 / (A_I / 100);
  const r411 = du1 / dn_rup;
  const r412 = du1 / dn_yld;
  const Tu3 = F1 / (2 * (A_III / 100));
  const r413 = r412 + Math.pow(Tu3 / dn_shyld, 2);

  const du21 = (F1 * Math.sin(alphaRad)) / (A_II / 100);
  const du22 = (F1 * Math.cos(alphaRad) * (H / 10)) / (Sz_II / 1000);
  const du23 = (F2 * (H / 10)) / (Sx_II / 1000);
  const du2 = du21 + du22 + du23;

  const r421 = du2 / dn_rup;
  const r422 = du2 / dn_yld;

  const r51 = Tu3 / dn_shrup;
  const r52 = Tu3 / dn_shyld;

  const A_pb = 2 * R3 * (t1 + 2 * t2);
  const dub = F1 / (A_pb / 100);
  const uc_pb = dub / dn_bear;

  const l_w = 2 * L;
  const A_w = 0.707 * l_w * h_wm;
  const Tuw = F1 / (A_w / 100);
  const Fw =
    0.6 *
    (Fy * 10.1972) *
    (1 + 0.5 * Math.pow(Math.abs(Math.sin(alphaRad)), 1.5));
  const dnw = Fw / 2;
  const uc_weld = Tuw / dnw;

  const unityChecks = [
    { id: "4.1-1", label: "Tensile Rupture (I-I)", value: r411 },
    { id: "4.1-2", label: "Tensile Yielding (I-I)", value: r412 },
    { id: "4.1-3", label: "Combined T+S (I-I)", value: r413 },
    { id: "4.2-1", label: "Tensile Rupture (II-II)", value: r421 },
    { id: "4.2-2", label: "Tensile Yielding (II-II)", value: r422 },
    { id: "5-1", label: "Shear Rupture (III-III)", value: r51 },
    { id: "5-2", label: "Shear Yielding (III-III)", value: r52 },
    { id: "6-1", label: "Bearing Strength", value: uc_pb },
    { id: "7-2", label: "Weld Stress", value: uc_weld },
  ];

  const maxUC = Math.max(...unityChecks.map((uc) => uc.value));
  const governingUC = unityChecks.find((uc) => uc.value === maxUC);
  const hasFailures =
    !(pinClearance > 0) ||
    !(sideClearance > 4) ||
    !(shackleFit > 0) ||
    !(cheekClearance > 0) ||
    maxUC > 1.0;

  return {
    inputs,
    setInputs,
    handleChange,
    selectedMaterial,
    handleMaterialChange,
    selectedShackle,
    handleShackleChange,
    selectedSling,
    handleSlingChange,
    calculatedF1_kG,
    calculatedF2_kG,
    F1,
    F2,
    Fy,
    Fu,
    pinClearance,
    sideClearance,
    shackleFit,
    cheekClearance,
    A_I,
    A_II,
    A_III,
    Sz_II,
    Sx_II,
    du1,
    r411,
    r412,
    r413,
    du21,
    du22,
    du23,
    du2,
    r421,
    r422,
    r51,
    r52,
    uc_pb,
    uc_weld,
    Tu3,
    A_pb,
    dub,
    l_w,
    A_w,
    Tuw,
    Fw,
    dnw,
    unityChecks,
    maxUC,
    governingUC,
    hasFailures,
    frontViewDataURL,
    setFrontViewDataURL,
    sideViewDataURL,
    setSideViewDataURL,
  };
}

export type PadeyeContextType = ReturnType<typeof usePadeyeLogic>;
const PadeyeContext = createContext<PadeyeContextType | null>(null);

export const PadeyeProvider = ({ children }: { children: React.ReactNode }) => {
  const logic = usePadeyeLogic();
  return (
    <PadeyeContext.Provider value={logic}>{children}</PadeyeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePadeye = () => {
  const context = useContext(PadeyeContext);
  if (!context) throw new Error("usePadeye must be used within PadeyeProvider");
  return context;
};
