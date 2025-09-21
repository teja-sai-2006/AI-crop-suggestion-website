import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, History, Phone } from 'lucide-react';
import { Expert, ConsultationBooking } from '@/types/expertConsultation.types';
import ExpertList from './ExpertList';
import BookingModal from './BookingModal';
import ConsultationHistory from './ConsultationHistory';
import { useToast } from '@/hooks/use-toast';

const ExpertConsultation: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<'experts' | 'history'>('experts');
  const { toast } = useToast();

  const handleBookExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedExpert(null);
  };

  const handleBookingSuccess = (booking: ConsultationBooking) => {
    // Show success toast
    toast({
      title: "Consultation Booked Successfully!",
      description: `Your consultation with ${booking.expertName} has been scheduled for ${booking.scheduledDate} at ${booking.scheduledTime}.`,
      duration: 5000,
    });

    // Refresh history to show new booking
    setHistoryRefreshTrigger(prev => prev + 1);
    
    // Switch to history tab to show the new booking
    setActiveTab('history');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 glass rounded-lg">
            <Phone className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-strong">Expert Consultation</h1>
            <p className="text-enhanced text-overlay">Connect with verified agricultural experts for personalized guidance</p>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="glass-ultra">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-strong">Verified Experts</h3>
              <p className="text-sm text-enhanced">Connect with certified agricultural professionals</p>
            </CardContent>
          </Card>
          
          <Card className="glass-ultra">
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-strong">Multiple Methods</h3>
              <p className="text-sm text-enhanced">Video, audio, chat, or in-person consultations</p>
            </CardContent>
          </Card>
          
          <Card className="glass-ultra">
            <CardContent className="p-4 text-center">
              <History className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-strong">Track History</h3>
              <p className="text-sm text-enhanced">Keep records of all your consultations</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={(value: 'experts' | 'history') => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-2 mb-8 glass-medium">
          <TabsTrigger value="experts" className="flex items-center gap-2 text-enhanced">
            <Users className="h-4 w-4" />
            Find Experts
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2 text-enhanced">
            <History className="h-4 w-4" />
            My Consultations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experts" className="space-y-6">
          <ExpertList onBookExpert={handleBookExpert} />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <ConsultationHistory refreshTrigger={historyRefreshTrigger} />
        </TabsContent>
      </Tabs>

      {/* Booking Modal */}
      <BookingModal
        expert={selectedExpert}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default ExpertConsultation;