import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, submitReview } from '../store/slices/reviewsSlice';
import AnimatedPage from '../components/AnimatedPage';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { HiOutlineEnvelope, HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { IoSendOutline } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import { motion } from 'framer-motion';

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review too long'),
});

const Reviews = () => {
  const dispatch = useDispatch();
  const { items: reviews, status } = useSelector((state) => state.reviews);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  });

  const rating = watch('rating');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReviews());
    }
  }, [dispatch, status]);

  const onSubmit = async (data) => {
    try {
      await dispatch(submitReview(data)).unwrap();
      toast.success('Review submitted! It will appear once verified.');
      reset();
    } catch (err) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>Patient Reviews | Dental Inlet — Corpus Christi's Top-Rated Dentist</title>
        <meta name="description" content="Read real patient reviews of Dental Inlet in Corpus Christi, TX. See why our community rates us 4.9★ and leaves their smile in our hands." />
        <meta property="og:title" content="Patient Reviews | Dental Inlet" />
        <meta property="og:description" content="See what our patients say about Dental Inlet. Share your own experience and help others find their trusted Corpus Christi dentist." />
      </Helmet>
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-brand-teal mb-8 tracking-tight">
              Patient <span className="italic text-brand-blue font-normal font-serif">Reviews.</span>
            </h1>
            <p className="text-xl text-secondary-dark/60 max-w-2xl leading-relaxed font-light">
              We take pride in our patient satisfaction. Read what our community has to say about their experience at Dental Inlet.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-8">
            {status === 'loading' ? (
              [1, 2, 3].map(i => <div key={i} className="h-64 bg-secondary-light rounded-3xl animate-pulse" />)
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-3xl border border-black/5 bg-secondary-light/30"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        size={16} 
                        className={i < review.rating ? "text-brand-orange" : "text-black/10"} 
                      />
                    ))}
                  </div>
                  <p className="text-lg text-secondary-dark/70 italic mb-8 font-light leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between border-t border-black/5 pt-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue uppercase text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-bold text-brand-teal tracking-tight">{review.name}</span>
                    </div>
                    <span className="text-xs text-secondary-dark/30 uppercase tracking-widest font-bold">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-secondary-light rounded-3xl">
                <p className="text-secondary-dark/40 italic">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-brand-teal p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16" />
              
              <h3 className="text-3xl font-black mb-2 tracking-tight">Leave a Review</h3>
              <p className="text-white/60 text-sm mb-8 font-light leading-relaxed">Your feedback helps us improve and helps others choose their dentist with confidence.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setValue('rating', star)}
                        className="transition-transform active:scale-90"
                      >
                        <FaStar 
                          size={24} 
                          className={star <= rating ? "text-brand-orange" : "text-white/20"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <LuUser size={12} /> Name
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-all text-sm"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-300 text-[0.6rem] font-bold">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <HiOutlineEnvelope size={12} /> Email
                  </label>
                  <input
                    {...register('email')}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-all text-sm"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-300 text-[0.6rem] font-bold">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <HiOutlineChatBubbleBottomCenterText size={12} /> Your Review
                  </label>
                  <textarea
                    {...register('text')}
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-all text-sm resize-none"
                    placeholder="Share your experience..."
                  />
                  {errors.text && <p className="text-red-300 text-[0.6rem] font-bold">{errors.text.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  <IoSendOutline size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Reviews;
