/**
 * Performance Monitor for Crop Tracker
 * Provides performance tracking and optimization insights
 */

import React from 'react';

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private readonly DEBUG_MODE = process.env.NODE_ENV === 'development';

  /**
   * Start measuring performance for a specific operation
   */
  start(name: string, metadata?: Record<string, any>): void {
    if (!this.DEBUG_MODE) return;

    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      metadata
    };

    this.metrics.set(name, metric);
    console.log(`⏱️ Started measuring: ${name}`, metadata);
  }

  /**
   * End measuring and log the duration
   */
  end(name: string, additionalMetadata?: Record<string, any>): number | null {
    if (!this.DEBUG_MODE) return null;

    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`⚠️ No performance metric found for: ${name}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;

    if (additionalMetadata) {
      metric.metadata = { ...metric.metadata, ...additionalMetadata };
    }

    // Log performance results
    if (duration > 1000) {
      console.warn(`🐌 SLOW OPERATION: ${name} took ${duration.toFixed(2)}ms`, metric.metadata);
    } else if (duration > 100) {
      console.info(`🚧 ${name} took ${duration.toFixed(2)}ms`, metric.metadata);
    } else {
      console.log(`✅ ${name} completed in ${duration.toFixed(2)}ms`, metric.metadata);
    }

    return duration;
  }

  /**
   * Measure an async operation
   */
  async measure<T>(name: string, operation: () => Promise<T>, metadata?: Record<string, any>): Promise<T> {
    this.start(name, metadata);
    try {
      const result = await operation();
      this.end(name, { success: true });
      return result;
    } catch (error) {
      this.end(name, { success: false, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  /**
   * Measure a synchronous operation
   */
  measureSync<T>(name: string, operation: () => T, metadata?: Record<string, any>): T {
    this.start(name, metadata);
    try {
      const result = operation();
      this.end(name, { success: true });
      return result;
    } catch (error) {
      this.end(name, { success: false, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get metrics summary
   */
  getSummary(): { totalOperations: number; averageDuration: number; slowestOperation: PerformanceMetric | null } {
    const metrics = this.getMetrics().filter(m => m.duration !== undefined);
    
    if (metrics.length === 0) {
      return { totalOperations: 0, averageDuration: 0, slowestOperation: null };
    }

    const totalDuration = metrics.reduce((sum, m) => sum + (m.duration || 0), 0);
    const averageDuration = totalDuration / metrics.length;
    const slowestOperation = metrics.reduce((slowest, current) => 
      (current.duration || 0) > (slowest?.duration || 0) ? current : slowest
    );

    return {
      totalOperations: metrics.length,
      averageDuration: parseFloat(averageDuration.toFixed(2)),
      slowestOperation
    };
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
    console.log('🧹 Performance metrics cleared');
  }

  /**
   * Log current performance summary
   */
  logSummary(): void {
    if (!this.DEBUG_MODE) return;

    const summary = this.getSummary();
    console.group('📊 Performance Summary');
    console.log(`Total Operations: ${summary.totalOperations}`);
    console.log(`Average Duration: ${summary.averageDuration}ms`);
    if (summary.slowestOperation) {
      console.log(`Slowest Operation: ${summary.slowestOperation.name} (${summary.slowestOperation.duration}ms)`);
    }
    console.groupEnd();
  }

  /**
   * Monitor React component render performance
   */
  monitorRender(componentName: string): { onRenderStart: () => void; onRenderEnd: () => void } {
    return {
      onRenderStart: () => this.start(`render:${componentName}`),
      onRenderEnd: () => this.end(`render:${componentName}`)
    };
  }

  /**
   * Monitor API call performance
   */
  monitorAPI<T>(apiName: string, apiCall: () => Promise<T>, metadata?: Record<string, any>): Promise<T> {
    return this.measure(`api:${apiName}`, apiCall, metadata);
  }

  /**
   * Monitor cache operations
   */
  monitorCache<T>(operation: string, cacheOperation: () => T, metadata?: Record<string, any>): T {
    return this.measureSync(`cache:${operation}`, cacheOperation, metadata);
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for component performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const { onRenderStart, onRenderEnd } = performanceMonitor.monitorRender(componentName);
  
  React.useEffect(() => {
    onRenderStart();
    return onRenderEnd;
  }, [onRenderStart, onRenderEnd]);

  return {
    startMeasure: (operationName: string, metadata?: Record<string, any>) => 
      performanceMonitor.start(`${componentName}:${operationName}`, metadata),
    endMeasure: (operationName: string, metadata?: Record<string, any>) => 
      performanceMonitor.end(`${componentName}:${operationName}`, metadata),
    measureAsync: <T>(operationName: string, operation: () => Promise<T>, metadata?: Record<string, any>) =>
      performanceMonitor.measure(`${componentName}:${operationName}`, operation, metadata)
  };
};

export default PerformanceMonitor;