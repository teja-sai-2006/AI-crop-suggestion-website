import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Star, MapPin, Phone, Video, MessageCircle, User, Check, X } from 'lucide-react';
import { Expert, ConsultationBooking } from '@/types/expertConsultation.types';
import { expertConsultationAPI } from '@/services/expertConsultation.api';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: ConsultationBooking) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  expert,
  isOpen,
  onClose,
  onBookingSuccess
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    contact: '',
    email: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedMethod('');
    setTopic('');
    setDescription('');
    setUserDetails({ name: '', contact: '', email: '', location: '' });
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      case 'in_person': return <User className="h-4 w-4" />;
      default: return null;
    }
  };

  const validateForm = () => {
    if (!selectedDate) return 'Please select a consultation date.';
    if (!selectedTime) return 'Please select a consultation time.';
    if (!selectedMethod) return 'Please select a consultation method.';
    if (!topic.trim()) return 'Please enter a consultation topic.';
    if (!userDetails.name.trim()) return 'Please enter your name.';
    if (!userDetails.contact.trim()) return 'Please enter your contact information.';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!expert) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const scheduledDate = format(selectedDate!, 'yyyy-MM-dd');
      const scheduledTime = selectedTime;

      const booking = await expertConsultationAPI.bookConsultation(
        expert.id,
        scheduledDate,
        scheduledTime,
        {
          name: userDetails.name,
          phone: userDetails.contact,
          location: userDetails.location,
          topic: topic,
          description: description
        }
      );

      setSuccess('Consultation booked successfully!');
      onBookingSuccess(booking);
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (err) {
      setError('Failed to book consultation. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!expert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={expert.profileImage} alt={expert.name} />
              <AvatarFallback>
                {expert.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold">Book Consultation</div>
              <div className="text-sm text-muted-foreground">with {expert.name}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule your consultation session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Expert Info Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{expert.name}</h3>
              <Badge variant="secondary">{expert.title}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{expert.rating} ({expert.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{expert.location}</span>
              </div>
              <div className="text-green-600 font-medium">
                ₹{expert.consultationFee}/session
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {expert.specialization.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Consultation Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    date < new Date() || date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">Consultation Time *</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeSlots().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Consultation Method */}
          <div className="space-y-2">
            <Label htmlFor="method">Consultation Method *</Label>
            <div className="grid grid-cols-2 gap-2">
              {expert.consultationMethods.map((method) => (
                <Button
                  key={method}
                  variant={selectedMethod === method ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedMethod(method)}
                >
                  {getMethodIcon(method)}
                  <span className="ml-2 capitalize">
                    {method.replace('_', ' ')}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">Consultation Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Crop disease, Soil management, Pest control"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Issue Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your farming issue or questions in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Contact Information</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Phone Number *</Label>
                <Input
                  id="contact"
                  placeholder="Your phone number"
                  value={userDetails.contact}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, contact: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  placeholder="Your city/village"
                  value={userDetails.location}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : `Book Now (₹${expert.consultationFee})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;