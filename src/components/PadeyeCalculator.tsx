import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import materials from "../data/materials.json";
import shackles from "../data/shackles.json";
import slings from "../data/slings.json";

// Initial Input State
const initialInputs = {
  SLp: 11397, // Sling static load (kG)
  n: 1.5, // Dynamic load factor
  Fy: 245, // Yield strength (MPa) (SS400 = 245 MPa ~= 2497 kg/cm2)
  Fu: 400, // Ultimate strength (MPa)
  R1: 90, // Padeye main radius (mm)
  R2: 60, // Cheek plate radius (mm)
  R3: 30, // Pin hole radius (mm)
  t1: 30, // Main plate thickness (mm)
  t2: 10, // Cheek plate thickness (mm)
  H: 90, // Height to pin hole (mm)
  L: 250, // Base length (mm)
  alpha: 61, // Sling angle (deg)
  B: 38.1, // Shackle pin diameter (mm)
  C: 133, // Shackle inside length (mm)
  A: 57, // Shackle jaw width (mm)
  d1: 42, // Sling diameter (mm)
  G1: 4, // Safety gap (mm)
  h_wm: 6, // Weld size (mm)
};

// Render Property Badge
const PropertyBadge = ({
  label,
  formula,
  value,
  unit,
}: {
  label: string;
  formula: string;
  value: number;
  unit: string;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50 gap-2">
    <div>
      <p className="font-medium text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground font-mono mt-1">{formula}</p>
    </div>
    <div className="text-right">
      <span className="font-mono font-bold text-amber-600 dark:text-amber-500 text-sm">
        {value.toFixed(2)}
      </span>
      <span className="text-xs text-muted-foreground ml-1">{unit}</span>
    </div>
  </div>
);
// Render Check Badge
const CheckBadge = ({
  value,
  label,
  formula,
  limit = 0,
  isUnity = false,
}: {
  value: number;
  label: string;
  formula?: string;
  limit?: number;
  isUnity?: boolean;
}) => {
  const isPassing = isUnity ? value <= limit : value > limit;
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
      <div>
        <p className="font-medium text-sm text-foreground">{label}</p>
        {formula && (
          <p className="text-xs text-muted-foreground font-mono mt-1">
            {formula}
          </p>
        )}
        <p className="text-xs text-muted-foreground font-mono mt-1">
          {isUnity
            ? `UC: ${value.toFixed(3)} (Limit: ${limit.toFixed(1)})`
            : `Result: ${value.toFixed(2)} mm (Required > ${limit} mm)`}
        </p>
      </div>
      <Badge
        variant={isPassing ? "default" : "destructive"}
        className={isPassing ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
        {isPassing ? "PASS" : "FAIL"}
      </Badge>
    </div>
  );
};

export default function PadeyeCalculator() {
  const [inputs, setInputs] = useState(initialInputs);
  const [selectedMaterial, setSelectedMaterial] = useState("SS400");
  const [selectedShackle, setSelectedShackle] = useState("13-1/2T");
  const [selectedSling, setSelectedSling] = useState("42");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));

    // Switch to custom if user manually edits Fy or Fu
    if (name === "Fy" || name === "Fu") {
      setSelectedMaterial("custom");
    }
    // Switch to custom if user manually edits shackle props
    if (name === "B" || name === "C" || name === "A") {
      setSelectedShackle("custom");
    }
    // Switch to custom if user manually edits sling props
    if (name === "d1") {
      setSelectedSling("custom");
    }
  };

  const handleMaterialChange = (matId: string | null) => {
    if (!matId) return;
    setSelectedMaterial(matId);
    if (matId === "custom") return;

    const mat = materials.find((m) => m.id === matId);
    if (mat) {
      setInputs((prev) => ({
        ...prev,
        Fy: mat.fy_mpa,
        Fu: mat.fu_mpa,
      }));
    }
  };

  const handleShackleChange = (shackleId: string | null) => {
    if (!shackleId) return;
    setSelectedShackle(shackleId);
    if (shackleId === "custom") return;

    const shackle = shackles.find((s) => s.wll === shackleId);
    if (shackle) {
      setInputs((prev) => ({
        ...prev,
        A: shackle.a,
        B: shackle.b,
        C: shackle.c,
      }));
    }
  };

  const handleSlingChange = (slingId: string | null) => {
    if (!slingId) return;
    setSelectedSling(slingId);
    if (slingId === "custom") return;

    const sling = slings.find((s) => s.id === slingId);
    if (sling) {
      setInputs((prev) => ({
        ...prev,
        d1: sling.diameter,
      }));
    }
  };

  // Convert kN to N for calculations, but since Fy is in MPa (N/mm2), and geometric properties are mm,
  // we first calculate the loads in kG based on the user's inputs
  const calculatedF1_kG = inputs.n * inputs.SLp;
  const calculatedF2_kG = 0.05 * inputs.SLp;

  // We operate in kg and cm^2 for strength checks based on standard ship design unit practice
  const F1 = calculatedF1_kG;
  const F2 = calculatedF2_kG;

  const Fy = inputs.Fy;
  const Fu = inputs.Fu;
  const { R1, R2, R3, t1, t2, H, L, alpha, B, C, A, d1, G1, h_wm } = inputs;
  const alphaRad = alpha * (Math.PI / 180);

  // --- Calculations as per README ---

  // 1. Clearances
  const pinClearance = 2 * R3 - B;
  const sideClearance = C + B / 2 - R1 - d1 - G1;
  const shackleFit = 0.5 * (A - t1 - 2 * t2);
  const cheekClearance = R1 - R2 - t2;

  // 2. Sections
  const A_I = 2 * ((R1 - R3) * t1 + 2 * (R2 - R3) * t2);
  const A_II = L * t1;
  const A_III = (R1 - R3) * t1 + 2 * (R2 - R3) * t2;
  const Sz_II = (t1 * L * L) / 6;
  const Sx_II = (L * t1 * t1) / 6;

  // 3. Allowables
  const dn_rup = 0.5 * (Fu * 10.1972);
  const dn_yld = 0.6 * (Fy * 10.1972);
  const dn_shrup = 0.3 * (Fu * 10.1972);
  const dn_shyld = 0.4 * (Fy * 10.1972);
  const dn_bear = 0.9 * (Fy * 10.1972);

  // 4. Unity Checks
  // Section I-I
  const du1 = F1 / (A_I / 100);
  const r411 = du1 / dn_rup;
  const r412 = du1 / dn_yld;
  const Tu3 = F1 / (2 * (A_III / 100));
  const r413 = r412 + Math.pow(Tu3 / dn_shyld, 2);
  // const uc_I = Math.max(r411, r412, r413);

  // Section II-II
  const du21 = (F1 * Math.sin(alphaRad)) / (A_II / 100);
  // H is mm, Sz_II is mm3. To get the moment arm F1 * cos() * H/10 in cm. Sz_II/1000 in cm3.
  // F1*cos() * (H/10) / (Sz_II / 1000)
  const du22 = (F1 * Math.cos(alphaRad) * (H / 10)) / (Sz_II / 1000);
  const du23 = (F2 * (H / 10)) / (Sx_II / 1000);
  const du2 = du21 + du22 + du23;

  const r421 = du2 / dn_rup;
  const r422 = du2 / dn_yld;

  //   const Txy = (F1 * Math.cos(alphaRad)) / (A_II / 100);
  //   const Txz = F2 / (A_II / 100);
  //   const Tu2 = Math.max(Txy, Txz);

  // const uc_II = Math.max(r421, r422);

  // Section III-III
  const r51 = Tu3 / dn_shrup;
  const r52 = Tu3 / dn_shyld;
  // const uc_III = Math.max(r51, r52);

  // Bearing
  const A_pb = 2 * R3 * (t1 + 2 * t2);
  const dub = F1 / (A_pb / 100);
  const uc_pb = dub / dn_bear;

  // Weld
  const l_w = 2 * L;
  const A_w = 0.707 * l_w * h_wm;
  const Tuw = F1 / (A_w / 100);
  const Fw =
    0.6 *
    (Fy * 10.1972) *
    (1 + 0.5 * Math.pow(Math.abs(Math.sin(alphaRad)), 1.5));
  const dnw = Fw / 2; // Allowable weld stress
  const uc_weld = Tuw / dnw;

  const inputGroups = [
    {
      title: "Padeye Geometry",
      fields: [
        { key: "R1", label: "Main Radius R1 (mm)" },
        { key: "R2", label: "Cheek Radius R2 (mm)" },
        { key: "R3", label: "Pin Hole Radius R3 (mm)" },
        { key: "t1", label: "Main Thick t1 (mm)" },
        { key: "t2", label: "Cheek Thick t2 (mm)" },
        { key: "H", label: "Height H (mm)" },
        { key: "L", label: "Base Length L (mm)" },
        { key: "alpha", label: "Sling Angle α (deg)" },
        { key: "h_wm", label: "Weld Size h_wm (mm)" },
      ],
    },
  ];

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full font-sans">
      {/* INPUTS COLUMN */}
      <div className="lg:col-span-4 xl:col-span-4 space-y-6">
        {/* LOADS CARD (Standard Theme) */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground">
              Loads
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4 border-b border-border/50 pb-4 mb-4">
              <div className="space-y-2">
                <Label
                  htmlFor="SLp"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Sling static load SLp
                </Label>
                <div className="flex relative">
                  <Input
                    id="SLp"
                    name="SLp"
                    type="number"
                    value={inputs.SLp}
                    onChange={handleChange}
                    className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs pr-8"
                  />
                  <span className="absolute right-3 top-2 text-[10px] text-muted-foreground font-bold">
                    kG
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  Max(Fdi_5,6)
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="n"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Dynamic load factor n
                </Label>
                <div className="flex relative">
                  <Input
                    id="n"
                    name="n"
                    type="number"
                    value={inputs.n}
                    onChange={handleChange}
                    className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs pr-8"
                  />
                  <span className="absolute right-3 top-2 text-[10px] text-muted-foreground font-bold">
                    —
                  </span>
                </div>
              </div>
            </div>

            {/* Computed Results */}
            <div className="space-y-2 bg-muted/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-muted-foreground">
                  F1 = n &times; SLp
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-500">
                  {calculatedF1_kG.toFixed(2)}{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    kG
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-muted-foreground">
                  F2 = 5% &times; SLp{" "}
                  <span className="text-[10px]">[Sec 2.4.2]</span>
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-500">
                  {calculatedF2_kG.toFixed(2)}{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    kG
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MATERIAL PROPERTIES CARD */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground">
              Material Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                Material Grade
              </Label>
              <Select
                value={selectedMaterial}
                onValueChange={handleMaterialChange}>
                <SelectTrigger className="w-full font-mono h-8 bg-muted border-border focus:ring-ring shadow-none text-xs">
                  <SelectValue placeholder="Select material grade" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((mat) => (
                    <SelectItem
                      key={mat.id}
                      value={mat.id}
                      className="font-mono text-xs">
                      {mat.name}
                    </SelectItem>
                  ))}
                  <SelectItem
                    value="custom"
                    className="font-mono text-xs">
                    Custom / Manual
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="Fy"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Yield Strength Fy (MPa)
                </Label>
                <Input
                  id="Fy"
                  name="Fy"
                  type="number"
                  value={inputs.Fy}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="Fu"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Ultimate Strength Fu (MPa)
                </Label>
                <Input
                  id="Fu"
                  name="Fu"
                  type="number"
                  value={inputs.Fu}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SHACKLE & CLEARANCE CARD */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground">
              Shackle & Sling
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Shackle Size
                </Label>
                <Select
                  value={selectedShackle}
                  onValueChange={handleShackleChange}>
                  <SelectTrigger className="w-full font-mono h-8 bg-muted border-border focus:ring-ring shadow-none text-xs">
                    <SelectValue placeholder="Select shackle" />
                  </SelectTrigger>
                  <SelectContent>
                    {shackles.map((s) => (
                      <SelectItem
                        key={s.wll}
                        value={s.wll}
                        className="font-mono text-xs">
                        {s.name}
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="custom"
                      className="font-mono text-xs">
                      Custom / Manual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Sling Size
                </Label>
                <Select
                  value={selectedSling}
                  onValueChange={handleSlingChange}>
                  <SelectTrigger className="w-full font-mono h-8 bg-muted border-border focus:ring-ring shadow-none text-xs">
                    <SelectValue placeholder="Select sling" />
                  </SelectTrigger>
                  <SelectContent>
                    {slings.map((s) => (
                      <SelectItem
                        key={s.id}
                        value={s.id}
                        className="font-mono text-xs">
                        {s.name}
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="custom"
                      className="font-mono text-xs">
                      Custom / Manual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="B"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Shackle Pin Dia B (mm)
                </Label>
                <Input
                  id="B"
                  name="B"
                  type="number"
                  value={inputs.B}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="C"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Shackle Jaw Len C (mm)
                </Label>
                <Input
                  id="C"
                  name="C"
                  type="number"
                  value={inputs.C}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="A"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Shackle Jaw Width A (mm)
                </Label>
                <Input
                  id="A"
                  name="A"
                  type="number"
                  value={inputs.A}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="d1"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Sling Dia d1 (mm)
                </Label>
                <Input
                  id="d1"
                  name="d1"
                  type="number"
                  value={inputs.d1}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="G1"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Safety Gap G1 (mm)
                </Label>
                <Input
                  id="G1"
                  name="G1"
                  type="number"
                  value={inputs.G1}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {inputGroups.map((group) => (
          <Card
            key={group.title}
            className="shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg font-bold text-foreground">
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                {group.fields.map((field) => (
                  <div
                    key={field.key}
                    className="space-y-2">
                    <Label
                      htmlFor={field.key}
                      className="text-[10px] uppercase font-bold text-muted-foreground">
                      {field.label}
                    </Label>
                    <Input
                      id={field.key}
                      name={field.key}
                      type="number"
                      value={inputs[field.key as keyof typeof inputs]}
                      onChange={handleChange}
                      className="font-mono h-8 bg-muted border-border focus-visible:ring-ring shadow-none text-xs"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RESULTS COLUMN */}
      <div className="lg:col-span-8 xl:col-span-8 space-y-6">
        {/* SUMMARY CARD */}
        <Card className="shadow-sm border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2">
                  Maximum Unity Ratio
                </p>
                <div
                  className={`text-6xl font-mono tracking-tighter ${maxUC > 1.0 ? "text-red-500" : "text-emerald-500"}`}>
                  {maxUC.toFixed(3)}
                </div>
                <div className="mt-4">
                  <p
                    className={`text-lg font-bold tracking-widest uppercase ${maxUC > 1.0 ? "text-red-500" : "text-emerald-500"}`}>
                    {maxUC > 1.0 ? "Structure Fails" : "Structure is Safe"}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Governing: {governingUC?.id} — {governingUC?.label}
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-l border-border/50 pl-8">
                {unityChecks.map((uc) => (
                  <div
                    key={uc.id}
                    className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-muted-foreground w-48 shrink-0 truncate">
                      {uc.id} — {uc.label}
                    </div>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${uc.value > 1.0 ? "bg-red-500" : uc.value === maxUC && uc.value <= 1.0 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(uc.value * 100, 100)}%` }}
                      />
                    </div>
                    <div
                      className={`w-12 text-right ${uc.value === maxUC ? "text-amber-600 dark:text-amber-500 font-bold" : uc.value > 1.0 ? "text-red-500" : "text-emerald-600"}`}>
                      {uc.value.toFixed(3)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {hasFailures ? (
          <Alert
            variant="destructive"
            className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 shadow-sm">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500!" />
            <AlertTitle className="font-bold text-red-800">
              Safety Warning
            </AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-300 font-medium">
              One or more dimension checks or capacity checks are failing.
              Please adjust your parameters.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500!" />
            <AlertTitle className="font-bold text-emerald-800">
              All Checks Passing
            </AlertTitle>
            <AlertDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
              The padeye dimensions and capacity are structurally adequate.
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground">
              1. Dimension and Clearance Checks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <CheckBadge
              label="Pin Clearance"
              value={pinClearance}
              limit={0}
            />
            <CheckBadge
              label="Side Clearance"
              value={sideClearance}
              limit={4}
            />
            <CheckBadge
              label="Shackle Fit"
              value={shackleFit}
              limit={0}
            />
            <CheckBadge
              label="Cheek Clearance"
              value={cheekClearance}
              limit={0}
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground">
              Cross Section Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 gap-3">
            <PropertyBadge
              label="Area A_I-I"
              formula="2×((R1-R3)×t1 + 2×(R2-R3)×t2)"
              value={A_I / 100}
              unit="cm²"
            />
            <PropertyBadge
              label="Area A_II-II"
              formula="L × t1"
              value={A_II / 100}
              unit="cm²"
            />
            <PropertyBadge
              label="Area A_III-III"
              formula="(R1-R3)×t1 + 2×(R2-R3)×t2"
              value={A_III / 100}
              unit="cm²"
            />
            <PropertyBadge
              label="Section Modulus Sz_II-II"
              formula="t1 × L² / 6"
              value={Sz_II / 1000}
              unit="cm³"
            />
            <PropertyBadge
              label="Section Modulus Sx_II-II"
              formula="L × t1² / 6"
              value={Sx_II / 1000}
              unit="cm³"
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground">
              2. Strength Unity Checks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex flex-col gap-5">
            {/* 4.1 Section I-I */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
                4.1 — Check Tensile Strength • Section I-I
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <PropertyBadge
                  label="Required stress δu"
                  formula="F1 / A_I-I"
                  value={du1}
                  unit="kG/cm²"
                />
                <CheckBadge
                  label="(4.1-1) Tensile Rupture"
                  formula="δn = 0.5·Fu (Ωt=2)"
                  value={r411}
                  limit={1.0}
                  isUnity={true}
                />
                <CheckBadge
                  label="(4.1-2) Tensile Yielding"
                  formula="δn = 0.6·Fy (Ωt=1.67)"
                  value={r412}
                  limit={1.0}
                  isUnity={true}
                />
                <CheckBadge
                  label="(4.1-3) Combined T+S"
                  formula="(δu/δn) + (Tu/δns)² ≤ 1"
                  value={r413}
                  limit={1.0}
                  isUnity={true}
                />
              </div>
            </div>

            {/* 4.2 Section II-II */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
                4.2 - Check Tensile Strength • Section II-II
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <PropertyBadge
                  label="δu1 — Axial"
                  formula="F1·sinα / A_II-II"
                  value={du21}
                  unit="kG/cm²"
                />
                <PropertyBadge
                  label="δu2 — Inplane bending"
                  formula="F1·cosα·H / Sz_II-II"
                  value={du22}
                  unit="kG/cm²"
                />
                <PropertyBadge
                  label="δu3 — Outplane bending"
                  formula="F2·H / Sx_II-II"
                  value={du23}
                  unit="kG/cm²"
                />
                <PropertyBadge
                  label="δu Combined"
                  formula="δu1 + δu2 + δu3"
                  value={du2}
                  unit="kG/cm²"
                />
                <CheckBadge
                  label="(4.2-1) Tensile Rupture"
                  formula="δn = 0.5·Fu"
                  value={r421}
                  limit={1.0}
                  isUnity={true}
                />
                <CheckBadge
                  label="(4.2-2) Tensile Yielding"
                  formula="δn = 0.6·Fy"
                  value={r422}
                  limit={1.0}
                  isUnity={true}
                />
              </div>
            </div>

            {/* 5 Section III-III */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
                5 - Check Shear Strength • Section III-III
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <PropertyBadge
                  label="Tu — Required shear"
                  formula="F1 / (2 × A_III-III)"
                  value={Tu3}
                  unit="kG/cm²"
                />
                <CheckBadge
                  label="(5-1) Shear Rupture"
                  formula="0.3·Fu (Ωt=2)"
                  value={r51}
                  limit={1.0}
                  isUnity={true}
                />
                <CheckBadge
                  label="(5-2) Shear Yielding"
                  formula="0.4·Fy"
                  value={r52}
                  limit={1.0}
                  isUnity={true}
                />
              </div>
            </div>

            {/* 6 Bearing */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
                6 - Check Bearing Strength
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <PropertyBadge
                  label="Bearing area A_pb"
                  formula="2 × R3 × (t1 + 2t2)"
                  value={A_pb / 100}
                  unit="cm²"
                />
                <PropertyBadge
                  label="Required stress δu"
                  formula="F1 / A_pb"
                  value={dub}
                  unit="kG/cm²"
                />
                <CheckBadge
                  label="(6-1) Bearing Strength"
                  formula="δn = 0.9·Fy"
                  value={uc_pb}
                  limit={1.0}
                  isUnity={true}
                />
              </div>
            </div>

            {/* 7 Weld */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
                7 - Check Weld Stress
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <PropertyBadge
                  label="Weld throat area A_w"
                  formula="0.707 × l_w × h_wm   (l_w=2L)"
                  value={A_w / 100}
                  unit="cm²"
                />
                <PropertyBadge
                  label="Required stress Tu"
                  formula="F1 / A_w"
                  value={Tuw}
                  unit="kG/cm²"
                />
                <PropertyBadge
                  label="Allowable Fw"
                  formula="0.6·Fy·(1 + 0.5·sin^1.5(α)) / Ω"
                  value={dnw}
                  unit="kG/cm²"
                />
                <CheckBadge
                  label="(7-2) Weld Stress"
                  formula="Tu / δn ≤ 1.0"
                  value={uc_weld}
                  limit={1.0}
                  isUnity={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
