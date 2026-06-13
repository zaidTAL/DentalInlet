import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi2';
import { LuStethoscope, LuLayoutGrid, LuHammer, LuShieldCheck, LuZap } from 'react-icons/lu';
import gsap from 'gsap';

const iconMap = {
  Stethoscope: LuStethoscope,
  Sparkles: HiOutlineSparkles,
  Grid: LuLayoutGrid,
  Hammer: LuHammer,
  ShieldCheck: LuShieldCheck,
  Zap: LuZap,
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || LuStethoscope;
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  };

  return (
    <Link 
      to={`/services/${service.slug}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-secondary-light p-10 rounded-[2.5rem] text-left hover:bg-brand-teal group transition-colors duration-500 flex flex-col h-full border border-black/5 shadow-sm"
    >
      <div className="w-16 h-16 bg-white rounded-2xl mb-8 flex items-center justify-center group-hover:bg-brand-blue transition-colors shadow-sm">
        <Icon className="text-brand-blue group-hover:text-white transition-colors" size={32} />
      </div>
      <h3 className="text-2xl font-bold text-brand-teal mb-4 group-hover:text-white transition-colors tracking-tight">
        {service.name}
      </h3>
      <p className="text-secondary-dark/60 group-hover:text-white/60 transition-colors mb-8 leading-relaxed flex-grow font-light text-sm">
        {service.description}
      </p>
      <div className="flex items-center justify-between pt-8 border-t border-black/5 group-hover:border-white/10 transition-colors">
        <span className="text-[0.65rem] uppercase font-bold tracking-[0.2em] text-brand-orange">
          {service.category}
        </span>
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1">
          <HiOutlineArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
