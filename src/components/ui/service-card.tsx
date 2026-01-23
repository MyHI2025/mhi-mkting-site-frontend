import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  colorClass: {
    bg: string;
    border: string;
    accentText: string;
    accentBg: string;
  };
}


export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  colorClass,
}: ServiceCardProps) {
  return (
    <div
      className={`rounded-xl p-8 border card-hover ${colorClass.bg} ${colorClass.border}`}
    >
      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${colorClass.accentBg}/10`}
      >
        <Icon className={`h-8 w-8 ${colorClass.accentText}`} />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-4">
        {title}
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>

      {features && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-sm text-muted-foreground"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mr-3 ${colorClass.accentBg}`}
              />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
