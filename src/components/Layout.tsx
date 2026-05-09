import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/before-after', label: 'Before & After' },
  { path: '/contact', label: 'Contact' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-body selection:bg-accent/30 selection:text-primary">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.05)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-fluid-md flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group no-underline">
            <div className="relative">
              <img
                src="/logo-lpm.webp"
                alt="Lewis Property Management"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-bold text-lg md:text-xl tracking-tight transition-soft"
                style={{
                  color: scrolled ? 'var(--primary)' : '#fff',
                  textShadow: scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                Lewis Property
              </span>
              <span
                className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium transition-soft"
                style={{
                  color: scrolled ? 'var(--contrast-mid)' : 'rgba(255,255,255,0.7)',
                }}
              >
                Management
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className="relative py-2 text-sm font-semibold tracking-wide no-underline transition-soft group"
                  style={{
                    color: scrolled
                      ? active ? 'var(--primary)' : 'var(--contrast-mid)'
                      : active ? '#fff' : 'rgba(255,255,255,0.8)',
                  }}
                >
                  {label}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </Link>
              );
            })}
            

          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full transition-soft hover:bg-accent/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: scrolled ? 'var(--primary)' : '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100 border-t' : 'max-h-0 opacity-0'}`}
          style={{ borderColor: 'var(--contrast-low)' }}
        >
          <div className="flex flex-col py-4">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="px-8 py-4 text-lg font-semibold text-primary no-underline transition-soft"
                style={{
                  backgroundColor: location.pathname === path ? 'var(--surface)' : 'transparent',
                  color: location.pathname === path ? 'var(--accent)' : 'var(--primary)',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* Footer */}
      <footer className="bg-[#010205] text-white pt-24 pb-12 relative overflow-hidden">
        <div className="shape-blob -bottom-24 -left-24 w-96 h-96 opacity-10" />
        <div className="shape-blob -top-24 -right-24 w-96 h-96 opacity-5" />
        
        <div className="max-w-7xl mx-auto px-fluid-md relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <img src="/logo-lpm.webp" alt="LPM Logo" className="h-12 w-auto brightness-0 invert" />
                <div>
                  <div className="text-xl font-bold font-heading">Lewis Property Management</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold">Excellence in Service</div>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed max-w-md text-lg mt-4">
                Your trusted partner for premium property management across Prince Edward Island. We treat every home as if it were our own.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="https://www.facebook.com/lewispropertymgmt" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-soft hover:bg-accent hover:border-accent hover:text-primary">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-8">Quick Navigation</h4>
              <div className="flex flex-col gap-4">
                {navLinks.map(({ path, label }) => (
                  <Link key={path} to={path} className="text-white/90 no-underline transition-soft hover:text-white hover:translate-x-2 flex items-center gap-2">
                    <ArrowRight size={14} className="text-accent" /> {label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-8">Get In Touch</h4>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 text-white/90">
                  <MapPin size={20} className="text-accent shrink-0" />
                  <span>Cornwall, Charlottetown<br />Stratford, PE, Canada</span>
                </div>
                <div className="flex items-center gap-4 text-white/90">
                  <Phone size={20} className="text-accent shrink-0" />
                  <a href="tel:9029407166" className="text-white/90 no-underline hover:text-white transition-soft">(902) 940-7166</a>
                </div>
                <div className="flex items-center gap-4 text-white/90">
                  <Mail size={20} className="text-accent shrink-0" />
                  <a href="mailto:lewispropertylpm@gmail.com" className="text-white/90 no-underline hover:text-white transition-soft">lewispropertylpm@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Lewis Property Management LLC. All rights reserved.
            </p>
            <div className="flex gap-8 text-white/30 text-xs uppercase tracking-widest">
              <span className="hover:text-accent cursor-pointer transition-soft">Privacy Policy</span>
              <span className="hover:text-accent cursor-pointer transition-soft">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
