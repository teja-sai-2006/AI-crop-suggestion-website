import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sprout, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CropCardProps {
  crop: {
    id?: string;
    name: string;
    variety: string;
    stage: string;
    daysPlanted: number;
    expectedHarvest: string;
    confidence: number;
    health: "excellent" | "good" | "warning" | "poor";
    recommendations: string[];
  };
}

export const CropCard = ({ crop }: CropCardProps) => {
  const navigate = useNavigate();
  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-success bg-success/10";
      case "good":
        return "text-primary bg-primary/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "poor":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "excellent":
      case "good":
        return <Sprout className="h-4 w-4" />;
      case "warning":
      case "poor":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Sprout className="h-4 w-4" />;
    }
  };

  return (
    <Card className="shadow-card hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{crop.name}</CardTitle>
          <Badge className={getHealthColor(crop.health)}>
            {getHealthIcon(crop.health)}
            {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">{crop.variety}</div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Growth Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Growth Stage: {crop.stage}</span>
            <span className="text-muted-foreground">{crop.daysPlanted} days</span>
          </div>
          <Progress value={crop.confidence} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {crop.confidence}% completion
          </div>
        </div>

        {/* Expected Harvest */}
        <div className="flex items-center space-x-2 text-sm bg-accent/10 rounded-md p-2">
          <Calendar className="h-4 w-4 text-accent" />
          <span>Expected harvest: <strong>{crop.expectedHarvest}</strong></span>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <div className="text-sm font-medium flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Today's Actions</span>
          </div>
          <ul className="space-y-1">
            {crop.recommendations.slice(0, 2).map((rec, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start space-x-1">
                <span className="text-primary mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => {
            // Use crop ID if available (from tracker), otherwise fallback to name (for compatibility)
            const identifier = crop.id || crop.name.toLowerCase();
            navigate(`/crop/${identifier}`);
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};