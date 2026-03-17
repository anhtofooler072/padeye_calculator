
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckBadge, PropertyBadge } from "./SharedBadges";
import { usePadeye } from "./PadeyeContext";

export function DimensionSection() {
  const {
    pinClearance,
    sideClearance,
    shackleFit,
    cheekClearance,
    A_I,
    A_II,
    A_III,
    Sz_II,
    Sx_II,
  } = usePadeye();

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg font-bold">
            1. Dimension & Clearance Checks
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

      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg font-bold">
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
    </div>
  );
}
