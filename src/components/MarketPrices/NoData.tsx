import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface NoDataProps {
  title?: string;
  description?: string;
  message?: string;
  onRefresh?: () => void;
  showRefreshButton?: boolean;
}

const NoData: React.FC<NoDataProps> = ({
  title = "No Data Available",
  description,
  message = "No market price data available for the selected crop and location.",
  onRefresh,
  showRefreshButton = true,
}) => {
  return (
    <Card className="col-span-full glass-medium">
      <CardContent className="py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 glass rounded-full flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-enhanced" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-strong mb-2">
              {title}
            </h3>
            <p className="text-enhanced max-w-md mx-auto">
              {description || message}
            </p>
          </div>

          {showRefreshButton && onRefresh && (
            <Button
              variant="outline"
              onClick={onRefresh}
              className="mt-4 glass hover:glass-medium text-enhanced"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}

          <div className="mt-6 text-sm text-enhanced">
            <p>Try selecting a different crop or market location.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoData;