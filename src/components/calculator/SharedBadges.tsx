
import { Badge } from "@/components/ui/badge";

export const PropertyBadge = ({
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

export const CheckBadge = ({
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
