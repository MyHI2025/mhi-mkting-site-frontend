import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, Minus, ChevronDown } from "lucide-react";
import type { PricingTier, FeatureStatus } from "@/data/pricing";

interface FeatureComparisonTableProps {
  tiers: PricingTier[];
  allFeatures: string[];
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

export function FeatureComparisonTable({ tiers, allFeatures }: FeatureComparisonTableProps) {
  return (
    <div className="mt-12">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="features">
          <AccordionTrigger className="text-xl font-bold hover:no-underline" data-testid="button-expand-features">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-5 h-5" />
              View Complete Feature Comparison
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="text-left p-4 font-semibold border-b">Feature</th>
                    {tiers.map((tier) => (
                      <th key={tier.name} className="text-center p-4 font-semibold border-b">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((featureName, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      data-testid={`row-feature-${idx}`}
                    >
                      <td className="p-4 font-medium">{featureName}</td>
                      {tiers.map((tier) => {
                        const feature = tier.features.find(f => f.name === featureName);
                        return (
                          <td key={tier.name} className="p-4 text-center">
                            {feature ? (
                              <div className="flex flex-col items-center gap-1">
                                <FeatureIcon status={feature.status} />
                                {feature.limitation && feature.status !== "excluded" && (
                                  <span className="text-xs text-gray-500">
                                    {feature.limitation}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
