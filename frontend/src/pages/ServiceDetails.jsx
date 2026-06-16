import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineChevronRight, HiOutlinePhone } from 'react-icons/hi2';

const ServiceDetails = () => {
  const { slug } = useParams();
  const { items: services } = useSelector((state) => state.services);
  
  // Find service by slug
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <AnimatedPage>
        <Helmet>
          <title>Service Not Found | Dental Inlet</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="pt-40 pb-20 text-center min-h-screen">
          <h2 className="text-4xl font-black text-brand-teal">Service not found</h2>
          <p className="text-secondary-dark/50 mt-4">We couldn't find the service: "{slug}"</p>
          <Link to="/services" className="bg-brand-teal text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest mt-8 inline-block hover:bg-brand-blue transition-all">
            Back to Services
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <Helmet key={slug}>
        <title>{service.name} | Dental Inlet — Corpus Christi, TX</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={`${service.name} | Dental Inlet Corpus Christi`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={`https://www.dentalinlet.com/services/${slug}`} />
      </Helmet>
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link to="/services" className="inline-flex items-center gap-2 text-brand-teal/40 hover:text-brand-blue font-bold uppercase tracking-widest text-xs mb-12 transition-colors">
            <HiOutlineArrowLeft size={16} /> Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                {service.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-brand-teal mb-8 tracking-tight leading-[0.9]">
                {service.name}
              </h1>
              <p className="text-xl text-secondary-dark/60 leading-relaxed font-light mb-12">
                {service.description}
              </p>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-brand-teal tracking-tight">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-black/5">
                      <HiOutlineCheckCircle className="text-brand-blue" size={20} />
                      <span className="text-sm font-medium text-secondary-dark/70">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:sticky lg:top-32"
            >
              <div className="bg-brand-teal rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
                
                <h3 className="text-[2rem] font-black mb-6 tracking-tight">Ready for treatment? Book consultation today</h3>
                <p className="text-white/60 mb-10 leading-relaxed font-light">Schedule a consultation with Dr. Ahmad to discuss if {service.name} is right for you.</p>
                
                <div className="space-y-4">
                  <Link 
                    to="/book-now" 
                    className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    Request Appointment <HiOutlineChevronRight size={20} />
                  </Link>
                  <a 
                    href="tel:5125550198"
                    className="w-full border-2 border-white/20 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <HiOutlinePhone size={20} /> (361) 878-5628
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {service.wteToDisplay === true && <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-teal mb-20 tracking-tight italic font-serif">What to expect.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {service.process.map((step, index) => (
              <div key={index} className="text-left group">
                <span className="block text-4xl font-black text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors mb-4">0{index + 1}</span>
                <h3 className="text-2xl font-bold text-brand-teal mb-4 tracking-tight">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>}
      
    </AnimatedPage>
  );
};

export default ServiceDetails;
