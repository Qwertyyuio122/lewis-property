import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { Shield, Home as HomeIcon, Settings, UserCheck, ArrowRight, Star, CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        transition: `opacity 0.8s cubic-bezier(.25,.1,.25,1) ${delay}ms, transform 0.8s cubic-bezier(.25,.1,.25,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const services = [
  { icon: HomeIcon, title: 'Residential Management', description: 'Complete care for your rental homes, from tenant screening to 24/7 maintenance support.' },
  { icon: Shield, title: 'Compliance & Legal', description: 'Stay protected with our expert knowledge of PEI rental laws and local property regulations.' },
  { icon: Settings, title: 'Strategic Maintenance', description: 'Preventative care that preserves property value and keeps your tenants satisfied long-term.' },
  { icon: UserCheck, title: 'Tenant Placement', description: 'We find high-quality tenants through rigorous screening and strategic marketing.' },
];

export default function Home() {
  return (
    <div className="bg-canvas">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[#010205]" />
        <div className="absolute inset-0 opacity-40">
          <img src="/hero-neighborhood.webp" className="w-full h-full object-cover scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-primary" />
        
        {/* Floating Shapes */}
        <div className="shape-blob top-0 left-0 w-[800px] h-[800px] bg-accent/20 opacity-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="shape-blob bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 opacity-20 animate-[pulse_12s_ease-in-out_infinite]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-fluid-md text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-[0.4em] uppercase mb-10 shadow-2xl">
              <Star size={14} className="text-accent fill-accent" /> Trusted across PEI
            </div>
            <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-10 [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]">
              Your Property, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">Our Priority.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-white/90 text-xl md:text-2xl font-semibold leading-relaxed mb-16 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
              Expert property management serving Cornwall, Charlottetown, and Stratford with world-class integrity.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link
                to="/contact"
                className="group w-full md:w-auto px-12 py-6 rounded-full bg-accent text-primary font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(196,183,138,0.4)] active:scale-95 no-underline flex items-center justify-center gap-3"
              >
                Start Management <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </Link>
              <Link
                to="/about"
                className="group w-full md:w-auto px-12 py-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/20 flex items-center justify-center gap-3 no-underline"
              >
                Our Story <PlayCircle size={20} className="text-accent" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent to-transparent" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-fluid-2xl relative">
        <div className="shape-blob -top-20 -left-20 w-[500px] h-[500px] opacity-10" />
        <div className="max-w-7xl mx-auto px-fluid-md">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">
            <AnimatedSection className="max-w-2xl">
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">What we do</span>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-primary tracking-tighter leading-none">
                Comprehensive Care <br />
                <span className="text-contrast-mid/30 italic">For Every Asset</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <Link to="/contact" className="group flex items-center gap-4 text-primary font-bold text-lg no-underline">
                View All Services <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center transition-soft group-hover:bg-primary group-hover:text-white"><ArrowRight size={20} /></div>
              </Link>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="group h-full p-10 rounded-[3rem] bg-surface border border-contrast-low transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 hover:border-accent/40">
                  <div className="w-20 h-20 rounded-3xl bg-primary text-accent flex items-center justify-center mb-10 transition-soft group-hover:scale-110 group-hover:rotate-6 group-hover:bg-accent group-hover:text-primary">
                    <service.icon size={40} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-6">{service.title}</h3>
                  <p className="text-contrast-mid leading-relaxed text-lg">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-fluid-2xl bg-[#0a0c12] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(196,183,138,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-fluid-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <AnimatedSection>
              <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl bg-gradient-to-br from-primary-light to-primary min-h-[400px] flex items-center justify-center border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,192,68,0.1),transparent_50%)]" />
                <div className="absolute bottom-12 left-12 right-12 z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold shadow-xl">01</div>
                    <div className="text-xl font-bold uppercase tracking-widest text-white">Quality Inspections</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-6 block">The Lewis Advantage</span>
              <h2 className="font-heading text-5xl md:text-6xl font-bold mb-10 leading-tight tracking-tighter">
                We Don't Just Manage. <br />
                <span className="text-accent italic">We Optimize.</span>
              </h2>
              
              <div className="space-y-10">
                {[
                  { title: 'Data-Driven Pricing', desc: 'We use real-time market data on PEI to ensure your property is always priced for maximum yield.' },
                  { title: 'Rigorous Screening', desc: 'Our 5-point background check ensures only the most reliable tenants enter your property.' },
                  { title: 'Transparent Reporting', desc: 'Real-time access to financials, maintenance logs, and property performance metrics.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-soft group-hover:bg-accent group-hover:text-primary">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-soft">{item.title}</h4>
                      <p className="text-white/40 leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Actual Services */}
      <section className="py-fluid-2xl relative bg-canvas-dark overflow-hidden">
        <div className="shape-blob top-0 left-1/2 w-[800px] h-[400px] bg-accent/5 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-fluid-md relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-primary tracking-tighter leading-none mb-6">
              Property Services
            </h2>
            <p className="text-contrast-mid text-xl max-w-2xl mx-auto">
              Professional maintenance services to keep your property looking its best year-round.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Lawn Mowing', img: '/lawn-mowing.jpg.webp', desc: 'Reliable, high-quality lawn care to maintain your property’s curb appeal.' },
              { title: 'Snow Removal', img: '/snow-removal.jpg', desc: 'Prompt snow clearing services ensuring safety and accessibility during winter.' },
              { title: 'Tree Removal', img: '/tree-removal.jpg', desc: 'Professional tree maintenance and removal to protect your property and enhance aesthetics.' }
            ].map((srv, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-contrast-low transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img src={srv.img} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-80" />
                    <h3 className="absolute bottom-6 left-8 font-heading text-3xl font-bold text-white">{srv.title}</h3>
                  </div>
                  <div className="p-8">
                    <p className="text-contrast-mid text-lg leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_100%)] opacity-50" />
        <div className="max-w-4xl mx-auto px-fluid-md text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-heading text-5xl md:text-8xl font-black text-primary mb-12 tracking-tighter leading-none">
              Your Property Deserves <br />
              <span className="underline decoration-primary/20 decoration-8 underline-offset-8">The Best Care.</span>
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-6 bg-primary text-white px-16 py-8 rounded-full font-black uppercase tracking-widest text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 no-underline"
            >
              Get a Free Quote <ChevronRight size={28} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
