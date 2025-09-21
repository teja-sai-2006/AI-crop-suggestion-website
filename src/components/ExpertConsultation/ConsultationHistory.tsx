import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  Video, 
  MessageCircle, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  History,
  Filter,
  FileText
} from 'lucide-react';
import { ConsultationBooking } from '@/types/expertConsultation.types';
import { expertConsultationAPI } from '@/services/expertConsultation.api';
import { format, parseISO, isValid } from 'date-fns';

interface ConsultationHistoryProps {
  refreshTrigger?: number; // Used to trigger refresh from parent
}

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ refreshTrigger }) => {
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ConsultationBooking['status'] | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchConsultations();
  }, [refreshTrigger]);

  useEffect(() => {
    filterConsultations();
  }, [consultations, statusFilter, activeTab]);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      setError(null);
      const consultationsData = await expertConsultationAPI.getConsultationHistory();
      setConsultations(consultationsData);
    } catch (err) {
      setError('Failed to load consultation history. Please try again.');
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterConsultations = () => {
    let filtered = [...consultations];

    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'upcoming') {
        filtered = filtered.filter(c => 
          c.status === 'pending' || c.status === 'confirmed' || c.status === 'in_progress'
        );
      } else if (activeTab === 'completed') {
        filtered = filtered.filter(c => c.status === 'completed');
      } else if (activeTab === 'cancelled') {
        filtered = filtered.filter(c => c.status === 'cancelled' || c.status === 'rescheduled');
      }
    }

    // Additional status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredConsultations(filtered);
  };

  const getStatusIcon = (status: ConsultationBooking['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'in_progress':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'rescheduled':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ConsultationBooking['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rescheduled':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConsultationMethodIcon = (method: ConsultationBooking['consultationMethod']) => {
    switch (method) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Phone className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      case 'in_person':
        return <User className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'PPP') : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  const formatTime = (timeString: string) => {
    try {
      // Handle time format like "14:30"
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return format(date, 'p');
    } catch {
      return timeString;
    }
  };

  const getTabCounts = () => {
    const upcoming = consultations.filter(c => 
      c.status === 'pending' || c.status === 'confirmed' || c.status === 'in_progress'
    ).length;
    const completed = consultations.filter(c => c.status === 'completed').length;
    const cancelled = consultations.filter(c => 
      c.status === 'cancelled' || c.status === 'rescheduled'
    ).length;

    return { upcoming, completed, cancelled };
  };

  const renderConsultationCard = (consultation: ConsultationBooking) => (
    <Card key={consultation.id} className="mb-4 glass-ultra hover:glass-medium transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-green-100 text-green-600">
                {consultation.expertName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate text-strong">
                  {consultation.expertName}
                </h3>
                <Badge 
                  variant="outline" 
                  className={`${getStatusColor(consultation.status)} border-white/20`}
                >
                  <div className="flex items-center gap-1">
                    {getStatusIcon(consultation.status)}
                    <span className="capitalize">{consultation.status.replace('_', ' ')}</span>
                  </div>
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {consultation.expertSpecialization.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                    {spec}
                  </Badge>
                ))}
              </div>
              
              <p className="text-sm text-enhanced text-overlay mb-2 font-medium">
                {consultation.topic}
              </p>
              
              {consultation.description && (
                <p className="text-sm text-enhanced text-overlay line-clamp-2">
                  {consultation.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-green-400 mb-1">
              ₹{consultation.fee}
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs border-white/20 ${
                consultation.paymentStatus === 'paid' 
                  ? 'text-green-400 bg-green-100/20' 
                  : consultation.paymentStatus === 'refunded'
                  ? 'text-orange-400 bg-orange-100/20'
                  : 'text-yellow-400 bg-yellow-100/20'
              }`}
            >
              {consultation.paymentStatus}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <div>
              <div className="font-medium text-strong">Date</div>
              <div className="text-enhanced">
                {formatDate(consultation.scheduledDate)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-400" />
            <div>
              <div className="font-medium text-strong">Time</div>
              <div className="text-enhanced">
                {formatTime(consultation.scheduledTime)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getConsultationMethodIcon(consultation.consultationMethod)}
            <div>
              <div className="font-medium text-strong">Method</div>
              <div className="text-enhanced capitalize">
                {consultation.consultationMethod.replace('_', ' ')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-400" />
            <div>
              <div className="font-medium text-strong">Duration</div>
              <div className="text-enhanced">
                {consultation.duration} minutes
              </div>
            </div>
          </div>
        </div>
        
        {consultation.notes && (
          <div className="mt-4 p-3 glass-medium rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-strong">Notes</span>
            </div>
            <p className="text-sm text-enhanced text-overlay">
              {consultation.notes}
            </p>
          </div>
        )}
        
        {consultation.expertNotes && (
          <div className="mt-4 p-3 glass-medium rounded-lg border border-blue-400/20">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-strong">Expert Notes</span>
            </div>
            <p className="text-sm text-enhanced text-overlay">
              {consultation.expertNotes}
            </p>
          </div>
        )}
        
        {consultation.rating && (
          <div className="mt-4 p-3 glass-medium rounded-lg border border-yellow-400/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < consultation.rating! 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-strong">Your Rating</span>
            </div>
            {consultation.review && (
              <p className="text-sm text-enhanced text-overlay">
                {consultation.review}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48 glass-medium" />
          <Skeleton className="h-10 w-32 glass-medium" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="glass-ultra">
              <CardHeader>
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full glass-medium" />
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
          <Button variant="outline" size="sm" onClick={fetchConsultations}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-strong">
            <History className="h-6 w-6 text-green-400" />
            Consultation History
          </h2>
          <p className="text-enhanced text-overlay">
            Track your past and upcoming expert consultations
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-40 glass-medium text-enhanced border-white/20">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent className="glass-ultra">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="rescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={fetchConsultations} className="border-white/20 text-enhanced hover:bg-white/10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {consultations.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
              <History className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium">No consultation history</h3>
            <p className="text-muted-foreground mb-4">
              Your consultation bookings will appear here once you start scheduling sessions with experts.
            </p>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({consultations.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({tabCounts.upcoming})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({tabCounts.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({tabCounts.cancelled})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No consultations found.</p>
              </div>
            ) : (
              <div>
                {filteredConsultations.map(renderConsultationCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming consultations.</p>
              </div>
            ) : (
              <div>
                {filteredConsultations.map(renderConsultationCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed consultations.</p>
              </div>
            ) : (
              <div>
                {filteredConsultations.map(renderConsultationCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No cancelled consultations.</p>
              </div>
            ) : (
              <div>
                {filteredConsultations.map(renderConsultationCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ConsultationHistory;