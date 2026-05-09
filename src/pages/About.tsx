import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { Heart, Check, Info, Clock, MapPin, ArrowRight, Star } from 'lucide-react';

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

const values = [
  { icon: Heart, title: 'Community First', description: 'We are proud members of the Prince Edward Island community and invest in its long-term health and growth.' },
  { icon: Check, title: 'Integrity Always', description: 'Transparent communication, honest pricing, and no hidden fees — ever. You always know where things stand.' },
  { icon: Info, title: 'Local Knowledge', description: 'Deep knowledge of Prince Edward Island means we understand the local market, weather patterns, and tenant expectations better than anyone.' },
  { icon: Clock, title: 'Responsiveness', description: 'We pick up the phone and respond to messages. Maintenance requests are handled promptly because downtime costs you money.' },
];

export default function About() {
  return (
    <div className="bg-canvas">
      {/* Page Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: 'url(/about-hero-canadian.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-fluid-md text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6">
              Our Journey
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
              Crafting Better <br />
              <span className="text-accent">Living Experiences</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white text-lg md:text-xl font-semibold leading-relaxed [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
              Serving Cornwall, Charlottetown, and beyond with a commitment to excellence and local integrity.
            </p>
          </AnimatedSection>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-canvas to-transparent" />
      </section>

      {/* Mission */}
      <section className="py-fluid-2xl relative">
        <div className="shape-blob top-0 right-0 w-[500px] h-[500px] opacity-10" />
        <div className="max-w-7xl mx-auto px-fluid-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Proven Excellence</span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                  Local Service You <br />
                  <span className="text-contrast-mid underline decoration-accent/40 decoration-4 underline-offset-8">Can Truly Trust</span>
                </h2>
                <div className="space-y-6 text-lg text-contrast-mid leading-relaxed">
                  <p>
                    Lewis Property Management was founded in Prince Edward Island with a simple mission: give property owners peace of mind while keeping tenants happy in well-maintained homes.
                  </p>
                  <p>
                    What started as a small operation serving local homeowners has grown into one of the most recognized property management names on PEI. We manage residential rentals, multi-unit buildings, and commercial spaces — all with the same personal touch that has defined us from day one.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-12 border border-contrast-low flex flex-col items-center justify-center gap-8 group">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="flex gap-4">
                    <Star size={48} className="text-accent fill-accent drop-shadow-md" />
                    <Star size={48} className="text-accent fill-accent drop-shadow-md" />
                    <Star size={48} className="text-accent fill-accent drop-shadow-md" />
                  </div>
                  <div className="flex gap-4">
                    <Star size={48} className="text-accent fill-accent drop-shadow-md" />
                    <Star size={48} className="text-accent fill-accent drop-shadow-md" />
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <div className="text-primary font-black text-4xl mb-2">5.0 / 5.0</div>
                  <div className="text-contrast-mid font-bold tracking-widest uppercase text-xs">Customer Excellence Rating</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-fluid-2xl bg-surface relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-fluid-md relative z-10">
          <AnimatedSection className="text-center mb-20">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">What Drives Us</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="group h-full p-10 rounded-3xl bg-white border border-contrast-low shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/30">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-accent flex items-center justify-center mb-8 transition-soft group-hover:bg-accent group-hover:text-primary">
                    <val.icon size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-4">{val.title}</h3>
                  <p className="text-contrast-mid leading-relaxed text-lg">{val.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Area Served */}
      <section className="py-fluid-2xl bg-white text-primary relative overflow-hidden border-t border-contrast-low">
        <div className="shape-blob -bottom-20 -right-20 w-[600px] h-[600px] opacity-5 bg-primary" />
        
        <div className="max-w-7xl mx-auto px-fluid-md relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Footprint</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">Serving the Island</h2>
            <p className="text-contrast-mid text-lg max-w-2xl mx-auto font-bold">We are proud to manage properties across the most vibrant communities in Prince Edward Island.</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Cornwall', 'Charlottetown', 'Stratford', 'Summerside', 'Montague', 'Kensington', 'Winsloe', 'PEI'].map((city, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <div className="group p-6 rounded-2xl bg-canvas border border-contrast-low flex items-center gap-4 transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white hover:scale-105 shadow-sm hover:shadow-xl">
                  <MapPin size={20} className="text-accent group-hover:text-white" />
                  <span className="font-bold tracking-wide text-primary group-hover:text-white">{city}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300} className="text-center mt-20">
            <Link
              to="/contact"
              className="group no-underline inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
            >
              Get in Touch <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
