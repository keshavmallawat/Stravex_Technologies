import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TechPillarCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  badges: string[];
}

const TechPillarCard = ({ icon: Icon, title, desc, badges }: TechPillarCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 h-full">
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/10 rounded-full shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {badges.map((b, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {b}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TechPillarCard;
