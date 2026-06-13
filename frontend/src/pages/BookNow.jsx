import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, resetBookingStatus } from '../store/slices/bookingsSlice';
import AnimatedPage from '../components/AnimatedPage';
import { toast } from 'react-toastify';
import { HiOutlineCalendar, HiOutlineClock, HiOutlinePhone, HiOutlineEnvelope, HiOutlineChevronRight } from 'react-icons/hi2';
import { LuUser, LuMessageSquare } from 'react-icons/lu';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  serviceName: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  explanation: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

const BookNow = () => {
  const dispatch = useDispatch();
  const { items: services } = useSelector((state) => state.services);
  const { status: bookingStatus, error: bookingError } = useSelector((state) => state.bookings);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (bookingStatus === 'succeeded') {
      toast.success('Appointment requested successfully! We will contact you soon.');
      reset();
      dispatch(resetBookingStatus());
    }
    if (bookingStatus === 'failed') {
      toast.error(bookingError || 'Something went wrong. Please try again.');
      dispatch(resetBookingStatus());
    }
  }, [bookingStatus, bookingError, reset, dispatch]);

  const onSubmit = (data) => {
    dispatch(createBooking(data));
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>Book an Appointment | Dental Inlet — Corpus Christi Dentist</title>
        <meta name="description" content="Schedule your dental appointment online at Dental Inlet in Corpus Christi, TX. Choose your service, date, and time — we'll confirm within 24 hours." />
        <meta property="og:title" content="Book a Dental Visit | Dental Inlet" />
        <meta property="og:description" content="Request your appointment at Dental Inlet online. Easy scheduling, same-day availability, and expert care from Dr. Ans Ahmad." />
      </Helmet>
      <section className="pt-40 pb-32 bg-secondary-light min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-brand-teal mb-8 tracking-tight leading-[0.9]">
              Book your <span className="italic text-brand-blue font-normal font-serif">visit.</span>
            </h1>
            <p className="text-xl text-secondary-dark/60 max-w-md leading-relaxed font-light mb-12">
              Ready to start your journey to a better smile? Fill out the form, and our team will get back to you.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineCalendar className="text-brand-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-teal mb-1">Easy Scheduling</h4>
                  <p className="text-sm text-secondary-dark/50 leading-relaxed">Choose a date that works for you. We offer flexible morning and evening slots.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineClock className="text-brand-orange" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-teal mb-1">Same-Day Availability</h4>
                  <p className="text-sm text-secondary-dark/50 leading-relaxed">Emergency? We hold slots daily for urgent care. Call us directly for immediate help.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                    <LuUser size={14} /> Full Name
                  </label>
                  <input
                    {...register('name')}
                    className={`w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 focus:outline-none transition-all ${
                      errors.name ? 'border-red-100' : 'border-transparent focus:border-brand-blue/20'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-[0.7rem] font-bold">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                    <HiOutlineEnvelope size={14} /> Email
                  </label>
                  <input
                    {...register('email')}
                    className={`w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 focus:outline-none transition-all ${
                      errors.email ? 'border-red-100' : 'border-transparent focus:border-brand-blue/20'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-[0.7rem] font-bold">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                    <HiOutlinePhone size={14} /> Phone
                  </label>
                  <input
                    {...register('phone')}
                    className={`w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 focus:outline-none transition-all ${
                      errors.phone ? 'border-red-100' : 'border-transparent focus:border-brand-blue/20'
                    }`}
                    placeholder="(512) 000-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-[0.7rem] font-bold">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                    <HiOutlineChevronRight size={14} /> Service
                  </label>
                  <select
                    {...register('serviceName')}
                    className={`w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 focus:outline-none transition-all appearance-none ${
                      errors.serviceName ? 'border-red-100' : 'border-transparent focus:border-brand-blue/20'
                    }`}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    <option value="Others">Others</option>
                  </select>
                  {errors.serviceName && <p className="text-red-500 text-[0.7rem] font-bold">{errors.serviceName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                    <HiOutlineCalendar size={14} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 focus:outline-none transition-all ${
                      errors.date ? 'border-red-100' : 'border-transparent focus:border-brand-blue/20'
                    }`}
                  />
                  {errors.date && <p className="text-red-500 text-[0.7rem] font-bold">{errors.date.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                    <HiOutlineClock size={14} /> Preferred Time
                  </label>
                  <select
                    {...register('time')}
                    className={`w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 focus:outline-none transition-all appearance-none ${
                      errors.time ? 'border-red-100' : 'border-transparent focus:border-brand-blue/20'
                    }`}
                  >
                    <option value="">Select a time</option>
                    {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-500 text-[0.7rem] font-bold">{errors.time.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                  <LuMessageSquare size={14} /> Notes (Optional)
                </label>
                <textarea
                  {...register('explanation')}
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl bg-secondary-light border-2 border-transparent focus:border-brand-blue/20 focus:outline-none transition-all resize-none"
                  placeholder="Tell us about your concern..."
                />
                {errors.explanation && <p className="text-red-500 text-[0.7rem] font-bold">{errors.explanation.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || bookingStatus === 'loading'}
                className="w-full bg-brand-teal text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-blue transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting || bookingStatus === 'loading' ? 'Requesting...' : 'Request Appointment'}
                <HiOutlineChevronRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default BookNow;
