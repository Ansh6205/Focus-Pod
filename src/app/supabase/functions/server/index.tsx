import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Sign up endpoint
app.post('/make-server-36dd771d/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log('Signup error during user creation:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store user profile in KV
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      name,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      user: { id: authData.user.id, email, name } 
    });
  } catch (error) {
    console.log('Signup error in server:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Sign in endpoint (handled by Supabase client directly)

// Get user bookings
app.get('/make-server-36dd771d/bookings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      console.log('Authorization error while fetching bookings:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user's booking IDs
    const userBookingIds = await kv.get(`bookings:user:${user.id}`) || [];
    
    // Get all booking details
    const bookings = await Promise.all(
      userBookingIds.map(async (id: string) => {
        const booking = await kv.get(`booking:${id}`);
        return booking ? { id, ...booking } : null;
      })
    );

    return c.json({ bookings: bookings.filter(Boolean) });
  } catch (error) {
    console.log('Error fetching bookings:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Create booking
app.post('/make-server-36dd771d/bookings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      console.log('Authorization error while creating booking:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { date, timeSlot, podNumber, duration } = await c.req.json();

    // Check if the slot is available
    const dateBookings = await kv.get(`bookings:date:${date}`) || [];
    const slotTaken = dateBookings.some((booking: any) => 
      booking.podNumber === podNumber && booking.timeSlot === timeSlot
    );

    if (slotTaken) {
      return c.json({ error: 'This slot is already booked' }, 400);
    }

    // Create booking
    const bookingId = `${user.id}_${Date.now()}`;
    const booking = {
      userId: user.id,
      date,
      timeSlot,
      podNumber,
      duration,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    await kv.set(`booking:${bookingId}`, booking);

    // Update user's bookings
    const userBookings = await kv.get(`bookings:user:${user.id}`) || [];
    userBookings.push(bookingId);
    await kv.set(`bookings:user:${user.id}`, userBookings);

    // Update date's bookings
    dateBookings.push({ bookingId, ...booking });
    await kv.set(`bookings:date:${date}`, dateBookings);

    return c.json({ 
      success: true, 
      booking: { id: bookingId, ...booking } 
    });
  } catch (error) {
    console.log('Error creating booking:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get availability for a specific date
app.get('/make-server-36dd771d/availability', async (c) => {
  try {
    const date = c.req.query('date');
    if (!date) {
      return c.json({ error: 'Date parameter is required' }, 400);
    }

    const dateBookings = await kv.get(`bookings:date:${date}`) || [];
    
    // Define available pods and time slots
    const totalPods = 10; // FocusPod has 10 booths
    const timeSlots = [
      '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00',
      '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
      '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
      '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'
    ];

    const availability = timeSlots.map(slot => {
      const bookedPods = dateBookings
        .filter((b: any) => b.timeSlot === slot)
        .map((b: any) => b.podNumber);
      
      return {
        timeSlot: slot,
        availablePods: totalPods - bookedPods.length,
        bookedPods
      };
    });

    return c.json({ availability });
  } catch (error) {
    console.log('Error fetching availability:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Cancel booking
app.delete('/make-server-36dd771d/bookings/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      console.log('Authorization error while canceling booking:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const bookingId = c.req.param('id');
    const booking = await kv.get(`booking:${bookingId}`);

    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    if (booking.userId !== user.id) {
      return c.json({ error: 'Unauthorized to cancel this booking' }, 403);
    }

    // Update booking status
    booking.status = 'cancelled';
    await kv.set(`booking:${bookingId}`, booking);

    return c.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.log('Error canceling booking:', error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
