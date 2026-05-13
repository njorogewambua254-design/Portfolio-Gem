import {
  Phone,
  Mail,
  Linkedin,
  BarChart,
  Moon,
  Sun,
  Download
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

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

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
    <div className="flex flex-col md:flex-row print:flex-row min-h-screen bg-bg-base text-text-main font-sans transition-colors duration-200 print:[print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
      {/* LEFT SIDEBAR: IDENTITY & CONTACT */}
      <aside className="w-full md:w-[320px] xl:w-[360px] bg-primary-deep text-white p-8 lg:p-10 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto print:h-auto print:overflow-visible transition-colors duration-300 relative z-10 print:w-1/3">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl print:w-24 print:h-24 bg-white/5 flex items-center justify-center">
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

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/90 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary-light">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:0705379875" className="hover:text-white transition-colors">0705 379 875</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary-light">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:njorogewambua254@gmail.com" className="hover:text-white transition-colors">njorogewambua254@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary-light">
                  <Linkedin className="w-4 h-4" />
                </div>
                <a href="https://linkedin.com/in/josephnjoroge-44b271346" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest font-semibold mb-4">Achievements</p>
              <div className="space-y-2.5">
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                  <p className="text-xs font-semibold text-white/90">Employee of the Year 2025</p>
                  <p className="font-mono text-[9px] text-primary-light mt-1">SokoFresh Agri Innovations</p>
                </div>
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                  <p className="text-xs font-semibold text-white/90">Employee of the Month</p>
                  <p className="font-mono text-[9px] text-primary-light mt-1">Mar 2024 · SokoFresh</p>
                </div>
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                  <p className="text-xs font-semibold text-white/90">Result Driven Employee</p>
                  <p className="font-mono text-[9px] text-primary-light mt-1">SokoFresh Agri Innovations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 p-4 bg-black/20 border border-white/10 rounded-xl flex items-center gap-4 relative z-10 backdrop-blur-md">
          <div className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-light"></span>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-primary-light/80">Status</p>
            <p className="text-sm text-white/90 font-medium">Available · Nairobi</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-8 lg:p-14 xl:p-20 flex flex-col overflow-y-auto print:overflow-visible w-full print:w-2/3 relative transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto w-full relative z-10">
          {/* HEADER / SUMMARY AND TOGGLE BUTTON */}
          <header className="mb-14 relative group">
            <div className="flex justify-between items-start mb-6">
              <p className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">Executive Summary</p>
              
              <div className="flex items-center gap-3 ml-4 shrink-0 print:hidden">
                <button 
                  onClick={() => window.print()} 
                  className="p-2.5 rounded-full bg-bg-surface border border-border-main text-text-muted hover:text-text-main hover:bg-border-main/50 transition-all active:scale-95 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Export to PDF"
                  title="Export to PDF"
                >
                  <Download className="w-[18px] h-[18px]" />
                </button>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2.5 rounded-full bg-bg-surface border border-border-main text-text-muted hover:text-text-main hover:bg-border-main/50 transition-all active:scale-95 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Toggle dark mode"
                  title="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="w-[18px] h-[18px] text-primary" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-text-main font-light text-balance max-w-3xl">
              Results-oriented supply chain and operations professional transitioning into <span className="font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-4">data-driven decision making</span>. With a strong foundation in horticultural export logistics — spanning freight forwarding, packhouse management, regulatory compliance, and international certification coordination — I am building expertise in data analysis through ALX Africa to bring analytical rigour to supply chain optimisation, inventory intelligence, and operational performance management.
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 print:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* SKILLS & COMPLIANCE */}
            <section className="space-y-10">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">Operations & Logistics</h3>
                <div className="h-[260px] w-full bg-bg-surface border border-border-main rounded-2xl shadow-sm overflow-hidden p-2 relative group block">
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={logisticsData}>
                        <PolarGrid stroke="var(--border-main)" strokeDasharray="3 3" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace', fontWeight: 600 }} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-main)', borderRadius: '8px', fontSize: '11px', color: 'var(--text-main)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                          itemStyle={{ color: 'var(--primary)', fontWeight: 600 }} 
                          cursor={{ stroke: 'var(--primary-light)', strokeWidth: 1, strokeDasharray: '3 3' }}
                        />
                        <Radar 
                          name="Proficiency" 
                          dataKey="A" 
                          stroke="var(--primary)" 
                          strokeWidth={2}
                          fill="var(--primary)" 
                          fillOpacity={0.2} 
                          className="transition-opacity duration-300 group-hover:fill-opacity-40"
                          isAnimationActive={true}
                          animationDuration={1500}
                          animationEasing="ease-out"
                          dot={{ r: 2.5, fill: 'var(--bg-surface)', stroke: 'var(--primary)', strokeWidth: 1.5 }}
                          activeDot={{ r: 4, fill: 'var(--primary)', stroke: 'var(--bg-surface)' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">Data & Technology</h3>
                <div className="bg-bg-surface border border-border-main rounded-2xl shadow-sm p-6 lg:p-7 space-y-3.5">
                  {techSkills.map((skill, index) => (
                    <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} index={index} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">Certifications & Audits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2.5">
                  {[
                    'SMETA Audit Coordination',
                    'GlobalG.A.P. Certification',
                    'GRASP Certification',
                    'Rainforest Alliance Certification',
                    'Compliance Management',
                    'Regulatory Frameworks'
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-3 p-3 bg-bg-surface rounded-xl border border-border-main shadow-sm hover:border-primary/30 transition-colors">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></div>
                      <p className="text-[11px] font-semibold text-text-main uppercase tracking-tight">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PROFESSIONAL TIMELINE */}
            <section className="space-y-6">
              <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted">Professional Timeline</h3>
              <div className="relative border-l border-border-main pl-7 space-y-12 py-2 transition-colors">
                
                <TimelineItem isFirst={true} delay={100}>
                  <p className="font-mono text-[10px] font-semibold text-primary tracking-widest">JAN 2025 – PRESENT</p>
                  <h4 className="text-[15px] font-display font-bold text-text-main">Operations & Logistics Officer</h4>
                  <p className="text-xs text-text-muted font-medium pb-2">SokoFresh Agri Innovations EA Ltd</p>
                  <ul className="list-none text-[13px] text-text-muted space-y-2">
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Plan and optimize outgoing shipments</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Manage electronic certifications (KEPHIS, KRA, AFA/HCD)</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Coordinate international certification audits</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Ensure full compliance of shipping documentation</li>
                  </ul>
                </TimelineItem>

                <TimelineItem delay={200}>
                  <p className="font-mono text-[10px] font-semibold text-text-muted tracking-widest">MAY 2024 – JAN 2025</p>
                  <h4 className="text-[15px] font-display font-bold text-text-main">Operations & Logistics Associate</h4>
                  <p className="text-xs text-text-muted font-medium pb-2">SokoFresh Agri Innovations EA Ltd</p>
                  <ul className="list-none text-[13px] text-text-muted space-y-2">
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Coordinated outgoing avocado shipments</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Managed bookings with KEPHIS, KRA, MAERSK</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Provided shipment status updates to customers</li>
                  </ul>
                </TimelineItem>

                <TimelineItem delay={300}>
                  <p className="font-mono text-[10px] font-semibold text-text-muted tracking-widest">NOV 2023 – APR 2024</p>
                  <h4 className="text-[15px] font-display font-bold text-text-main">Intake Intern Trainee</h4>
                  <p className="text-xs text-text-muted font-medium pb-2">SokoFresh Agri Innovations EA Ltd</p>
                  <ul className="list-none text-[13px] text-text-muted space-y-2">
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Procured fresh produce from smallholder farmers</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Quality control, sorting & grading</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Maintained accurate inventory records</li>
                  </ul>
                </TimelineItem>

                <TimelineItem delay={400}>
                  <p className="font-mono text-[10px] font-semibold text-text-muted tracking-widest">MAY 2023 – AUG 2023</p>
                  <h4 className="text-[15px] font-display font-bold text-text-main">Lab Assistance Technician</h4>
                  <p className="text-xs text-text-muted font-medium pb-2">Strathmore University (CeRTS)</p>
                  <ul className="list-none text-[13px] text-text-muted space-y-2">
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Blood & plasma sample preparation</li>
                    <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border-main before:absolute before:left-0 before:top-1.5">Maintenance of analytical instruments</li>
                  </ul>
                </TimelineItem>

              </div>
            </section>
          </div>

          <div className="mb-16">
             <h3 className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-6">Currently Learning</h3>
             <div className="bg-bg-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-border-main transition-colors relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 font-display text-[120px] font-bold tracking-tighter leading-none select-none text-text-main pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
                 ALX
               </div>
               <div className="relative z-10">
                 <div className="flex items-start gap-5 mb-5">
                   <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl shrink-0 border border-primary/20 backdrop-blur-sm">
                     <BarChart className="w-6 h-6" />
                   </div>
                   <div className="pt-1">
                     <h3 className="text-base font-display font-bold text-text-main">Data Analysis Program</h3>
                     <p className="text-[13px] font-medium text-text-muted mb-2">ALX Africa</p>
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
                     <span key={skill} className="px-3 py-1.5 bg-bg-base border border-border-main rounded-md font-mono text-[11px] text-text-muted font-medium transition-colors hover:text-text-main cursor-default">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
          </div>

          {/* BOTTOM SECTION: EDUCATION & REFERENCES */}
          <div className="pt-10 border-t border-border-main grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 print:grid-cols-3 gap-10 transition-colors">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">Education</p>
              <div className="space-y-4">
                <div className="group">
                  <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">BSc Industrial Chemistry</p>
                  <p className="font-mono text-[11px] text-text-muted mt-1.5">Masinde Muliro University · 2023</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">Certifications</p>
              <div className="space-y-5">
                <div className="group">
                  <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Customs & Freight</p>
                  <p className="font-mono text-[11px] text-text-muted mt-1.5">KESRA · 2025</p>
                </div>
                <div className="group">
                  <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">OSHA Awareness</p>
                  <p className="font-mono text-[11px] text-text-muted mt-1.5">Kaileys Consortium · 2024</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 xl:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-widest font-semibold text-text-muted mb-5">References</p>
              <div className="space-y-3">
                <div className="group bg-bg-surface p-4 rounded-xl shadow-sm border border-border-main transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Stephen Katingima</p>
                    <p className="font-mono text-[10px] text-text-muted mt-1">COO, SokoFresh EA · 0721 457 474</p>
                  </div>
                </div>
                <div className="group bg-bg-surface p-4 rounded-xl shadow-sm border border-border-main transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Ralph Wechuli</p>
                    <p className="font-mono text-[10px] text-text-muted mt-1">Dean, Eastlands College · 0721 120 975</p>
                  </div>
                </div>
                <div className="group bg-bg-surface p-4 rounded-xl shadow-sm border border-border-main transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-[14px] font-display font-bold text-text-main group-hover:text-primary transition-colors">Benson Wambua</p>
                    <p className="text-xs text-text-muted mt-0.5">Asst. Chief Mechanic</p>
                    <div className="font-mono text-[10px] text-text-muted mt-1.5 flex gap-2 w-full truncate">
                      <a href="mailto:bensonwambua43@gmail.com" className="hover:text-primary transition-colors truncate">bensonwambua...</a>
                      <span className="text-border-main">·</span>
                      <a href="tel:0721120975" className="hover:text-primary transition-colors shrink-0">0721 120 975</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
