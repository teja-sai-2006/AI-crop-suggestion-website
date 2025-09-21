import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const stats = [
  {
    title: "Active Crops",
    value: "4",
    change: "+2",
    trend: "up",
    description: "from last season",
  },
  {
    title: "Avg Yield",
    value: "85%",
    change: "+12%",
    trend: "up", 
    description: "vs target yield",
  },
  {
    title: "Soil Health",
    value: "Good",
    change: "0%",
    trend: "stable",
    description: "NPK balanced",
  },
  {
    title: "Water Usage",
    value: "1,200L",
    change: "-8%",
    trend: "down",
    description: "efficient usage",
  },
];

export const StatsOverview = () => {
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
        <Card key={index} className="shadow-soft hover:shadow-card transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">{stat.title}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(stat.trend)}
                <span className={`text-sm font-medium ${getTrendColor(
                  stat.trend, 
                  stat.title === "Water Usage"
                )}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">
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