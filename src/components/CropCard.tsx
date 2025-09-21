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
    <Card className="
      shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer
      hover:scale-[1.02] hover:-translate-y-1 border-border/60 
      bg-gradient-to-br from-card to-card/80 overflow-hidden
    ">
      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
            {crop.name}
          </CardTitle>
          <Badge className={`
            ${getHealthColor(crop.health)} transition-all duration-200 group-hover:scale-105
            border border-current/20 shadow-sm
          `}>
            <div className="transition-transform duration-200 group-hover:scale-110">
              {getHealthIcon(crop.health)}
            </div>
            <span className="ml-1 font-medium">
              {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
            </span>
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground font-medium">{crop.variety}</div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-field opacity-5 rounded-full -translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-500" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Growth Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">Growth Stage: {crop.stage}</span>
            <span className="text-muted-foreground bg-muted/20 px-2 py-1 rounded-md text-xs font-medium">
              {crop.daysPlanted} days
            </span>
          </div>
          <Progress 
            value={crop.confidence} 
            className="h-3 transition-all duration-300 group-hover:shadow-soft" 
          />
          <div className="text-xs text-muted-foreground font-medium">
            {crop.confidence}% completion
          </div>
        </div>

        {/* Expected Harvest */}
        <div className="flex items-center space-x-3 text-sm bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-3 border border-accent/20">
          <Calendar className="h-4 w-4 text-accent flex-shrink-0" />
          <div>
            <span className="text-muted-foreground">Expected harvest:</span>
            <div className="font-semibold text-foreground">{crop.expectedHarvest}</div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <div className="text-sm font-semibold flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Today's Actions</span>
          </div>
          <ul className="space-y-2">
            {crop.recommendations.slice(0, 2).map((rec, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2 group/item">
                <span className="text-primary mt-1 transition-transform duration-200 group-hover/item:scale-125">•</span>
                <span className="group-hover/item:text-foreground transition-colors duration-200">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="
            w-full transition-all duration-200 group-hover:bg-primary 
            group-hover:text-primary-foreground group-hover:border-primary
            group-hover:shadow-soft font-medium
          " 
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