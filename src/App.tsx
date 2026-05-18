import {
  Phone,
  Mail,
  Linkedin,
  BarChart,
  Moon,
  Sun,
  Building2,
  GraduationCap,
  Leaf,
  HeartHandshake,
  User,
  Briefcase,
  Contact,
  MapPin,
  ExternalLink
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const logisticsData = [
  { subject: 'Supply Chain', A: 95, fullMark: 100 },
  { subject: 'Freight', A: 90, fullMark: 100 },
  { subject: 'Customs', A: 85, fullMark: 100 },
  { subject: 'Packhouse', A: 85, fullMark: 100 },
  { subject: 'QA/QC', A: 90, fullMark: 100 },
  { subject: 'Inventory', A: 80, fullMark: 100 },
];

const techSkills = [
  { name: 'Data Analysis (ALX Africa)', percentage: 70 },
  { name: 'Microsoft Excel (Advanced)', percentage: 95 },
  { name: 'Data Visualization', percentage: 80 },
  { name: 'Analytical Reporting', percentage: 85 },
  { name: 'Statistical Interpretation', percentage: 75 },
];

const SkillBar: React.FC<{ name: string, percentage: number, index: number }> = ({ name, percentage, index }) => {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => setWidth(percentage), 300 + index * 120);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, percentage, index]);

  const isDataFocus = name.includes('Data') || name.includes('ALX') || name.includes('Analytical');

  return (
    <div ref={barRef} className="group w-full cursor-default">
      <div className="flex justify-between items-end mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">
        <span className={`text-[13px] transition-colors ${isDataFocus ? 'text-primary font-bold' : 'text-text-main font-medium group-hover:text-primary'}`}>
          {name}
        </span>
        <span className="text-[10px] font-mono text-text-muted group-hover:text-primary transition-colors">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full bg-border-main/50 rounded-full overflow-hidden shadow-inner flex items-center p-[1px]">
        <div 
          className={`h-full rounded-full transition-all duration-[1500ms] ease-out relative overflow-hidden group-hover:brightness-110 print:!w-[var(--print-tgt)] ${isDataFocus ? 'bg-primary' : 'bg-primary-light/80'}`} 
          style={{ width: `${width}%`, '--print-tgt': `${percentage}%` } as React.CSSProperties}
        >
          {width > 0 && (
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] print:hidden ${isDataFocus ? 'group-hover:animate-[shimmer_1s_infinite]' : 'group-hover:animate-[shimmer_1.5s_infinite]'}`}></div>
          )}
        </div>
      </div>
    </div>
  );
}

const TimelineItem: React.FC<{ children: React.ReactNode, delay?: number, isFirst?: boolean }> = ({ children, delay = 0, isFirst = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-1000 ease-out print:opacity-100 print:translate-y-0 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`absolute w-3.5 h-3.5 rounded-full -left-[35px] border-4 border-bg-base mt-0.5 shadow-sm transition-all duration-300 ${isFirst ? 'bg-primary group-hover:scale-125' : 'bg-border-main group-hover:bg-primary/50'}`}></div>
      <div className="space-y-1.5">
        {children}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

type Tab = 'about' | 'portfolio' | 'contacts';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('about');

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row print:flex-col min-h-screen bg-bg-base text-text-main font-sans transition-colors duration-200 print:[print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
      {/* LEFT SIDEBAR: IDENTITY & NAVIGATION */}
      <aside className="w-full md:w-[280px] lg:w-[320px] bg-primary-deep text-white p-8 lg:p-10 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto print:hidden transition-colors duration-300 relative z-10">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="space-y-10 relative z-10 w-full">
          <div className="space-y-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-white/5 flex items-center justify-center">
              <img src="/folder/Passport.jpg" alt="Joseph Njoroge" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
              <span className="text-4xl sm:text-5xl font-display font-bold text-white/80 tracking-tighter hidden">JN</span>
            </div>
            <div className="space-y-1.5">
              <h1 className="text-3xl lg:text-4xl font-display font-bold tracking-tight text-white leading-tight">Joseph<br/>Njoroge</h1>
              <p className="text-primary-light/90 font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
                Operations & Logistics
              </p>
            </div>
          </div>

          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
            <button 
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap ${activeTab === 'about' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="font-semibold text-sm tracking-wide">About</span>
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap ${activeTab === 'portfolio' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span className="font-semibold text-sm tracking-wide">Portfolio</span>
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap ${activeTab === 'contacts' ? 'bg-primary text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <Contact className="w-4 h-4 shrink-0" />
              <span className="font-semibold text-sm tracking-wide">Contacts</span>
            </button>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 hidden md:block z-10 transition-colors">
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary-light mb-2.5">Status</p>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-[13px] font-medium text-white/90">Available for Opportunities</span>
          </div>
        </div>
      </aside>

      {/* PRINT HEADER ONLY VISIBLE WHEN PRINTING */}
      <div className="hidden print:block w-full border-b border-border-main p-8 mb-8 pb-8">
         <div className="flex justify-between items-end">
           <div>
             <h1 className="text-4xl font-display font-bold tracking-tight text-text-main">Joseph Njoroge</h1>
             <p className="text-primary font-mono text-[12px] tracking-[0.2em] uppercase font-medium mt-2">Operations & Logistics Professional</p>
           </div>
           <div className="text-right text-sm">
             <p>njorogewambua254@gmail.com</p>
             <p>0705 379 875 | Nairobi</p>
           </div>
         </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-8 lg:p-14 xl:p-20 flex flex-col overflow-y-auto print:overflow-visible w-full relative transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto w-full relative z-10">
          
          {/* TOP CONTROLS */}
          <div className="flex justify-end items-center gap-3 mb-10 print:hidden">
            <button 
              onClick={toggleDarkMode} 
              className="p-2.5 rounded-full bg-bg-surface border border-border-main text-text-muted hover:text-text-main hover:bg-border-main/50 transition-all active:scale-95 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Toggle dark mode"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-[18px] h-[18px] text-primary" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="print:!animate-none print:!opacity-100 print:!block"
            >
              
              {/* ----------------- ABOUT TAB (AND PRINT DEFAULTS) ----------------- */}
              {(activeTab === 'about') && (
                <div className="space-y-16 print:space-y-12 pb-12">
                  <motion.section variants={itemVariants}>
                    <p className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-semibold mb-6">Executive Summary</p>
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full hidden sm:block"></div>
                      <p className="text-lg lg:text-xl leading-relaxed text-text-main font-light text-balance max-w-3xl sm:pl-6">
                        Results-oriented supply chain and operations professional transitioning into <strong className="font-semibold text-primary">data-driven decision making</strong>. With a strong foundation in horticultural export logistics — spanning freight forwarding, packhouse management, regulatory compliance, and international certification coordination — I am building expertise in data analysis through ALX Africa to bring analytical rigour to supply chain optimisation, inventory intelligence, and operational performance management.
                      </p>
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-6">Currently Learning</h3>
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="bg-gradient-to-br from-bg-surface to-bg-base p-6 sm:p-8 rounded-3xl shadow-sm border border-border-main transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5 font-display text-[120px] font-bold tracking-tighter leading-none select-none text-text-main pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
                        ALX
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-5 mb-5">
                          <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-2xl shrink-0 border border-primary/20 backdrop-blur-sm shadow-inner group-hover:shadow-primary/20 transition-all">
                            <BarChart className="w-7 h-7" />
                          </div>
                          <div className="pt-1.5">
                            <h3 className="text-lg font-display font-bold text-text-main">Data Analysis Program</h3>
                            <p className="text-[14px] font-medium text-text-muted mb-2">ALX Africa</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-primary">In Progress · 2025</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[15px] text-text-muted leading-relaxed mb-6 max-w-2xl">
                          Developing proficiency in data cleaning, visualization, and statistical reporting with a focus on supply chain optimisation.
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {['Data Cleaning', 'Data Visualization', 'Excel for Data Analysis', 'Analytical Reporting'].map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-bg-base/50 border border-border-main rounded-lg font-mono text-[11px] text-text-muted font-medium transition-colors hover:text-text-main hover:border-primary/30 hover:bg-primary/5 cursor-default">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-6">Community & Volunteer Work</h3>
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="bg-gradient-to-br from-bg-surface to-bg-base p-6 sm:p-8 rounded-3xl shadow-sm border border-border-main transition-all relative overflow-hidden group hover:border-pink-500/40"
                    >
                      <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] font-display text-[120px] font-bold tracking-tighter leading-none select-none text-text-main pointer-events-none group-hover:scale-110 group-hover:opacity-10 group-hover:text-pink-500 transition-all duration-700">
                        <HeartHandshake className="w-32 h-32" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-5 mb-5">
                          <div className="w-14 h-14 bg-pink-500/10 text-pink-500 flex items-center justify-center rounded-2xl shrink-0 border border-pink-500/20 backdrop-blur-sm transition-colors group-hover:bg-pink-500/20 group-hover:shadow-pink-500/20 shadow-inner">
                            <HeartHandshake className="w-7 h-7" />
                          </div>
                          <div className="pt-1.5">
                            <h3 className="text-lg font-display font-bold text-text-main group-hover:text-pink-500 transition-colors">Volunteer & Philanthropist</h3>
                            <p className="text-[14px] font-medium text-text-muted mb-2">Eastlands Charity Group & Personal Initiatives</p>
                          </div>
                        </div>
                        <p className="text-[15px] text-text-muted leading-relaxed mb-6 max-w-2xl">
                          Committed to uplifting the community by dedicating a portion of my personal income to buy food for needy families, particularly in local slums. Actively collaborate with the Eastlands Charity Group and participate in neighborhood community cleaning projects to improve local living conditions.
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {['Food Relief Initiatives', 'Community Cleaning', 'Eastlands Charity', 'Youth Mentorship'].map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-bg-base/50 border border-border-main rounded-lg font-mono text-[11px] text-text-muted font-medium transition-colors hover:text-pink-500 hover:border-pink-500/40 hover:bg-pink-500/5 cursor-default">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.section>

                  <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">Education</h3>
                      <div className="space-y-4">
                        <motion.div 
                          whileHover={{ y: -2 }}
                          className="group bg-bg-surface p-6 rounded-2xl shadow-sm border border-border-main hover:border-primary/50 hover:shadow-md transition-all relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
                          <p className="text-[15px] font-display font-bold text-text-main relative z-10">BSc Industrial Chemistry</p>
                          <p className="text-[14px] font-medium text-text-muted mt-1 relative z-10">Masinde Muliro University</p>
                          <p className="font-mono text-[11px] text-primary/80 mt-4 font-semibold uppercase tracking-wider flex items-center gap-2 relative z-10">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Graduated 2023
                          </p>
                        </motion.div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">References</h3>
                      <div className="space-y-3">
                        <motion.div whileHover={{ x: 4 }} className="group bg-bg-surface p-4 rounded-xl shadow-sm border border-border-main transition-all duration-300 hover:border-primary/40 hover:shadow-md cursor-default flex items-center justify-between">
                          <div className="relative z-10">
                            <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Stephen Katingima</p>
                            <p className="text-[12px] text-text-muted mt-0.5">COO, SokoFresh EA</p>
                          </div>
                          <a href="tel:0721457474" className="w-8 h-8 rounded-full bg-bg-base border border-border-main flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all hover:bg-primary/5 cursor-pointer">
                             <Phone className="w-3.5 h-3.5" />
                          </a>
                        </motion.div>
                        <motion.div whileHover={{ x: 4 }} className="group bg-bg-surface p-4 rounded-xl shadow-sm border border-border-main transition-all duration-300 hover:border-primary/40 hover:shadow-md cursor-default flex items-center justify-between">
                          <div className="relative z-10">
                            <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Ralph Wechuli</p>
                            <p className="text-[12px] text-text-muted mt-0.5">Dean, Eastlands College</p>
                          </div>
                          <a href="tel:0721120975" className="w-8 h-8 rounded-full bg-bg-base border border-border-main flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all hover:bg-primary/5 cursor-pointer">
                             <Phone className="w-3.5 h-3.5" />
                          </a>
                        </motion.div>
                        <motion.div whileHover={{ x: 4 }} className="group bg-bg-surface p-4 rounded-xl shadow-sm border border-border-main transition-all duration-300 hover:border-primary/40 hover:shadow-md cursor-default flex items-center justify-between">
                          <div className="relative z-10">
                            <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Benson Wambua</p>
                            <p className="text-[12px] text-text-muted mt-0.5">Asst. Chief Mechanic</p>
                          </div>
                          <a href="tel:0721120975" className="w-8 h-8 rounded-full bg-bg-base border border-border-main flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all hover:bg-primary/5 cursor-pointer">
                             <Phone className="w-3.5 h-3.5" />
                          </a>
                        </motion.div>
                      </div>
                    </div>
                  </motion.section>
                </div>
              )}

              {/* ----------------- PORTFOLIO TAB ----------------- */}
              {(activeTab === 'portfolio') && (
                <div className="space-y-16 md:space-y-20 print:block pb-12">
                  
                  <section>
                    <motion.p variants={itemVariants} className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-semibold mb-10">Professional Experience & Skills</motion.p>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-20">
                      
                      {/* PROFESSIONAL TIMELINE */}
                      <motion.div variants={itemVariants} className="relative border-l-2 border-border-main/60 pl-8 space-y-14 py-2">
                          <TimelineItem isFirst={true} delay={100}>
                            <div className="inline-block px-3 py-1 bg-primary/10 rounded-md border border-primary/20 mb-3">
                              <p className="font-mono text-[10px] font-semibold text-primary tracking-widest">JAN 2025 – PRESENT</p>
                            </div>
                            <h4 className="text-[16px] font-display font-bold text-text-main">Operations & Logistics Officer</h4>
                            <p className="text-[13px] text-text-muted font-medium pb-3 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/>SokoFresh Agri Innovations EA Ltd</p>
                            <ul className="list-none text-[14px] text-text-muted space-y-2.5">
                              <li className="relative pl-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-primary/60 before:absolute before:left-0 before:top-2">Plan and optimize outgoing shipments</li>
                              <li className="relative pl-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-primary/60 before:absolute before:left-0 before:top-2">Manage electronic certifications (KEPHIS, KRA, AFA/HCD)</li>
                              <li className="relative pl-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-primary/60 before:absolute before:left-0 before:top-2">Coordinate international certification audits</li>
                              <li className="relative pl-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-primary/60 before:absolute before:left-0 before:top-2">Ensure full compliance of shipping documentation</li>
                              <li className="relative pl-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-primary/60 before:absolute before:left-0 before:top-2">Product intake at the buyer</li>
                              <li className="relative pl-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-primary/60 before:absolute before:left-0 before:top-2">Invoicing and Commercial analysis</li>
                            </ul>
                          </TimelineItem>

                          <TimelineItem delay={200}>
                            <p className="font-mono text-[10px] font-semibold text-text-muted tracking-widest mb-2">MAY 2024 – JAN 2025</p>
                            <h4 className="text-[16px] font-display font-bold text-text-main">Operations & Logistics Associate</h4>
                            <p className="text-[13px] text-text-muted font-medium pb-3 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/>SokoFresh Agri Innovations EA Ltd</p>
                            <ul className="list-none text-[14px] text-text-muted space-y-2.5">
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Coordinated outgoing avocado shipments</li>
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Managed bookings with KEPHIS, KRA, MAERSK</li>
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Provided shipment status updates to customers</li>
                            </ul>
                          </TimelineItem>

                          <TimelineItem delay={300}>
                            <p className="font-mono text-[10px] font-semibold text-text-muted tracking-widest mb-2">NOV 2023 – APR 2024</p>
                            <h4 className="text-[16px] font-display font-bold text-text-main">Intake Intern Trainee</h4>
                            <p className="text-[13px] text-text-muted font-medium pb-3 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/>SokoFresh Agri Innovations EA Ltd</p>
                            <ul className="list-none text-[14px] text-text-muted space-y-2.5">
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Procured fresh produce from smallholder farmers</li>
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Quality control, sorting & grading</li>
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Maintained accurate inventory records</li>
                            </ul>
                          </TimelineItem>

                          <TimelineItem delay={400}>
                            <p className="font-mono text-[10px] font-semibold text-text-muted tracking-widest mb-2">MAY 2023 – AUG 2023</p>
                            <h4 className="text-[16px] font-display font-bold text-text-main">Lab Assistance Technician</h4>
                            <p className="text-[13px] text-text-muted font-medium pb-3 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/>Strathmore University (CeRTS)</p>
                            <ul className="list-none text-[14px] text-text-muted space-y-2.5">
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Blood & plasma sample preparation</li>
                              <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-2">Maintenance of analytical instruments</li>
                            </ul>
                          </TimelineItem>
                      </motion.div>

                      {/* SKILLS GRAPHS */}
                      <motion.div variants={itemVariants} className="space-y-12">
                        <div>
                          <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-border-main"></span>
                            Operations & Logistics
                          </h3>
                          <div className="h-[280px] w-full bg-bg-surface border border-border-main rounded-3xl shadow-sm overflow-hidden p-4 relative group block hover:shadow-md transition-shadow">
                            {isMounted && (
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={logisticsData}>
                                  <PolarGrid stroke="var(--border-main)" strokeDasharray="3 3" />
                                  <PolarAngleAxis 
                                    dataKey="subject" 
                                    tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace', fontWeight: 600 }} 
                                  />
                                  <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-main)', borderRadius: '12px', fontSize: '12px', color: 'var(--text-main)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }} 
                                    itemStyle={{ color: 'var(--primary)', fontWeight: 600 }} 
                                    cursor={{ stroke: 'var(--primary-light)', strokeWidth: 1, strokeDasharray: '3 3' }}
                                  />
                                  <Radar 
                                    name="Proficiency" 
                                    dataKey="A" 
                                    stroke="var(--primary)" 
                                    strokeWidth={2.5}
                                    fill="var(--primary)" 
                                    fillOpacity={0.2} 
                                    className="transition-opacity duration-300 group-hover:fill-opacity-30"
                                    isAnimationActive={true}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                    dot={{ r: 3, fill: 'var(--bg-surface)', stroke: 'var(--primary)', strokeWidth: 1.5 }}
                                    activeDot={{ r: 5, fill: 'var(--primary)', stroke: 'var(--bg-surface)' }}
                                  />
                                </RadarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-border-main"></span>
                            Data & Technology
                          </h3>
                          <div className="bg-bg-surface border border-border-main rounded-3xl shadow-sm p-8 space-y-5 hover:shadow-md transition-shadow">
                            {techSkills.map((skill, index) => (
                              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} index={index} />
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-border-main"></span>
                            Certifications Audited & Coordinated
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {['SMETA Audit', 'GlobalG.A.P.', 'GRASP', 'Rainforest Alliance', 'KEPHIS', 'AFA/HCD'].map((skill) => (
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                key={skill} 
                                className="px-4 py-2 bg-bg-surface border border-border-main shadow-sm rounded-lg font-mono text-[12px] text-text-main font-medium cursor-default hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </section>

                  <motion.section variants={itemVariants}>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-primary mb-8 text-center sm:text-left">Key Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <motion.div whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }} className="bg-gradient-to-b from-bg-surface to-bg-base p-6 rounded-2xl border border-border-main border-t-4 border-t-yellow-500 shadow-sm transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                        </div>
                        <p className="text-base font-bold text-text-main relative z-10">Employee of the Year</p>
                        <p className="font-mono text-[11px] font-semibold text-yellow-600 mt-3 uppercase tracking-wide relative z-10">2025 · SokoFresh</p>
                      </motion.div>
                      <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-b from-bg-surface to-bg-base p-6 rounded-2xl border border-border-main border-t-4 border-t-blue-500 shadow-sm transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <p className="text-base font-bold text-text-main relative z-10">Employee of the Month</p>
                        <p className="font-mono text-[11px] font-semibold text-blue-600 mt-3 uppercase tracking-wide relative z-10">Mar 2024 · SokoFresh</p>
                      </motion.div>
                      <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-b from-bg-surface to-bg-base p-6 rounded-2xl border border-border-main border-t-4 border-t-green-500 shadow-sm transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <p className="text-base font-bold text-text-main relative z-10">Result Driven Employee</p>
                        <p className="font-mono text-[11px] font-semibold text-green-600 mt-3 uppercase tracking-wide relative z-10">SokoFresh</p>
                      </motion.div>
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants} className="bg-gradient-to-br from-bg-surface to-bg-base p-10 sm:p-14 rounded-[2rem] border border-border-main shadow-lg relative overflow-hidden mt-12">
                    <div className="absolute inset-0 bg-primary/5 opacity-50 pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-500/[0.03] rounded-full blur-3xl"></div>
                    
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-text-muted mb-12 text-center relative z-10">Organisations I've Worked With</h3>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 md:grayscale hover:grayscale-0 transition-all duration-700 relative z-10">
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 group cursor-default">
                        <div className="p-4 bg-bg-base rounded-2xl border border-border-main group-hover:border-primary/40 group-hover:bg-primary/5 transition-all shadow-sm group-hover:shadow-primary/10">
                          <GraduationCap className="w-7 h-7 text-text-main group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-xl tracking-tight text-text-main group-hover:text-primary transition-colors leading-tight">Strathmore</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mt-1 font-semibold">University</span>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 group cursor-default">
                        <div className="p-4 bg-bg-base rounded-2xl border border-border-main group-hover:border-green-500/40 group-hover:bg-green-500/5 transition-all shadow-sm group-hover:shadow-green-500/10">
                          <Leaf className="w-7 h-7 text-text-main group-hover:text-green-500 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-xl tracking-tight text-text-main group-hover:text-green-500 transition-colors leading-tight">SokoFresh</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mt-1 font-semibold">Agri Innovations</span>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 group cursor-default">
                        <div className="p-4 bg-bg-base rounded-2xl border border-border-main group-hover:border-blue-500/40 group-hover:bg-blue-500/5 transition-all shadow-sm group-hover:shadow-blue-500/10">
                          <Building2 className="w-7 h-7 text-text-main group-hover:text-blue-500 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-xl tracking-tight text-text-main group-hover:text-blue-500 transition-colors leading-tight">Eastlands</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mt-1 font-semibold">College</span>
                        </div>
                      </motion.div>

                    </div>
                  </motion.section>
                </div>
              )}

              {/* ----------------- CONTACTS TAB ----------------- */}
              {(activeTab === 'contacts') && (
                <div className="space-y-12 max-w-4xl pb-12">
                  <motion.section variants={itemVariants}>
                    <p className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-semibold mb-6 flex items-center gap-3">
                      <span className="w-8 h-px bg-primary/50"></span>
                      Get In Touch
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-main tracking-tighter mb-12 leading-[1.1] max-w-2xl">
                      Let's Connect & <br className="hidden sm:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Build Something Great.</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                      <motion.a 
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="tel:0705379875" 
                        className="bg-bg-surface p-8 sm:p-10 rounded-3xl border border-border-main hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col gap-8 relative overflow-hidden"
                      >
                        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-5 h-5 text-primary/50" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-primary/20 group-hover:bg-primary group-hover:text-white">
                          <Phone className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-2">Phone</p>
                          <p className="font-display font-bold text-2xl text-text-main group-hover:text-primary transition-colors">+254 705 379 875</p>
                        </div>
                      </motion.a>

                      <motion.a 
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="mailto:njorogewambua254@gmail.com" 
                        className="bg-bg-surface p-8 sm:p-10 rounded-3xl border border-border-main hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col gap-8 relative overflow-hidden"
                      >
                        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-5 h-5 text-primary/50" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-primary/20 group-hover:bg-primary group-hover:text-white">
                          <Mail className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-2">Email</p>
                          <p className="font-display font-bold text-xl sm:text-2xl text-text-main group-hover:text-primary transition-colors break-all">njorogewambua254@gmail.com</p>
                        </div>
                      </motion.a>

                      <motion.a 
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://linkedin.com/in/josephnjoroge-44b271346" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-bg-surface p-8 sm:p-10 rounded-3xl border border-border-main hover:border-[#0A66C2]/40 hover:shadow-xl hover:shadow-[#0A66C2]/5 transition-all duration-300 group flex flex-col gap-8 relative overflow-hidden"
                      >
                         <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-5 h-5 text-[#0A66C2]/50" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-[#0A66C2]/20 group-hover:bg-[#0A66C2] group-hover:text-white">
                          <Linkedin className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-2">LinkedIn</p>
                          <p className="font-display font-bold text-2xl text-text-main group-hover:text-[#0A66C2] transition-colors mt-0.5">Joseph Njoroge</p>
                        </div>
                      </motion.a>

                      <motion.div 
                        whileHover={{ y: -5, scale: 1.02 }}
                         className="bg-bg-surface p-8 sm:p-10 rounded-3xl border border-border-main transition-colors group flex flex-col gap-8 cursor-default relative overflow-hidden hover:shadow-xl hover:shadow-green-500/5 hover:border-green-500/30"
                      >
                         <div className="absolute inset-0 bg-green-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center relative shadow-inner group-hover:shadow-green-500/20 transition-all duration-500 group-hover:scale-110">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl opacity-20 bg-green-500"></span>
                          <MapPin className="w-7 h-7 group-hover:animate-bounce" />
                        </div>
                        <div className="relative z-10">
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-2">Status & Location</p>
                          <p className="font-display font-bold text-2xl text-text-main group-hover:text-green-500 transition-colors">Nairobi, Kenya</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.section>
                </div>
              )}
              
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
