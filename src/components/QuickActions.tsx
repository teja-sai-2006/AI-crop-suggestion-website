import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Camera, Sprout, BarChart3, FileText, Phone, MapPin } from "lucide-react";

const actions = [
  {
    icon: Camera,
    title: "Disease Detection",
    description: "Scan crop images for diseases",
    color: "text-warning bg-warning/10 hover:bg-warning/20",
  },
  {
    icon: Sprout,
    title: "Crop Planner",
    description: "Get crop recommendations",
    color: "text-success bg-success/10 hover:bg-success/20",
  },
  {
    icon: BarChart3,
    title: "Yield Tracker",
    description: "Monitor crop progress",
    color: "text-primary bg-primary/10 hover:bg-primary/20",
  },
  {
    icon: FileText,
    title: "Farm Records",
    description: "Manage farming logs",
    color: "text-accent bg-accent/10 hover:bg-accent/20",
  },
  {
    icon: Phone,
    title: "Expert Call",
    description: "Connect with agronomist",
    color: "text-destructive bg-destructive/10 hover:bg-destructive/20",
  },
  {
    icon: MapPin,
    title: "Market Prices",
    description: "Local crop prices",
    color: "text-muted-foreground bg-muted/10 hover:bg-muted/20",
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-card hover:shadow-glow transition-all duration-300 border-border/60 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="text-xl">⚡</div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            const handleClick = () => {
              switch (action.title) {
                case "Disease Detection":
                  navigate('/disease');
                  break;
                case "Crop Planner":
                  navigate('/recommendation');
                  break;
                case "Yield Tracker":
                  navigate('/tracker');
                  break;
                case "Farm Records":
                  navigate('/records');
                  break;
                case "Expert Call":
                  navigate('/expert');
                  break;
                case "Market Prices":
                  navigate('/market');
                  break;
                default:
                  break;
              }
            };
            return (
              <Button
                key={index}
                variant="ghost"
                className={`
                  h-auto p-4 flex-col space-y-2 transition-all duration-200 group
                  ${action.color} hover:scale-105 hover:shadow-soft border border-transparent
                  hover:border-border/30 rounded-xl
                `}
                onClick={handleClick}
              >
                <IconComponent className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                <div className="text-center space-y-1">
                  <div className="font-semibold text-sm group-hover:text-foreground transition-colors">
                    {action.title}
                  </div>
                  <div className="text-xs opacity-80 group-hover:opacity-100 transition-opacity leading-tight">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};