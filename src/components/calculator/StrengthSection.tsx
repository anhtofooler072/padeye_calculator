
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckBadge, PropertyBadge } from "./SharedBadges";
import { usePadeye } from "./PadeyeContext";

export function StrengthSection() {
  const {
    
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
    Tu3,
    r51,
    r52,
    dub,
    uc_pb,
    Tuw, uc_weld,
  } = usePadeye();

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg font-bold">
            2. Strength Unity Checks
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col gap-6">
          {/* 4.1 Section I-I */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
              4.1 — Check Tensile Strength • Section I-I
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <PropertyBadge
                label="Required shear stress Tu"
                formula="F1 / (2·A_III-III)"
                value={Tu3}
                unit="kG/cm²"
              />
              <CheckBadge
                label="(5-1) Shear Rupture"
                formula="δns = 0.3·Fu"
                value={r51}
                limit={1.0}
                isUnity={true}
              />
              <CheckBadge
                label="(5-2) Shear Yielding"
                formula="δns = 0.4·Fy"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <PropertyBadge
                label="Bearing stress δub"
                formula="F1 / A_pb"
                value={dub}
                unit="kG/cm²"
              />
              <CheckBadge
                label="(6-1) Bearing Strength"
                formula="δnb = 0.9·Fy"
                value={uc_pb}
                limit={1.0}
                isUnity={true}
              />
            </div>
          </div>

          {/* 7 Weld */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-1">
              7 - Check Weld Strength
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <PropertyBadge
                label="Required weld stress Tuw"
                formula="F1 / Aw"
                value={Tuw}
                unit="kG/cm²"
              />
              <CheckBadge
                label="(7-2) Weld Strength"
                formula="Fw/2"
                value={uc_weld}
                limit={1.0}
                isUnity={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
