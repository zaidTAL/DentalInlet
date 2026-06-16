import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2';
import { IoSendOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { LuUser } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { sendContactMessage, resetContactStatus } from '../store/slices/contactSlice';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.contact);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(sendContactMessage(data)).unwrap();
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
      dispatch(resetContactStatus());
    } catch (err) {
      toast.error(err || 'Failed to send message. Please try again.');
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>Contact Us | Dental Inlet — Corpus Christi Dental Clinic</title>
        <meta name="description" content="Get in touch with Dental Inlet. Call (361) 855-2211, email info@dentalinlet.com, or visit our clinic in Corpus Christi, TX. We're here to help." />
        <meta property="og:title" content="Contact Dental Inlet | Get in Touch" />
        <meta property="og:description" content="Have questions? Contact Dental Inlet in Corpus Christi, TX by phone, email, or visit us. We look forward to caring for your smile." />
      </Helmet>
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-brand-teal mb-8 tracking-tight">
              Get in <span className="italic text-brand-blue font-normal font-serif">touch.</span>
            </h1>
            <p className="text-xl text-secondary-dark/60 max-w-2xl leading-relaxed font-light">
              Have questions or ready to book? We're here to help. Reach out via phone, email, or the contact form below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-brand-teal mb-8 tracking-tight">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <HiOutlineMapPin className="text-brand-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal mb-1">Our Location</h4>
                    <p className="text-sm text-secondary-dark/50 leading-relaxed">
                      5792 Weber Rd,<br />
                      Corpus Christi, TX 78413
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <HiOutlinePhone className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal mb-1">Phone Number</h4>
                    <p className="text-sm text-secondary-dark/50 leading-relaxed">(361) 878-5628</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <HiOutlineEnvelope className="text-brand-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal mb-1">Email Address</h4>
                    <p className="text-sm text-secondary-dark/50 leading-relaxed">info@dentalinlet.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-brand-teal mb-8 tracking-tight">Clinic Hours</h3>
              <div className="space-y-4">
                {[
                  { day: 'Monday - Friday', hours: '09:00 AM - 05:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM - 03:00 PM' },
                  { day: 'Sunday', hours: 'Closed' }
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-center pb-4 border-b border-black/5">
                    <span className="text-sm font-medium text-secondary-dark/70">{item.day}</span>
                    <span className="text-sm font-bold text-brand-teal">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-secondary-light p-10 md:p-14 rounded-[3rem] border border-black/5 shadow-sm">
            <h3 className="text-2xl font-bold text-brand-teal mb-8 tracking-tight">Send us a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                  <LuUser size={14} /> Name
                </label>
                <input
                  {...register('name')}
                  className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-blue/20 focus:outline-none transition-all text-sm"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-[0.6rem] font-bold">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                  <HiOutlineEnvelope size={14} /> Email
                </label>
                <input
                  {...register('email')}
                  className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-blue/20 focus:outline-none transition-all text-sm"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-[0.6rem] font-bold">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-secondary-dark/40 flex items-center gap-2">
                 Message
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-blue/20 focus:outline-none transition-all text-sm resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-red-500 text-[0.6rem] font-bold">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-teal text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-blue transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <IoSendOutline size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="h-[500px] w-full bg-secondary-light relative overflow-hidden border-t border-black/5">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2357495501806!2d-97.4053338!3d27.7100065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8668f571fb557a39%3A0x75d8086ea8da81a7!2s5792%20Weber%20Rd%2C%20Corpus%20Christi%2C%20TX%2078413%2C%20USA!5e0!3m2!1sen!2s!4v1780395794697!5m2!1sen!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Dental Inlet Location"
        />
      </section>
    </AnimatedPage>
  );
};

export default Contact;
