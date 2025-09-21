import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Filter, 
  Calendar, 
  Edit, 
  Trash2, 
  Plus,
  Activity,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  Package
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { FarmRecord, FarmActivity, FarmExpense, FarmYield, FarmRecordsFilter } from '@/types/farmRecords.types';
import { FarmRecordsAPIService } from '@/services/farmRecords.api';
import { useToast } from '@/hooks/use-toast';

interface RecordTabsProps {
  type: 'activity' | 'expense' | 'yield';
  onEdit: (record: FarmRecord) => void;
  onAdd: () => void;
  refreshTrigger?: number;
}

const RecordTabs: React.FC<RecordTabsProps> = ({ type, onEdit, onAdd, refreshTrigger }) => {
  const [records, setRecords] = useState<FarmRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<FarmRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cropFilter, setCropFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadRecords();
  }, [type, refreshTrigger]);

  useEffect(() => {
    filterRecords();
  }, [records, searchTerm, dateFilter, categoryFilter, cropFilter]);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filter: FarmRecordsFilter = { type };
      const data = await FarmRecordsAPIService.getRecords(filter);
      setRecords(data);
    } catch (err) {
      setError('Failed to load records. Please try again.');
      console.error('Error loading records:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterRecords = () => {
    let filtered = [...records];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.cropType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (dateFilter) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(record => 
        new Date(record.date) >= cutoffDate
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(record => {
        if (type === 'activity') {
          return (record as FarmActivity).activityType === categoryFilter;
        } else if (type === 'expense') {
          return (record as FarmExpense).expenseCategory === categoryFilter;
        }
        return true;
      });
    }

    // Crop filter
    if (cropFilter !== 'all') {
      filtered = filtered.filter(record => record.cropType === cropFilter);
    }

    setFilteredRecords(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await FarmRecordsAPIService.deleteRecord(id);
      setRecords(prev => prev.filter(r => r.id !== id));
      toast({
        title: 'Record deleted',
        description: 'Farm record has been deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete record. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getUniqueValues = (field: keyof FarmRecord): string[] => {
    const values = new Set<string>();
    records.forEach(record => {
      const value = record[field];
      if (value && typeof value === 'string') {
        values.add(value);
      }
    });
    return Array.from(values);
  };

  const getCategories = (): string[] => {
    if (type === 'activity') {
      return ['planting', 'irrigation', 'fertilizing', 'pesticide', 'harvesting', 'weeding', 'other'];
    } else if (type === 'expense') {
      return ['seeds', 'fertilizer', 'pesticide', 'equipment', 'labor', 'fuel', 'maintenance', 'other'];
    }
    return [];
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'activity': return <Activity className="h-5 w-5 text-green-600" />;
      case 'expense': return <DollarSign className="h-5 w-5 text-red-600" />;
      case 'yield': return <TrendingUp className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'activity': return 'green';
      case 'expense': return 'red';
      case 'yield': return 'blue';
    }
  };

  const renderRecordCard = (record: FarmRecord) => {
    const activity = record as FarmActivity;
    const expense = record as FarmExpense;
    const yieldRecord = record as FarmYield;

    return (
      <Card key={record.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {getTypeIcon()}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-lg truncate">{record.title}</h3>
                {record.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {record.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(record.date)}
                  </Badge>
                  
                  {record.cropType && (
                    <Badge variant="outline" className="text-xs">
                      <Package className="h-3 w-3 mr-1" />
                      {record.cropType}
                    </Badge>
                  )}
                  
                  {type === 'activity' && activity.activityType && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {activity.activityType.replace('_', ' ')}
                    </Badge>
                  )}
                  
                  {type === 'expense' && expense.expenseCategory && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {expense.expenseCategory.replace('_', ' ')}
                    </Badge>
                  )}
                  
                  {type === 'yield' && yieldRecord.quality && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {yieldRecord.quality.replace('_', ' ')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(record)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(record.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {type === 'activity' && (
              <>
                {activity.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-muted-foreground">{activity.duration}h</div>
                    </div>
                  </div>
                )}
                
                {activity.laborCount && (
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Labor</div>
                      <div className="text-muted-foreground">{activity.laborCount} people</div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {type === 'expense' && (
              <>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Amount</div>
                    <div className="text-muted-foreground font-semibold">
                      {formatCurrency(expense.amount)}
                    </div>
                  </div>
                </div>
                
                {expense.vendor && (
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Vendor</div>
                      <div className="text-muted-foreground">{expense.vendor}</div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {type === 'yield' && (
              <>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Quantity</div>
                    <div className="text-muted-foreground">
                      {yieldRecord.quantity} {yieldRecord.unit}
                    </div>
                  </div>
                </div>
                
                {yieldRecord.totalValue && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Value</div>
                      <div className="text-muted-foreground font-semibold">
                        {formatCurrency(yieldRecord.totalValue)}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {record.fieldLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">{record.fieldLocation}</div>
                </div>
              </div>
            )}
          </div>
          
          {record.notes && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-sm">
                <div className="font-medium mb-1">Notes</div>
                <div className="text-muted-foreground">{record.notes}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-6" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-16" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={loadRecords}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
            {getTypeIcon()}
            {type === 'yield' ? 'Yields' : `${type}s`}
          </h2>
          <p className="text-muted-foreground">
            {filteredRecords.length} of {records.length} records
          </p>
        </div>
        
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add {type === 'yield' ? 'Yield' : type}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}s...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        {getCategories().length > 0 && (
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getCategories().map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {getUniqueValues('cropType').length > 0 && (
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {getUniqueValues('cropType').map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Records List */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <div className={`mx-auto h-12 w-12 text-${getTypeColor()}-600 mb-4`}>
              {getTypeIcon()}
            </div>
            <h3 className="text-lg font-medium">No {type}s found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || dateFilter !== 'all' || categoryFilter !== 'all' || cropFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : `You haven't added any ${type}s yet.`}
            </p>
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add First {type === 'yield' ? 'Yield' : type}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map(renderRecordCard)}
        </div>
      )}
    </div>
  );
};

export default RecordTabs;