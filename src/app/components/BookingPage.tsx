import { useState, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { safeFetch } from '../utils/safeFetch';

interface BookingPageProps {
  user: any;
  accessToken: string | null;
  onAuthClick: () => void;
}

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  podNumber: number;
  duration: number;
  status: string;
}

export function BookingPage({ user, accessToken, onAuthClick }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [availability, setAvailability] = useState<any[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoBookings, setDemoBookings] = useState<Booking[]>([]);

  const durations = [
    { value: 1, label: '1 hour', price: 100 },
    { value: 2, label: '2 hours', price: 200 },
    { value: 3, label: '3 hours', price: 300 },
    { value: 4, label: '4 hours', price: 400 },
    { value: 6, label: '6 hours', price: 600 },
    { value: 8, label: '8 hours', price: 800 }
  ];

  const fetchAvailability = useCallback(async () => {
    setLoading(true);
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    const response = await safeFetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36dd771d/availability?date=${dateStr}`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );

    // If response is null or not ok, use demo data
    if (!response || !response.ok) {
      // Generate time slots
      const timeSlots = [
        '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00',
        '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
        '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
        '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'
      ];
      
      // Filter demo bookings for selected date
      const bookingsForDate = demoBookings.filter(b => b.date === dateStr);
      
      // Generate mock availability considering demo bookings
      const mockAvailability = timeSlots.map(slot => {
        const slotBookings = bookingsForDate.filter(b => b.timeSlot === slot);
        const bookedPods = slotBookings.map(b => b.podNumber);
        
        // Add some random bookings for realism
        const randomBookedCount = Math.floor(Math.random() * 3);
        for (let i = 0; i < randomBookedCount; i++) {
          const randomPod = Math.floor(Math.random() * 10) + 1;
          if (!bookedPods.includes(randomPod)) {
            bookedPods.push(randomPod);
          }
        }
        
        return {
          timeSlot: slot,
          availablePods: 10 - bookedPods.length,
          bookedPods: bookedPods
        };
      });
      
      setAvailability(mockAvailability);
      
      // Only show toast once when entering demo mode
      if (!isDemoMode) {
        toast.info('Demo Mode: You can make test bookings that work locally');
        setIsDemoMode(true);
      }
      setLoading(false);
      return;
    }

    try {
      const data = await response.json();
      setAvailability(data.availability || []);
      setIsDemoMode(false);
    } catch (error) {
      // JSON parse error - use demo data
      setAvailability([]);
    }
    
    setLoading(false);
  }, [selectedDate, demoBookings, isDemoMode]);

  const fetchMyBookings = useCallback(async () => {
    // If in demo mode, show demo bookings
    if (isDemoMode) {
      setMyBookings(demoBookings);
      return;
    }

    if (!accessToken) {
      setMyBookings([]);
      return;
    }

    const response = await safeFetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36dd771d/bookings`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response || !response.ok) {
      // In demo mode, show demo bookings
      setMyBookings(demoBookings);
      return;
    }

    try {
      const data = await response.json();
      setMyBookings(data.bookings || []);
    } catch (error) {
      setMyBookings(demoBookings);
    }
  }, [isDemoMode, demoBookings, accessToken]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  useEffect(() => {
    if (user && accessToken) {
      fetchMyBookings();
    }
  }, [user, accessToken, fetchMyBookings]);

  const handleBooking = async () => {
    if (!user) {
      onAuthClick();
      return;
    }

    if (!selectedTimeSlot) {
      toast.error('Please select a time slot');
      return;
    }

    setBookingLoading(true);
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Find available pod for the selected time slot
    const slotAvailability = availability.find(a => a.timeSlot === selectedTimeSlot);
    const availablePodNumber = slotAvailability 
      ? Array.from({ length: 10 }, (_, i) => i + 1).find(
          num => !slotAvailability.bookedPods.includes(num)
        ) || 1
      : 1;

    // If in demo mode, create local booking
    if (isDemoMode) {
      // Create demo booking
      const newBooking: Booking = {
        id: `demo-${Date.now()}`,
        date: dateStr,
        timeSlot: selectedTimeSlot,
        podNumber: availablePodNumber,
        duration: selectedDuration,
        status: 'confirmed'
      };
      
      setDemoBookings([...demoBookings, newBooking]);
      toast.success('Demo booking created! (This is a local test booking)');
      setSelectedTimeSlot('');
      
      // Refresh availability to reflect new booking
      setTimeout(() => {
        fetchAvailability();
      }, 100);
      
      setBookingLoading(false);
      return;
    }

    // Try real backend booking
    const response = await safeFetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36dd771d/bookings`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: dateStr,
          timeSlot: selectedTimeSlot,
          podNumber: availablePodNumber,
          duration: selectedDuration
        })
      }
    );

    if (!response || !response.ok) {
      toast.error('Failed to create booking. Backend unavailable.');
      setBookingLoading(false);
      return;
    }

    try {
      const data = await response.json();
      toast.success('Booking confirmed! Check your bookings below.');
      setSelectedTimeSlot('');
      fetchAvailability();
      fetchMyBookings();
    } catch (error: any) {
      toast.error('Failed to process booking response.');
    } finally {
      setBookingLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    // If demo booking, remove from local state
    if (bookingId.startsWith('demo-')) {
      setDemoBookings(demoBookings.filter(b => b.id !== bookingId));
      toast.success('Demo booking cancelled');
      fetchAvailability();
      return;
    }

    const response = await safeFetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36dd771d/bookings/${bookingId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response || !response.ok) {
      toast.error('Failed to cancel booking. Backend unavailable.');
      return;
    }

    toast.success('Booking cancelled successfully');
    fetchMyBookings();
    fetchAvailability();
  };

  const selectedDurationData = durations.find(d => d.value === selectedDuration);

  return (
    <div className="min-h-screen bg-black">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-blue-600/20 border-b border-blue-500/30 py-3 px-4">
          <div className="container mx-auto">
            <p className="text-blue-300 text-sm text-center">
              ✨ <strong>Demo Mode Active:</strong> You can make test bookings that work locally. Your bookings are stored in your browser and will be cleared on refresh. Connect Supabase for persistent, real-time bookings.
            </p>
          </div>
        </div>
      )}
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your FocusPod</h1>
            <p className="text-xl text-teal-100">
              Select your preferred date and time slot to reserve your productivity zone
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left: Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-teal-400" />
                <h2 className="text-2xl font-bold text-white">Select Date</h2>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border border-gray-800"
              />
            </div>

            {/* Duration Selection */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-teal-400" />
                <h2 className="text-2xl font-bold text-white">Select Duration</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {durations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedDuration === duration.value
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-gray-700 hover:border-teal-400 bg-gray-800/50'
                    }`}
                  >
                    <div className="font-semibold text-white">{duration.label}</div>
                    <div className="text-sm text-gray-400">₹{duration.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-teal-400" />
                <h2 className="text-2xl font-bold text-white">Available Time Slots</h2>
              </div>
              
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading availability...</div>
              ) : availability.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No slots available</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availability.map((slot) => (
                    <button
                      key={slot.timeSlot}
                      onClick={() => slot.availablePods > 0 && setSelectedTimeSlot(slot.timeSlot)}
                      disabled={slot.availablePods === 0}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTimeSlot === slot.timeSlot
                          ? 'border-teal-500 bg-teal-500/10'
                          : slot.availablePods === 0
                          ? 'border-gray-700 bg-gray-800/30 cursor-not-allowed opacity-50'
                          : 'border-gray-700 hover:border-teal-400 bg-gray-800/50'
                      }`}
                    >
                      <div className="font-semibold text-sm text-white">{slot.timeSlot}</div>
                      <div className="text-xs text-gray-400">
                        {slot.availablePods > 0 
                          ? `${slot.availablePods} pod${slot.availablePods > 1 ? 's' : ''}`
                          : 'Full'
                        }
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Button */}
            {user && (
              <Button
                onClick={handleBooking}
                disabled={!selectedTimeSlot || bookingLoading}
                size="lg"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                {bookingLoading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            )}

            {!user && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2 text-white">Login Required</h3>
                <p className="text-gray-300 mb-4">Please login or create an account to book a pod</p>
                <Button onClick={onAuthClick} className="bg-teal-600 hover:bg-teal-700 text-white">Login / Register</Button>
              </div>
            )}
          </div>

          {/* Right: Booking Summary & My Bookings */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="font-bold text-xl mb-4 text-white">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold ml-auto text-white">
                    {selectedDate.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Time:</span>
                  <span className="font-semibold ml-auto text-white">
                    {selectedTimeSlot || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-semibold ml-auto text-white">
                    {selectedDuration} hour{selectedDuration > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Total Amount:</span>
                  <span className="text-2xl font-bold text-teal-400">
                    ₹{selectedDurationData?.price || 0}
                  </span>
                </div>
                <p className="text-xs text-gray-500">All amenities included</p>
              </div>
            </div>

            {/* My Bookings */}
            {user && myBookings.length > 0 && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-xl mb-4 text-white">My Bookings</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {myBookings.filter(b => b.status === 'confirmed').map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-700 rounded-lg p-4 bg-gray-800/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="font-semibold text-sm text-white">Pod #{booking.podNumber}</span>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>{booking.date}</div>
                        <div>{booking.timeSlot}</div>
                        <div>{booking.duration} hour{booking.duration > 1 ? 's' : ''}</div>
                      </div>
                      <Button
                        onClick={() => cancelBooking(booking.id)}
                        variant="outline"
                        size="sm"
                        className="w-full mt-3 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}