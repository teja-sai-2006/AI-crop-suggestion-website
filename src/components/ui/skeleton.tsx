import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded-md ${className}`} />
);

// Named export for compatibility
export { Skeleton };

export const CropDetailsSkeleton: React.FC = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-8 pt-20">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="bg-gradient-harvest p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-20" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </div>

        {/* Overview Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-4 flex-wrap">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-32" />
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>
          
          {/* Content Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export const CropCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </CardHeader>
    
    <CardContent>
      <div className="space-y-4">
        {/* Progress Skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-3 w-32" />
        </div>
        
        {/* Activities Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
        
        {/* Action Buttons Skeleton */}
        <div className="flex gap-2 pt-2 flex-wrap">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Skeleton;