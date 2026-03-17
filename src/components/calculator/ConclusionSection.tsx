
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { usePadeye } from "./PadeyeContext";

export function ConclusionSection() {
  const { unityChecks, maxUC, governingUC, hasFailures } = usePadeye();

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {hasFailures ? (
        <Alert
          variant="destructive"
          className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 shadow-sm">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500!" />
          <AlertTitle className="font-bold text-red-800">
            Safety Warning
          </AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300 font-medium">
            One or more dimension checks or capacity checks are failing. Please
            adjust your parameters.
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
    </div>
  );
}
