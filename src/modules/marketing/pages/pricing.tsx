import { useState, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  Ambulance,
  Shield,
  Briefcase,
} from "lucide-react";
import { Link } from "wouter";
import {
  patientPricing,
  physicianPricing,
  hospitalPricing,
  laboratoryPricing,
  pharmacyPricing,
  emergencyPricing,
  insurancePricing,
  corporatePricing,
  type UserTypePricing,
} from "@/data/pricing";
import { PricingToggle } from "@/components/pricing/PricingToggle";
import { PricingCard } from "@/components/pricing/PricingCard";
import { FeatureComparisonTable } from "@/components/pricing/FeatureComparisonTable";

const iconMap: Record<string, any> = {
  Users,
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  Ambulance,
  Shield,
  Briefcase,
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [location] = useLocation();

  const userTypes: Record<string, UserTypePricing> = useMemo(
    () => ({
      patients: patientPricing,
      physicians: physicianPricing,
      hospitals: hospitalPricing,
      laboratories: laboratoryPricing,
      pharmacies: pharmacyPricing,
      emergency: emergencyPricing,
      insurance: insurancePricing,
      corporates: corporatePricing,
    }),
    [],
  );

  const initialTab = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    return type && userTypes[type] ? type : "patients";
  }, [userTypes]);

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {},
  );

  const currentUserType = userTypes[activeTab];
  const Icon = iconMap[currentUserType.icon];

  const toggleCardExpansion = useCallback((tierName: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [tierName]: !prev[tierName],
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            data-testid="heading-pricing"
          >
            Transparent Pricing for Every Healthcare Stakeholder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. From free listings to
            full-featured enterprise solutions. Every plan includes AI-powered
            features.
          </p>

          <PricingToggle value={billingCycle} onChange={setBillingCycle} />
        </div>

        {/* User Type Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            window.history.replaceState(null, "", `/pricing?type=${value}`);
          }}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full mb-8 h-auto gap-2">
            {Object.entries(userTypes).map(([key, userType]) => {
              const TabIcon = iconMap[userType.icon];
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex flex-col items-center gap-1 py-3"
                  data-testid={`tab-${key}`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span className="text-xs hidden sm:inline">
                    {userType.title.split(" ")[0]}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(userTypes).map(([key, userType]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              {/* User Type Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {userType.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {userType.description}
                </p>
              </div>

              {userType.tiers.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                    {userType.tiers.map((tier) => (
                      <PricingCard
                        key={tier.name}
                        tier={tier}
                        billingCycle={billingCycle}
                        onExpand={toggleCardExpansion}
                        isExpanded={expandedCards[tier.name]}
                        activeTab={activeTab}
                      />
                    ))}
                  </div>

                  <FeatureComparisonTable
                    tiers={userType.tiers}
                    allFeatures={userType.allFeatures}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We're finalizing pricing plans for {userType.title}. Check
                    back soon!
                  </p>
                  <Button asChild>
                    <Link href="/contact">Get Notified</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* FAQ or CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our team is here to help you find the perfect plan for your needs
          </p>
          <Button size="lg" asChild data-testid="button-contact-sales">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
