export type FeatureStatus = "included" | "limited" | "excluded";

export interface Feature {
  name: string;
  status: FeatureStatus;
  limitation?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  billingType: "free" | "payg" | "monthly" | "annual" | "custom";
  description: string;
  badge?: string;
  popular?: boolean;
  features: Feature[];
  cta?: string;
  link?: string;
}

export interface UserTypePricing {
  title: string;
  icon: string;
  description: string;
  tiers: PricingTier[];
  allFeatures: string[];
}
