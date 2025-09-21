import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { WeatherForecast } from '../types/weather.types';

interface WeatherChartProps {
  forecast: WeatherForecast[];
  className?: string;
}

interface ChartDataPoint {
  day: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  precipitationChance: number;
  uvIndex: number;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ forecast, className }) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [visibleMetrics, setVisibleMetrics] = useState({
    temperature: true,
    humidity: true,
    wind: false,
    precipitation: false,
    uvIndex: false
  });

  // Transform forecast data for charts
  const chartData: ChartDataPoint[] = forecast.map(day => ({
    day: day.day,
    high: day.high,
    low: day.low,
    humidity: day.humidity,
    windSpeed: day.windSpeed,
    precipitationChance: day.precipitationChance,
    uvIndex: day.uvIndex
  }));

  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
              {entry.dataKey === 'humidity' || entry.dataKey === 'precipitationChance' ? '%' : 
               entry.dataKey === 'high' || entry.dataKey === 'low' ? '°C' :
               entry.dataKey === 'windSpeed' ? ' km/h' :
               entry.dataKey === 'uvIndex' ? '' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex gap-2">
          <Button 
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
          >
            Line Chart
          </Button>
          <Button 
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={visibleMetrics.temperature}
              onCheckedChange={() => toggleMetric('temperature')}
            />
            <span className="text-red-600">Temperature</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={visibleMetrics.humidity}
              onCheckedChange={() => toggleMetric('humidity')}
            />
            <span className="text-blue-600">Humidity</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={visibleMetrics.wind}
              onCheckedChange={() => toggleMetric('wind')}
            />
            <span className="text-green-600">Wind Speed</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={visibleMetrics.precipitation}
              onCheckedChange={() => toggleMetric('precipitation')}
            />
            <span className="text-cyan-600">Rain Chance</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={visibleMetrics.uvIndex}
              onCheckedChange={() => toggleMetric('uvIndex')}
            />
            <span className="text-purple-600">UV Index</span>
          </label>
        </div>
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="day" 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {visibleMetrics.temperature && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="high" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                        name="High Temp (°C)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="low" 
                        stroke="#f97316" 
                        strokeWidth={2}
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                        name="Low Temp (°C)"
                      />
                    </>
                  )}
                  
                  {visibleMetrics.humidity && (
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      name="Humidity (%)"
                    />
                  )}
                  
                  {visibleMetrics.wind && (
                    <Line 
                      type="monotone" 
                      dataKey="windSpeed" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      name="Wind Speed (km/h)"
                    />
                  )}
                  
                  {visibleMetrics.precipitation && (
                    <Line 
                      type="monotone" 
                      dataKey="precipitationChance" 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                      name="Rain Chance (%)"
                    />
                  )}
                  
                  {visibleMetrics.uvIndex && (
                    <Line 
                      type="monotone" 
                      dataKey="uvIndex" 
                      stroke="#a855f7" 
                      strokeWidth={2}
                      dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                      name="UV Index"
                    />
                  )}
                </LineChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="day" 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {visibleMetrics.temperature && (
                    <>
                      <Bar dataKey="high" fill="#ef4444" name="High Temp (°C)" />
                      <Bar dataKey="low" fill="#f97316" name="Low Temp (°C)" />
                    </>
                  )}
                  
                  {visibleMetrics.humidity && (
                    <Bar dataKey="humidity" fill="#3b82f6" name="Humidity (%)" />
                  )}
                  
                  {visibleMetrics.wind && (
                    <Bar dataKey="windSpeed" fill="#22c55e" name="Wind Speed (km/h)" />
                  )}
                  
                  {visibleMetrics.precipitation && (
                    <Bar dataKey="precipitationChance" fill="#06b6d4" name="Rain Chance (%)" />
                  )}
                  
                  {visibleMetrics.uvIndex && (
                    <Bar dataKey="uvIndex" fill="#a855f7" name="UV Index" />
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Chart Legend */}
      <div className="text-xs text-muted-foreground p-4 bg-muted/20 rounded-lg">
        <p className="font-medium mb-2">Chart Information:</p>
        <ul className="space-y-1">
          <li>• Temperature shows daily high and low values in Celsius</li>
          <li>• Humidity represents the percentage of moisture in the air</li>
          <li>• Wind speed is measured in kilometers per hour</li>
          <li>• Rain chance shows the probability of precipitation</li>
          <li>• UV Index indicates the strength of ultraviolet radiation</li>
        </ul>
      </div>
    </div>
  );
};