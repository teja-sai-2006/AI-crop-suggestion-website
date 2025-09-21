import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Calendar,
  Plus,
  Package,
  Zap
} from 'lucide-react';
import { FarmRecordsSummary, FarmRecordsAnalytics } from '@/types/farmRecords.types';
import { FarmRecordsAPIService } from '@/services/farmRecords.api';

interface SummaryStatsProps {
  summary: FarmRecordsSummary | null;
  loading: boolean;
  onAddRecord: (type: 'activity' | 'expense' | 'yield') => void;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ summary, loading, onAddRecord }) => {
  const [analytics, setAnalytics] = useState<FarmRecordsAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const analyticsData = await FarmRecordsAPIService.getAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getProfitMargin = () => {
    if (!summary || summary.totalExpenseAmount === 0) return 0;
    return ((summary.netProfit / summary.totalExpenseAmount) * 100);
  };

  const getMonthLabel = (monthString: string) => {
    try {
      const [year, month] = monthString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    } catch {
      return monthString;
    }
  };

  // Prepare chart data
  const monthlyTrendsData = analytics?.monthlyTrends.map(trend => ({
    month: getMonthLabel(trend.month),
    expenses: trend.expenses,
    yields: trend.yields,
    activities: trend.activities,
    profit: trend.yields - trend.expenses
  })) || [];

  const expensesPieData = analytics ? Object.entries(analytics.expensesByCategory).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' '),
    value: amount,
    color: getRandomColor(category)
  })) : [];

  const yieldsByCropData = analytics ? Object.entries(analytics.yieldsByCrop).map(([crop, quantity]) => ({
    crop: crop.charAt(0).toUpperCase() + crop.slice(1),
    quantity
  })) : [];

  function getRandomColor(seed: string) {
    const colors = [
      '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1',
      '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98'
    ];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No farm records yet</h3>
          <p className="text-muted-foreground mb-6">
            Start by adding your first farm activity, expense, or yield record.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => onAddRecord('activity')} variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
            <Button onClick={() => onAddRecord('expense')} variant="outline">
              <DollarSign className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button onClick={() => onAddRecord('yield')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Add Yield
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Net Profit</p>
                <p className={`text-2xl font-bold ${summary.netProfit >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                  {formatCurrency(Math.abs(summary.netProfit))}
                </p>
                <div className="flex items-center mt-2">
                  {summary.netProfit >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-xs ml-1 ${summary.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {getProfitMargin().toFixed(1)}% margin
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${summary.netProfit >= 0 ? 'bg-green-200' : 'bg-red-200'}`}>
                {summary.netProfit >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(summary.totalExpenseAmount)}
                </p>
                <p className="text-xs text-red-700 mt-2">
                  {summary.totalExpenses} transactions
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-200">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Yield Value</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(summary.totalYieldValue)}
                </p>
                <p className="text-xs text-blue-700 mt-2">
                  {summary.totalYields} harvests
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-200">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 mb-1">Activities</p>
                <p className="text-2xl font-bold text-purple-900">
                  {summary.totalActivities}
                </p>
                <p className="text-xs text-purple-700 mt-2">
                  Farm operations
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-200">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Crops */}
      {summary.topCrops.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Performing Crops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.topCrops.slice(0, 5).map((crop, index) => {
                const percentage = summary.totalYieldValue > 0 
                  ? (crop.value / summary.totalYieldValue) * 100 
                  : 0;
                
                return (
                  <div key={crop.crop} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium truncate">{crop.crop}</span>
                    </div>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatCurrency(crop.value)}</div>
                        <div className="text-xs text-muted-foreground">
                          {crop.quantity} units
                        </div>
                      </div>
                      <div className="w-24">
                        <Progress value={percentage} className="h-2" />
                      </div>
                      <div className="text-xs text-muted-foreground w-12 text-right">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        {monthlyTrendsData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="yields" stroke="#3b82f6" strokeWidth={2} name="Yields" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Expenses by Category */}
        {expensesPieData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Expenses by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Yields by Crop */}
        {yieldsByCropData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Yields by Crop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yieldsByCropData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Labor Efficiency */}
        {!analyticsLoading && analytics?.laborEfficiency && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Labor Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Hours Worked</span>
                  <span className="font-medium">{analytics.laborEfficiency.totalHours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Hours per Activity</span>
                  <span className="font-medium">{analytics.laborEfficiency.averageHoursPerActivity.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cost per Hour</span>
                  <span className="font-medium">{formatCurrency(analytics.laborEfficiency.costPerHour)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Records */}
      {summary.recentRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Records
              </div>
              <Badge variant="secondary">{summary.recentRecords.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.recentRecords.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      record.type === 'activity' ? 'bg-green-100' :
                      record.type === 'expense' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {record.type === 'activity' ? (
                        <Activity className={`h-4 w-4 ${
                          record.type === 'activity' ? 'text-green-600' :
                          record.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      ) : record.type === 'expense' ? (
                        <DollarSign className="h-4 w-4 text-red-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{record.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.cropType && `${record.cropType} • `}
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="capitalize">
                      {record.type}
                    </Badge>
                    {record.amount && (
                      <div className="text-sm font-medium mt-1">
                        {formatCurrency(record.amount)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => onAddRecord('activity')} variant="outline" className="h-auto p-4">
              <div className="flex flex-col items-center gap-2">
                <Activity className="h-6 w-6 text-green-600" />
                <span>Log Activity</span>
                <span className="text-xs text-muted-foreground">Record farm operations</span>
              </div>
            </Button>
            
            <Button onClick={() => onAddRecord('expense')} variant="outline" className="h-auto p-4">
              <div className="flex flex-col items-center gap-2">
                <DollarSign className="h-6 w-6 text-red-600" />
                <span>Add Expense</span>
                <span className="text-xs text-muted-foreground">Track spending</span>
              </div>
            </Button>
            
            <Button onClick={() => onAddRecord('yield')} className="h-auto p-4">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>Record Yield</span>
                <span className="text-xs text-muted-foreground">Log harvest results</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStats;