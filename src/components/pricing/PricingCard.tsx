import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Minus } from "lucide-react";
import { Link } from "wouter";
import type { PricingTier, FeatureStatus } from "@/data/pricing";

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: "monthly" | "annual";
  onExpand?: (tierName: string) => void;
  isExpanded?: boolean;
  activeTab?: string;
}

const FeatureIcon = ({ status }: { status: FeatureStatus }) => {
  switch (status) {
    case "included":
      return <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" data-testid="icon-feature-included" />;
    case "limited":
      return <Minus className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" data-testid="icon-feature-limited" />;
    case "excluded":
      return <X className="w-5 h-5 text-red-400 dark:text-red-500 flex-shrink-0" data-testid="icon-feature-excluded" />;
  }
};

export function PricingCard({ tier, billingCycle, onExpand, isExpanded = false, activeTab = "" }: PricingCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = onExpand ? isExpanded : internalExpanded;

  const calculatePrice = (basePrice: string, billingType: string) => {
    if (billingType === "free" || billingType === "custom" || billingType === "payg") {
      return basePrice;
    }

    // Only apply discount to monthly plans
    if (billingType === "monthly" && billingCycle === "annual") {
      const price = parseInt(basePrice.replace(/[₦,]/g, ""));
      if (!isNaN(price)) {
        const annualPrice = price * 10; // 2 months free
        return `₦${annualPrice.toLocaleString()}`;
      }
    }

    return basePrice;
  };

  const getSavingsLabel = (basePrice: string, billingType: string) => {
    if (billingType !== "monthly" || billingCycle !== "annual") return null;

    const price = parseInt(basePrice.replace(/[₦,]/g, ""));
    if (isNaN(price)) return null;

    const savings = price * 2;
    return (
      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
        Save ₦{savings.toLocaleString()}/year
      </span>
    );
  };

  const handleToggleExpansion = () => {
    if (onExpand) {
      onExpand(tier.name);
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <Card 
      className={`relative flex flex-col ${tier.popular ? 'border-blue-500 shadow-xl scale-105' : ''}`}
      data-testid={`card-pricing-${tier.name.toLowerCase()}`}
    >
      {tier.badge && (
        <Badge 
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white"
          data-testid={`badge-${tier.name.toLowerCase()}`}
        >
          {tier.badge}
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl" data-testid={`text-plan-name-${tier.name.toLowerCase()}`}>
          {tier.name}
        </CardTitle>
        <CardDescription>{tier.description}</CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-gray-900 dark:text-white" data-testid={`text-price-${tier.name.toLowerCase()}`}>
              {calculatePrice(tier.price, tier.billingType)}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {tier.billingType === "monthly" && billingCycle === "annual" ? "/year" : tier.period}
            </span>
          </div>
          {tier.billingType === "monthly" && billingCycle === "annual" && (
            <div className="mt-2 space-y-1">
              <div className="text-sm text-gray-500 line-through">
                Was ₦{(parseInt(tier.price.replace(/[₦,]/g, "")) * 12).toLocaleString()}/year
              </div>
              {getSavingsLabel(tier.price, tier.billingType)}
            </div>
          )}
          {tier.billingType === "payg" && (
            <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              {activeTab === "patients" ? "Pay only when booking" : "+ 15% per transaction"}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex-1">
        {(expanded ? tier.features : tier.features.slice(0, 6)).map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <FeatureIcon status={feature.status} />
            <div className="flex-1 text-sm">
              <div className={feature.status === "excluded" ? "text-gray-400" : ""}>
                {feature.name}
              </div>
              {feature.limitation && feature.status !== "excluded" && (
                <div className="text-xs text-gray-500 mt-1">
                  {feature.limitation}
                </div>
              )}
            </div>
          </div>
        ))}
        {tier.features.length > 6 && (
          <button
            onClick={handleToggleExpansion}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline pt-2"
            data-testid={`button-expand-${tier.name.toLowerCase()}`}
          >
            {expanded 
              ? "Show less" 
              : `+ ${tier.features.length - 6} more features`
            }
          </button>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          variant={tier.popular ? "default" : "outline"}
          asChild
          data-testid={`button-cta-${tier.name.toLowerCase()}`}
        >
          <Link href={tier.link || "/contact#contact-form"}>
            {tier.cta || "Get Started"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
