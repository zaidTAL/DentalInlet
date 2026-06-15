import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { fetchReviews } from '../store/slices/reviewsSlice';
import { checkEmail, loginDoctor } from '../store/slices/authSlice';
import AnimatedPage from '../components/AnimatedPage';
import ServiceCard from '../components/ServiceCard';
import Counter from '../components/Counter';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import drAnsImage from '/src/assets/drAns.jpeg';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: services } = useSelector((state) => state.services);
  const { items: reviews, status: reviewsStatus } = useSelector((state) => state.reviews);
  const { doctorAccountExists } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (reviewsStatus === 'idle') {
      dispatch(fetchReviews());
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (titleRef.current) {
      tl.fromTo(titleRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5 }
      );
    }

    if (descRef.current) {
      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );
    }
  }, [dispatch, reviewsStatus]);

  const handleCtaAction = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email');
      return;
    }

    const res = await dispatch(checkEmail(email)).unwrap();
    if (res.isDoctor) {
      setShowPassword(true);
      toast.info('Doctor access detected. Please enter password.');
    } else {
      navigate('/book-now');
    }
  };

  const handleDoctorAuth = async (e) => {
    e.preventDefault();
    try {
      if (doctorAccountExists) {
        await dispatch(loginDoctor({ email, password })).unwrap();
        toast.success('Welcome back, Dr. Ans!');
      }
      navigate('/doctor-portal');
    } catch (err) {
      toast.error('Authentication failed');
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>Dental Inlet | Corpus Christi's Premier Dental Practice</title>
        <meta name="description" content="Modern dentistry designed around you. Calm, clear, and honest care for every stage of life. Book your free consultation in Corpus Christi today." />
        <meta property="og:title" content="Dental Inlet | Where Great Smiles Begin" />
        <meta property="og:description" content="Corpus Christi's most human dental experience. Expert care, advanced technology, and a commitment to your comfort." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-secondary-light" ref={heroRef}>
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-brand-blue rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-orange rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="max-w-4xl">

            <h1 className="text-6xl md:text-9xl font-black text-brand-teal leading-[0.9] mb-10 tracking-tight" ref={titleRef}>
              <div className="overflow-hidden">Your best</div>
              <div className="overflow-hidden italic font-normal text-brand-blue">smile</div>
              <div className="overflow-hidden">starts here.</div>
            </h1>

            <p className="text-xl md:text-2xl text-secondary-dark/60 max-w-2xl mb-12 leading-relaxed font-light" ref={descRef}>
              Modern dentistry designed around you — not the other way around. Calm, clear, and honest care for every stage of life.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center" ref={ctaRef}>
              <Link
                to="/book-now"
                className="group bg-brand-teal text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-blue transition-all flex items-center gap-3 shadow-xl hover:shadow-brand-blue/20"
              >
                Book Consultation
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="text-brand-teal font-bold uppercase tracking-widest border-b-2 border-brand-teal/20 hover:border-brand-teal transition-all pb-1"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4">
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-secondary-dark/40 font-bold">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-blue to-transparent relative overflow-hidden">
            <motion.div animate={{ y: [0, 64, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-1/2 bg-white" />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-brand-teal py-8 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {['Dental Cleaning', 'Invisible Braces', 'Veneers / Dental Jewellery', 'Dentures', 'Dental Implants', 'Teeth Whitening', 'Wisdom Teeth Extraction', 'Laughing Gas Sedation', 'Emergency'].map((service) => (
                <div key={service} className="flex items-center gap-12">
                  <span className="text-white/20 font-serif italic text-2xl font-bold">{service}</span>
                  <div className="w-2 h-2 rounded-full bg-brand-orange" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl font-black text-brand-teal mb-20 tracking-tight">
              Everything your smile <span className="italic text-brand-blue font-normal">needs.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.slice(0, 6).map((service, index) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
          <div className="mt-20">
            <Link to="/services" className="inline-flex items-center gap-2 text-brand-teal font-bold uppercase tracking-widest border-2 border-brand-teal px-10 py-4 rounded-full hover:bg-brand-teal hover:text-white transition-all">
              View All Services <HiOutlineArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      {/* <section className="bg-brand-teal py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border border-white/10 rounded-[2rem] p-12 bg-white/5 backdrop-blur-sm">
            <div className="text-center">
              <span className="block text-4xl md:text-6xl font-serif font-bold text-brand-orange mb-2"><Counter target={2400} suffix="+" /></span>
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold">Happy Patients</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-6xl font-serif font-bold text-brand-orange mb-2"><Counter target={18} /></span>
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold">Years in Practice</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-6xl font-serif font-bold text-brand-orange mb-2">4.9★</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold">Google Rating</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-6xl font-serif font-bold text-brand-orange mb-2"><Counter target={98} suffix="%" /></span>
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold">Recommend Us</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* About Snippet */}
      <section className="py-32 bg-secondary-light" id="about">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-brand-teal/10 border border-black/5 relative group">
              <img src={drAnsImage} alt="Dr. Ans Ahmad" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-4 text-brand-orange uppercase tracking-widest font-bold text-xs mb-8"><div className="w-8 h-[1px] bg-brand-orange md:text-base" />Meet Dr. Ans Ahmad</div>
            <div className="font-bold text-secondary-dark/60 text-sm md:text-base mb-4" >UCLA School of dentistry</div>
            <div className="font-bold text-secondary-dark/60 text-sm mb-4 md:text-base" >Los Angeles, California</div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-teal mb-8 tracking-tight">Dentistry that<br />feels <span className="italic text-brand-blue font-normal">human.</span></h2>
            <p className="text-lg text-secondary-dark/60 mb-10 leading-relaxed font-light">
              Dr. Ans Ahmad built Dental Inlet around one conviction — that a good dentist changes how you feel walking out, not just what your teeth look like.
            </p>
            <div className="flex flex-wrap gap-4">
              {['DDS — UCLA', 'ADA Member'].map(tag => <span key={tag} className="px-5 py-2 rounded-full border border-black/5 bg-white text-xs font-bold text-secondary-dark/40 uppercase tracking-widest">{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-brand-teal text-white" id="reviews">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-flex items-center gap-4 text-brand-orange uppercase tracking-widest font-bold text-xs mb-8">
            <div className="w-8 h-[1px] bg-brand-orange" /> Patient Reviews
          </div>
          <div className="max-w-4xl mb-20">
            <h2 className="text-2xl md:text-4xl font-black mb-12 tracking-tight italic font-serif text-white/90 leading-tight">
              "I love this Dentist office. Dr Ahmad is so down to earth and goes above and beyond to make sure any dental work is nothing less than perfect. And the staff is so friendly and helpful. I will never go to any other dentist office but Dental Inlet"
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center font-serif italic text-brand-blue text-xl font-bold">MS</div>
              <div>
                <p className="font-bold tracking-tight">Elizabeth Barton.</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Google Review</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-20">
            {reviewsStatus === 'succeeded' && reviews.slice(0, 2).map((review) => (
              <div key={review._id} className="p-10 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} size={14} fill="var(--brand-orange)" className="text-brand-orange" />)}
                </div>
                <p className="text-lg italic text-white/70 mb-8 font-light leading-relaxed">"{review.text}"</p>
                <p className="text-sm font-bold text-white/40 tracking-tight"><span className="text-white/80">{review.name}</span></p>
              </div>
            ))}
          </div>
          {/* view all reviews */}
          <div className="mt-20">
            <Link to="/ratings-reviews" className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest border-2 border-brand-orange px-10 py-4 rounded-full hover:bg-brand-orange hover:text-white transition-all">
              View All Reviews <HiOutlineArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-brand-orange relative overflow-hidden" id="book">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-black text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">SMILE</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">Ready for a<br />better smile?</h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            {showPassword ? 'Secure Doctor Portal Access' : `EXAM AND XRAYS 69$ ONLY. WE ACCEPT MOST INRURANCES. WE ALSO OFFER PAYMENT PLANS.`}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={showPassword}
              placeholder="Your email address"
              className="w-full px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-all min-w-[250px] disabled:opacity-50"
            />
            <AnimatePresence>
              {showPassword && (
                <motion.input initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter secret key" className="w-full px-8 py-5 rounded-full bg-white text-brand-orange placeholder:text-brand-orange/50 focus:outline-none transition-all min-w-[200px]" />
              )}
            </AnimatePresence>
            <button onClick={showPassword ? handleDoctorAuth : handleCtaAction} className="w-full sm:w-auto bg-white text-brand-orange px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all shadow-xl whitespace-nowrap">
              {showPassword ? 'Unlock Portal' : 'Book Now'}
            </button>
          </form>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Home;
