import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePadeye } from "./PadeyeContext";
import materials from "@/data/materials.json";
import shackles from "@/data/shackles.json";
import slings from "@/data/slings.json";
import CombinedPadeye from "../konva/CombinedPadeye";

export function InputSection() {
  const {
    inputs,
    handleChange,
    selectedMaterial,
    handleMaterialChange,
    selectedShackle,
    handleShackleChange,
    selectedSling,
    handleSlingChange,
    calculatedF1_kG,
    calculatedF2_kG,
  } = usePadeye();

  const padeyeParams = {
    width: inputs.L || inputs.R1 * 2,
    r1: inputs.R1,
    baseHeight: inputs.H,
    holeDia: inputs.R3 * 2,
    cheekDia: inputs.R2 * 2,
    mainThk: inputs.t1,
    cheekThk: inputs.t2,
    shackleA: inputs.A,
    shackleB: inputs.B,
    shackleC: inputs.C,
    slingD: inputs.d1,
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* INPUT CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* LOADS CARD */}
        <Card className="shadow-sm border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold">Loads</CardTitle>
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
                    value={inputs.SLp || ""}
                    onChange={handleChange}
                    className="font-mono h-8 bg-muted border-border text-xs pr-8"
                  />
                  <span className="absolute right-3 top-2 text-[10px] text-muted-foreground font-bold">
                    kG
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="n"
                  className="text-[10px] uppercase font-bold text-muted-foreground">
                  Dynamic load factor n
                </Label>
                <Input
                  id="n"
                  name="n"
                  type="number"
                  value={inputs.n || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
                />
              </div>
            </div>
            <div className="space-y-2 bg-muted/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-muted-foreground">
                  F1 = n × SLp
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-500">
                  {calculatedF1_kG.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal">kG</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-muted-foreground">
                  F2 = 5% × SLp
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-500">
                  {calculatedF2_kG.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal">kG</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MATERIAL PROPERTIES CARD */}
        <Card className="shadow-sm border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold">
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
                <SelectTrigger className="w-full font-mono h-8 bg-muted border-border text-xs">
                  <SelectValue placeholder="Select material" />
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
                  value={inputs.Fy || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
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
                  value={inputs.Fu || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SHACKLE & SLING CARD */}
        <Card className="shadow-sm border-border/50">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold">Shackle & Sling</CardTitle>
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
                  <SelectTrigger className="w-full font-mono h-8 bg-muted border-border text-xs">
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
                  <SelectTrigger className="w-full font-mono h-8 bg-muted border-border text-xs">
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
                  value={inputs.B || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
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
                  value={inputs.C || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
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
                  value={inputs.A || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
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
                  value={inputs.d1 || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
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
                  value={inputs.G1 || ""}
                  onChange={handleChange}
                  className="font-mono h-8 bg-muted border-border text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PADEYE GEOMETRY CARD */}
        <Card className="shadow-sm border-border/50 md:col-span-1">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-lg font-bold">Padeye Geometry</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="R1"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Main Radius R1 (mm)
              </Label>
              <Input
                id="R1"
                name="R1"
                type="number"
                value={inputs.R1 || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="R2"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Cheek Radius R2 (mm)
              </Label>
              <Input
                id="R2"
                name="R2"
                type="number"
                value={inputs.R2 || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="R3"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Pin Hole Radius R3 (mm)
              </Label>
              <Input
                id="R3"
                name="R3"
                type="number"
                value={inputs.R3 || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="t1"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Main Thick t1 (mm)
              </Label>
              <Input
                id="t1"
                name="t1"
                type="number"
                value={inputs.t1 || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="t2"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Cheek Thick t2 (mm)
              </Label>
              <Input
                id="t2"
                name="t2"
                type="number"
                value={inputs.t2 || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="H"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Height H (mm)
              </Label>
              <Input
                id="H"
                name="H"
                type="number"
                value={inputs.H || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="L"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Base Length L (mm)
              </Label>
              <Input
                id="L"
                name="L"
                type="number"
                value={inputs.L || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="alpha"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Sling Angle α (deg)
              </Label>
              <Input
                id="alpha"
                name="alpha"
                type="number"
                value={inputs.alpha || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="h_wm"
                className="text-[10px] uppercase font-bold text-muted-foreground">
                Weld Size h_wm (mm)
              </Label>
              <Input
                id="h_wm"
                name="h_wm"
                type="number"
                value={inputs.h_wm || ""}
                onChange={handleChange}
                className="font-mono h-8 bg-muted text-xs"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DRAWING SECTION */}
      <Card className="shadow-sm border-border/50 w-full h-fit">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg font-bold">Padeye Visualizer</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col items-center justify-center p-0 md:p-6 overflow-x-auto">
          <div className="w-full flex justify-center origin-top pb-4">
            <CombinedPadeye
              params={padeyeParams}
              padCanvas={320}
              constraint={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
