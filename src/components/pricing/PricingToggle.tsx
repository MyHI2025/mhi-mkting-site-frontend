import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PricingToggleProps {
  value: "monthly" | "annual";
  onChange: (value: "monthly" | "annual") => void;
  savingsText?: string;
}

export function PricingToggle({ value, onChange, savingsText = "Save 16.7% (2 months free)" }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Label htmlFor="billing-toggle" className={value === "monthly" ? "font-semibold" : ""}>
        Monthly
      </Label>
      <Switch
        id="billing-toggle"
        checked={value === "annual"}
        onCheckedChange={(checked) => onChange(checked ? "annual" : "monthly")}
        data-testid="switch-billing-cycle"
      />
      <Label htmlFor="billing-toggle" className={value === "annual" ? "font-semibold" : ""}>
        Annual
      </Label>
      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
        {savingsText}
      </Badge>
    </div>
  );
}
