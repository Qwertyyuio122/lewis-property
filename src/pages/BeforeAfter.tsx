import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(.25,.1,.25,1) ${delay}ms, transform 0.7s cubic-bezier(.25,.1,.25,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const transformations = [
  {
    before: '/before-1.jpg',
    after: '/after-1.jpg',
    title: 'Modern Exterior Overhaul',
    category: 'Exterior',
    tags: ['Facade', 'Curb Appeal'],
  },
  {
    before: '/before-2.jpg',
    after: '/after-2.jpg',
    title: 'Gourmet Kitchen Upgrade',
    category: 'Interior',
    tags: ['Kitchen', 'Renovation'],
  },
  {
    before: '/before-3.jpg',
    after: '/after-3.jpg',
    title: 'Spa-Inspired Bathroom',
    category: 'Interior',
    tags: ['Bathroom', 'Plumbing'],
  },
];

function SliderCard({ before, after, title }: typeof transformations[0]) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    };
    const onEnd = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [dragging]);

  return (
    <div className="group rounded-[2rem] overflow-hidden bg-white border border-contrast-low shadow-lg transition-all duration-500 hover:shadow-2xl">


      {/* Image comparison slider */}
      <div
        ref={containerRef}
        className="relative select-none rounded-[2rem] overflow-hidden aspect-[16/10] cursor-ew-resize m-4 shadow-inner"
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        {/* After image (base layer) */}
        <img src={after} alt={`After ${title}`} className="absolute inset-0 w-full h-full object-cover" />

        {/* Before image (clipped to reveal left portion) */}
        <img
          src={before}
          alt={`Before ${title}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        />

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-1"
          style={{
            left: `${sliderPos}%`,
            background: 'white',
            boxShadow: '0 0 20px rgba(0,0,0,0.4)',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center gap-0.5 border-4 border-primary/5 transition-transform duration-300 group-hover:scale-110">
            <ChevronLeft size={16} className="text-primary" />
            <ChevronRight size={16} className="text-primary" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-6 left-6 pointer-events-none" style={{ opacity: sliderPos > 20 ? 1 : 0, transition: 'opacity 0.4s' }}>
          <span className="bg-primary/80 backdrop-blur-md text-white text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border border-white/10 shadow-xl">Before</span>
        </div>
        <div className="absolute top-6 right-6 pointer-events-none" style={{ opacity: sliderPos < 80 ? 1 : 0, transition: 'opacity 0.4s' }}>
          <span className="bg-accent/90 backdrop-blur-md text-primary text-[10px] font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border border-primary/10 shadow-xl">After</span>
        </div>
      </div>


    </div>
  );
}

export default function BeforeAfter() {
  return (
    <div className="bg-canvas">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0f1d]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-fluid-md pb-24 pt-40">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.4em] uppercase [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Portfolio Showcase</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]">
              Transforming <br />
              <span className="italic text-accent">Expectations</span>
            </h1>
            <p className="max-w-2xl text-white text-xl leading-relaxed font-semibold [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
              We specialize in strategic property upgrades that increase rental yields and long-term value. Witness the Lewis difference.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-fluid-2xl relative">
        <div className="shape-blob top-20 right-0 w-[600px] h-[600px] bg-accent/5" />
        <div className="max-w-7xl mx-auto px-fluid-md">
          <AnimatedSection className="mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Latest Projects</h2>
            <p className="text-contrast-mid text-lg max-w-xl">Each transformation is handled with professional care and a focus on durability.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {transformations.map((item, i) => (
              <AnimatedSection key={i} delay={i * 150} className={i === 2 ? 'lg:col-span-2 lg:max-w-4xl lg:mx-auto w-full' : ''}>
                <SliderCard {...item} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,var(--accent)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="max-w-3xl mx-auto px-fluid-md text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-3xl mb-10 rotate-12 transition-transform hover:rotate-0">
              <Sparkles className="text-primary" size={40} />
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready for a <br />
              <span className="text-accent">New Chapter?</span>
            </h2>
            <p className="text-white/60 text-xl mb-12 font-light">
              Our team can identify the highest ROI improvements for your property today.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 bg-white text-primary px-12 py-6 rounded-full font-black uppercase tracking-widest transition-soft hover:bg-accent hover:scale-105 active:scale-95 no-underline"
            >
              Start Your Project <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
