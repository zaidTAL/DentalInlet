import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import axios from 'axios';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineUser, HiOutlineCalendar, HiOutlineChatBubbleLeftRight, HiOutlineXCircle } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const DoctorPortal = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/bookings/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Booking ${status} successfully`);
      fetchBookings(); // Refresh list
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>Doctor Portal | Dental Inlet</title>
        <meta name="description" content="Doctor portal for Dental Inlet. Manage patient appointments and confirmations securely." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="pt-40 pb-32 bg-secondary-light min-h-screen font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-brand-teal mb-4 tracking-tight">Doctor Portal</h1>
              <p className="text-secondary-dark/50 uppercase tracking-widest font-bold text-xs">Manage patient appointments & confirmations</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-black/5">
              <span className="text-brand-blue font-bold">{bookings.length}</span> <span className="text-secondary-dark/40 text-sm">Total Requests</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence>
                {bookings.map((booking) => (
                  <motion.div 
                    key={booking._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-black/5 flex flex-col lg:flex-row justify-between items-center gap-8 group hover:shadow-xl transition-all duration-500"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 flex-grow w-full">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                          <HiOutlineUser className="text-brand-blue" />
                        </div>
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest font-bold text-secondary-dark/30 mb-1">Patient</p>
                          <p className="font-bold text-brand-teal leading-tight">{booking.name}</p>
                          <p className="text-xs text-secondary-dark/50">{booking.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                          <HiOutlineCalendar className="text-brand-orange" />
                        </div>
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest font-bold text-secondary-dark/30 mb-1">Appointment</p>
                          <p className="font-bold text-brand-teal leading-tight">{new Date(booking.date).toLocaleDateString()}</p>
                          <p className="text-xs text-secondary-dark/50">{booking.time} — {booking.serviceName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 lg:col-span-1">
                        <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center flex-shrink-0">
                          <HiOutlineChatBubbleLeftRight className="text-secondary-dark/40" />
                        </div>
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest font-bold text-secondary-dark/30 mb-1">Notes</p>
                          <p className="text-xs text-secondary-dark/60 leading-relaxed italic">
                            {booking.explanation || 'No notes provided'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center lg:justify-end">
                        <span className={`px-4 py-1.5 rounded-full text-[0.6rem] font-black uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-black/5 pt-6 lg:pt-0 lg:pl-8">
                      {booking.status === 'pending' && (
                        <button 
                          onClick={() => updateStatus(booking._id, 'confirmed')}
                          className="flex-grow lg:flex-none bg-brand-teal text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-blue transition-all flex items-center justify-center gap-2"
                        >
                          <HiOutlineCheckCircle size={18} /> Confirm
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => updateStatus(booking._id, 'completed')}
                          className="flex-grow lg:flex-none bg-brand-orange text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-teal transition-all flex items-center justify-center gap-2"
                        >
                          <HiOutlineCheckCircle size={18} /> Mark Done
                        </button>
                      )}
                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <button 
                          onClick={() => updateStatus(booking._id, 'cancelled')}
                          className="w-12 h-12 rounded-2xl border border-red-100 text-red-400 hover:bg-red-50 transition-all flex items-center justify-center"
                        >
                          <HiOutlineXCircle size={24} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="bg-white p-20 rounded-[3rem] text-center border border-black/5">
              <p className="text-secondary-dark/30 font-serif italic text-2xl tracking-tight">No appointment requests yet.</p>
            </div>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default DoctorPortal;
