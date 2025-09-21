import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { FarmRecord, FarmRecordsSummary } from '@/types/farmRecords.types';
import { FarmRecordsAPIService } from '@/services/farmRecords.api';
import RecordTabs from '@/components/FarmRecords/RecordTabs';
import RecordForm from '@/components/FarmRecords/RecordForm';
import SummaryStats from '@/components/FarmRecords/SummaryStats';
import { useToast } from '@/hooks/use-toast';

const FarmRecords: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'expenses' | 'yields'>('overview');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<'activity' | 'expense' | 'yield'>('activity');
  const [editingRecord, setEditingRecord] = useState<FarmRecord | null>(null);
  const [summary, setSummary] = useState<FarmRecordsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadSummary();
  }, [refreshTrigger]);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const summaryData = await FarmRecordsAPIService.getRecordsSummary();
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to load farm records summary',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = (type: 'activity' | 'expense' | 'yield') => {
    setFormType(type);
    setEditingRecord(null);
    setIsFormOpen(true);
  };

  const handleEditRecord = (record: FarmRecord) => {
    setFormType(record.type);
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleFormSuccess = (action: 'created' | 'updated' | 'deleted') => {
    // Refresh data
    setRefreshTrigger(prev => prev + 1);
    
    // Close form
    setIsFormOpen(false);
    setEditingRecord(null);
    
    // Show success toast
    const actionText = action === 'created' ? 'added' : action === 'updated' ? 'updated' : 'deleted';
    toast({
      title: `Record ${actionText}`,
      description: `Farm record has been ${actionText} successfully.`,
    });
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'activities': return <Activity className="h-4 w-4" />;
      case 'expenses': return <DollarSign className="h-4 w-4" />;
      case 'yields': return <TrendingUp className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTabBadge = (tab: string) => {
    if (!summary) return null;
    
    switch (tab) {
      case 'activities': return summary.totalActivities;
      case 'expenses': return summary.totalExpenses;
      case 'yields': return summary.totalYields;
      default: return summary.totalActivities + summary.totalExpenses + summary.totalYields;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-strong">Farm Records</h1>
            <p className="text-enhanced text-overlay">Track your farming activities, expenses, and yields</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => handleAddRecord('activity')}
              variant="outline"
              className="hidden sm:flex glass hover:glass-medium text-enhanced border-white/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
            <Button
              onClick={() => handleAddRecord('expense')}
              variant="outline"
              className="hidden sm:flex glass hover:glass-medium text-enhanced border-white/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button
              onClick={() => handleAddRecord('yield')}
              className="hidden sm:flex glass hover:glass-medium text-enhanced border-white/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Yield
            </Button>
            
            {/* Mobile Add Button */}
            <div className="sm:hidden">
              <Button onClick={() => handleAddRecord('activity')} className="glass hover:glass-medium text-enhanced">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-enhanced text-overlay">Activities</p>
                    <p className="text-2xl font-bold text-strong">{summary.totalActivities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="text-sm text-enhanced text-overlay">Expenses</p>
                    <p className="text-2xl font-bold text-strong">₹{summary.totalExpenseAmount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-enhanced text-overlay">Yield Value</p>
                    <p className="text-2xl font-bold text-strong">₹{summary.totalYieldValue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`h-5 w-5 ${summary.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                  <div>
                    <p className={`text-sm text-enhanced text-overlay`}>Net Profit</p>
                    <p className={`text-2xl font-bold text-strong ${summary.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ₹{Math.abs(summary.netProfit).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-4 mb-8 glass-medium">
          <TabsTrigger value="overview" className="flex items-center gap-2 text-enhanced">
            {getTabIcon('overview')}
            <span className="hidden sm:inline">Overview</span>
            <Badge variant="secondary" className="ml-1 glass">
              {getTabBadge('overview')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2 text-enhanced">
            {getTabIcon('activities')}
            <span className="hidden sm:inline">Activities</span>
            <Badge variant="secondary" className="ml-1 glass">
              {getTabBadge('activities')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2 text-enhanced">
            {getTabIcon('expenses')}
            <span className="hidden sm:inline">Expenses</span>
            <Badge variant="secondary" className="ml-1 glass">
              {getTabBadge('expenses')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="yields" className="flex items-center gap-2 text-enhanced">
            {getTabIcon('yields')}
            <span className="hidden sm:inline">Yields</span>
            <Badge variant="secondary" className="ml-1 glass">
              {getTabBadge('yields')}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SummaryStats 
            summary={summary} 
            loading={loading}
            onAddRecord={handleAddRecord}
          />
        </TabsContent>

        <TabsContent value="activities">
          <RecordTabs
            type="activity"
            onEdit={handleEditRecord}
            onAdd={() => handleAddRecord('activity')}
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>

        <TabsContent value="expenses">
          <RecordTabs
            type="expense"
            onEdit={handleEditRecord}
            onAdd={() => handleAddRecord('expense')}
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>

        <TabsContent value="yields">
          <RecordTabs
            type="yield"
            onEdit={handleEditRecord}
            onAdd={() => handleAddRecord('yield')}
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>
      </Tabs>

      {/* Record Form Modal */}
      <RecordForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingRecord(null);
        }}
        type={formType}
        editingRecord={editingRecord}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default FarmRecords;