import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const StatsOverview = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t('activeCrops'),
      value: "4",
      change: "+2",
      trend: "up",
      description: t('fromLastSeason'),
    },
    {
      title: t('avgYield'),
      value: "85%",
      change: "+12%",
      trend: "up", 
      description: t('vsTargetYield'),
    },
    {
      title: t('soilHealth'),
      value: t('good'),
      change: "0%",
      trend: "stable",
      description: t('npkBalanced'),
    },
    {
      title: t('waterUsage'),
      value: "1,200L",
      change: "-8%",
      trend: "down",
      description: t('efficientUsage'),
    },
  ];
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-success" />; // Down is good for water usage
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string, isNegativeGood = false) => {
    if (trend === "stable") return "text-muted-foreground";
    if (trend === "up") return isNegativeGood ? "text-destructive" : "text-success";
    return isNegativeGood ? "text-success" : "text-destructive";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-ultra shadow-soft hover:shadow-card transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground text-enhanced">{stat.title}</div>
              <div className="text-2xl font-bold text-enhanced">{stat.value}</div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(stat.trend)}
                <span className={`text-sm font-medium text-enhanced ${getTrendColor(
                  stat.trend, 
                  stat.title === "Water Usage"
                )}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground text-enhanced">
                  {stat.description}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};