import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Star, Clock, MapPin, Video, Phone, MessageCircle, User, Search, Filter } from 'lucide-react';
import { Expert } from '@/types/expertConsultation.types';
import { expertConsultationAPI } from '@/services/expertConsultation.api';

interface ExpertListProps {
  onBookExpert: (expert: Expert) => void;
}

const ExpertList: React.FC<ExpertListProps> = ({ onBookExpert }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'fee' | 'experience'>('rating');

  useEffect(() => {
    fetchExperts();
  }, []);

  useEffect(() => {
    filterAndSortExperts();
  }, [experts, searchTerm, selectedSpecialization, sortBy]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError(null);
      const expertsData = await expertConsultationAPI.getExperts();
      setExperts(expertsData);
    } catch (err) {
      setError('Failed to load experts. Please try again.');
      console.error('Error fetching experts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortExperts = () => {
    let filtered = [...experts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(expert =>
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialization.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        expert.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(expert =>
        expert.specialization.some(spec =>
          spec.toLowerCase().includes(selectedSpecialization.toLowerCase())
        )
      );
    }

    // Sort experts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    setFilteredExperts(filtered);
  };

  const getSpecializations = () => {
    const specs = new Set<string>();
    experts.forEach(expert => {
      expert.specialization.forEach(spec => specs.add(spec));
    });
    return Array.from(specs);
  };

  const renderConsultationMethods = (methods: Expert['consultationMethods']) => {
    return methods.map((method) => {
      const icons = {
        video: <Video className="h-4 w-4" />,
        audio: <Phone className="h-4 w-4" />,
        chat: <MessageCircle className="h-4 w-4" />,
        in_person: <User className="h-4 w-4" />
      };
      
      return (
        <Badge key={method} variant="outline" className="flex items-center gap-1 border-white/20 text-enhanced hover:bg-white/10">
          {icons[method]}
          <span className="capitalize">{method.replace('_', ' ')}</span>
        </Badge>
      );
    });
  };

  const renderExpertCard = (expert: Expert) => (
    <Card key={expert.id} className="h-full glass-ultra hover:glass-medium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={expert.profileImage} alt={expert.name} />
            <AvatarFallback className="text-lg bg-green-100 text-green-600">
              {expert.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg truncate text-strong">{expert.name}</h3>
              {expert.isVerified && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-300">Verified</Badge>
              )}
            </div>
            
            <p className="text-sm text-enhanced text-overlay mb-2">{expert.title}</p>
            
            <div className="flex items-center gap-4 text-sm text-enhanced">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-strong">{expert.rating}</span>
                <span>({expert.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-green-400" />
                <span>{expert.experience} years</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 text-strong">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {expert.specialization.map((spec, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-strong">Consultation Methods</h4>
          <div className="flex flex-wrap gap-2">
            {renderConsultationMethods(expert.consultationMethods)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-enhanced">{expert.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-green-400" />
          <span className="text-sm text-enhanced">{expert.responseTime}</span>
        </div>

        <div className="pt-2 border-t border-white/20">
          <p className="text-sm text-enhanced text-overlay mb-3 line-clamp-2">
            {expert.bio}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-green-400">
              ₹{expert.consultationFee}/session
            </div>
            
            <Button 
              onClick={() => onBookExpert(expert)}
              disabled={!expert.isAvailable}
              className="min-w-[100px] bg-green-600 hover:bg-green-700 text-white border-white/20"
            >
              {expert.isAvailable ? 'Book Now' : 'Unavailable'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 flex-1 glass-medium" />
          <Skeleton className="h-10 w-48 glass-medium" />
          <Skeleton className="h-10 w-32 glass-medium" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-[400px] glass-ultra">
              <CardHeader>
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded-full glass-medium" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4 glass-medium" />
                    <Skeleton className="h-3 w-1/2 glass-medium" />
                    <Skeleton className="h-3 w-2/3 glass-medium" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 glass-medium" />
                <Skeleton className="h-10 glass-medium" />
                <Skeleton className="h-10 glass-medium" />
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
          <Button variant="outline" size="sm" onClick={fetchExperts}>
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
          <h2 className="text-2xl font-bold text-strong">Expert Consultation</h2>
          <p className="text-enhanced text-overlay">
            Connect with verified farming experts for personalized advice
          </p>
        </div>
        <div className="text-sm text-enhanced">
          {filteredExperts.length} of {experts.length} experts
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enhanced" />
          <Input
            placeholder="Search experts by name, specialization, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-medium text-enhanced placeholder:text-enhanced/50 focus:outline-none focus:ring-2 focus:ring-green-400/50"
          />
        </div>
        
        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
          <SelectTrigger className="w-full sm:w-48 glass-medium text-enhanced border-white/20">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent className="glass-ultra">
            <SelectItem value="all">All Specializations</SelectItem>
            {getSpecializations().map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value: 'rating' | 'fee' | 'experience') => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-32 glass-medium text-enhanced border-white/20">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="glass-ultra">
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="fee">Fee</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expert Cards */}
      {filteredExperts.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md glass-ultra p-8 rounded-lg">
            <div className="mx-auto h-12 w-12 text-enhanced mb-4">
              <User className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-strong">No experts found</h3>
            <p className="text-enhanced text-overlay mb-4">
              {searchTerm || selectedSpecialization !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'No experts are currently available.'}
            </p>
            {(searchTerm || selectedSpecialization !== 'all') && (
              <Button 
                variant="outline" 
                className="border-white/20 text-enhanced hover:bg-white/10"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialization('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map(renderExpertCard)}
        </div>
      )}
    </div>
  );
};

export default ExpertList;