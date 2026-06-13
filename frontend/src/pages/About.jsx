import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineClock, HiOutlineHeart } from 'react-icons/hi2';
import waitingImg from '/src/assets/waiting.jpeg';
import treatmentRoomImg from '/src/assets/implantingArea.jpeg';
import mainAreaImg from '/src/assets/mainArea.jpeg';
import drAnsImg from '/src/assets/drAns.jpeg';

const About = () => {
  const values = [
    {
      title: 'Patient-First Care',
      description: 'Everything we do is centered around your comfort and long-term health, not our bottom line.',
      icon: HiOutlineHeart,
    },
    {
      title: 'Advanced Tech',
      description: 'We invest in the latest dental technology to make your visits faster, safer, and more effective.',
      icon: HiOutlineSparkles,
    },
    {
      title: 'Honest Pricing',
      description: 'No hidden fees or surprise bills. We provide clear, itemized estimates before any work begins.',
      icon: HiOutlineCheckCircle,
    },
    {
      title: 'Minimal Waiting',
      description: 'We value your time. Our scheduling is optimized to ensure you spend minimal time in the waiting room.',
      icon: HiOutlineClock,
    },
  ];

  return (
    <AnimatedPage>
      <Helmet>
        <title>About Us | Dental Inlet — Corpus Christi's Trusted Dentist Since 2006</title>
        <meta name="description" content="Learn about Dental Inlet's story, mission, and values. Dr. Ans Ahmad provides expert, compassionate dental care in Corpus Christi, TX." />
        <meta property="og:title" content="About Dental Inlet | Honest Care for Every Smile" />
        <meta property="og:description" content="Since 2006, Dental Inlet has been Corpus Christi's home for patient-first dentistry. Meet Dr. Ans and discover our commitment to your comfort." />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-brand-teal mb-8 tracking-tight">
              Honest care for<br />
              <span className="italic text-brand-blue font-normal font-serif">every smile.</span>
            </h1>
            <p className="text-xl text-secondary-dark/60 max-w-2xl leading-relaxed font-light">
              Dental Inlet has been providing high-quality dental services to the Corpus Christi community. We believe in a slower, more human approach to dentistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-black text-brand-teal mb-8 tracking-tight">Our Story & Mission</h2>
            <div className="space-y-6 text-secondary-dark/70 leading-relaxed font-light text-lg">
              <p>
                Dental Inlet was found by Dr. Ans Ahmad with a simple goal: to create a dental practice that patients actually enjoy visiting. We saw a need for a clinic that combined high-end technology with a warm, neighborhood feel.
              </p>
              <p>
                We don't believe in "one-size-fits-all" dentistry. Every mouth is different, and every patient has different needs. Whether you're here for a routine cleaning or a full cosmetic makeover, we take the time to listen and build a plan that works for you.
              </p>
              <p>
                Our mission is to provide the highest standard of care while maintaining an environment that is calm, clear, and focused entirely on the patient.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img src={mainAreaImg} alt="Clinic Interior" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-brand-teal text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Why Choose Us?</h2>
            <p className="text-white/60 text-lg font-light">We focus on the details that make your experience better, from the moment you book until your treatment is complete.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-[2.5rem] hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange transition-colors">
                  <value.icon className="text-brand-blue group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{value.title}</h3>
                <p className="text-white/60 leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="py-32 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-black text-brand-teal mb-20 tracking-tight text-center">Inside our clinic</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 aspect-[16/9] rounded-[2rem] overflow-hidden shadow-lg">
              <img src={waitingImg} alt="Waiting Area" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg">
              <img src={treatmentRoomImg} alt="Treatment Room" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg">
              <img src={drAnsImg} alt="Dr. Ans Ahmad" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="md:col-span-2 aspect-[16/9] rounded-[2rem] overflow-hidden shadow-lg">
              <img src={mainAreaImg} alt="Clinic Main Area" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default About;
