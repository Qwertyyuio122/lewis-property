import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { MapPin, Phone, Mail, Facebook, Send, CheckCircle2, Loader2 } from 'lucide-react';

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

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Service Area', lines: ['Cornwall, Charlottetown', 'Stratford, PE, Canada'] },
    { icon: Phone, title: 'Direct Line', lines: ['(902) 940-7166'], link: 'tel:9029407166' },
    { icon: Mail, title: 'Email Support', lines: ['lewispropertylpm@gmail.com'], link: 'mailto:lewispropertylpm@gmail.com' },
    { icon: Facebook, title: 'Facebook', lines: ['@lewispropertymgmt'], link: 'https://www.facebook.com/lewispropertymgmt' },
  ];

  return (
    <div className="bg-canvas">
      {/* Hero - Clean Gradient Header */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-primary">
        <div className="shape-blob top-0 right-0 w-[800px] h-[800px] bg-accent/10 opacity-30" />
        <div className="shape-blob -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/5 opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-fluid-md">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.4em] uppercase">Connect With Us</span>
            </div>
            <h1 className="font-heading text-5xl md:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
              Let's Start a <br />
              <span className="text-accent">Conversation</span>
            </h1>
            <p className="max-w-2xl text-white/90 text-xl leading-relaxed font-semibold">
              We respond to all inquiries within one business day. Your property is our priority.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="py-fluid-2xl relative">
        <div className="max-w-7xl mx-auto px-fluid-md">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">

            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-2">
              <div className="sticky top-32">
                <h2 className="font-heading text-4xl font-bold text-primary mb-8">Reach Out</h2>
                <p className="text-lg text-contrast-mid mb-12 leading-relaxed">
                  Whether you're an owner seeking professional management or a tenant looking for a new home, we're here to help.
                </p>

                <div className="space-y-10">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-surface border border-contrast-low flex items-center justify-center transition-soft group-hover:bg-accent group-hover:border-accent group-hover:text-primary shrink-0">
                        <item.icon size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black tracking-[0.2em] uppercase text-contrast-mid mb-2">{item.title}</div>
                        {item.lines.map((line, j) => (
                          item.link && j === 0 ? (
                            <a key={j} href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-xl font-bold text-primary no-underline hover:text-accent transition-soft block">{line}</a>
                          ) : (
                            <span key={j} className="text-xl font-bold text-primary block">{line}</span>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map embed */}
                <div className="mt-16 rounded-[2rem] overflow-hidden border-8 border-surface shadow-2xl group">
                  <iframe
                    title="Lewis Property Management Location"
                    src="https://maps.google.com/maps?q=Charlottetown,+Prince+Edward+Island,+Canada&t=&z=10&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-3" delay={150}>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-16 rounded-[3rem] bg-surface border-4 border-dashed border-accent/30 min-h-[600px]">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-10 shadow-xl shadow-accent/20">
                    <CheckCircle2 size={48} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-4xl font-bold text-primary mb-6">Message Received!</h3>
                  <p className="text-lg text-contrast-mid max-w-sm mb-12">
                    Thank you for reaching out. A representative from Lewis Property Management will contact you shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="px-10 py-5 rounded-full border-2 border-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-soft"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="p-10 md:p-16 rounded-[3rem] bg-white border border-contrast-low shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
                  
                  <h3 className="font-heading text-3xl font-bold text-primary mb-2">Send a Secure Message</h3>
                  <p className="text-contrast-mid mb-12 font-medium">Fields marked with * are mandatory for a response.</p>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-contrast-mid ml-1">Full Name *</label>
                        <input
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full px-6 py-5 rounded-2xl bg-surface border border-transparent focus:border-accent focus:bg-white transition-all duration-300 outline-none font-bold text-primary placeholder:text-contrast-mid/40"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-contrast-mid ml-1">Email Address *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-6 py-5 rounded-2xl bg-surface border border-transparent focus:border-accent focus:bg-white transition-all duration-300 outline-none font-bold text-primary placeholder:text-contrast-mid/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-contrast-mid ml-1">Phone Number</label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(902) 000-0000"
                          className="w-full px-6 py-5 rounded-2xl bg-surface border border-transparent focus:border-accent focus:bg-white transition-all duration-300 outline-none font-bold text-primary placeholder:text-contrast-mid/40"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-contrast-mid ml-1">Area of Interest</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full px-6 py-5 rounded-2xl bg-surface border border-transparent focus:border-accent focus:bg-white transition-all duration-300 outline-none font-bold text-primary appearance-none cursor-pointer"
                        >
                          <option value="">Select a Service</option>
                          <option value="residential">Residential Management</option>
                          <option value="commercial">Commercial Management</option>
                          <option value="maintenance">Maintenance & Repairs</option>
                          <option value="tenant">Tenant Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-contrast-mid ml-1">Your Message *</label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        className="w-full px-6 py-5 rounded-3xl bg-surface border border-transparent focus:border-accent focus:bg-white transition-all duration-300 outline-none font-bold text-primary placeholder:text-contrast-mid/40 resize-none min-h-[150px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-6 rounded-full bg-primary text-white font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-accent hover:text-primary hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Send Inquiry <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-fluid-2xl bg-surface">
        <div className="max-w-4xl mx-auto px-fluid-md">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Common Questions</span>
            <h2 className="font-heading text-4xl font-bold text-primary">Service FAQ</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-6 rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6">
            {[
              { q: 'What areas do you serve?', a: 'We serve Cornwall, Charlottetown, Stratford, and throughout Prince Edward Island. If your property is on PEI, we can likely manage it.' },
              { q: 'What are your management fees?', a: 'Fees vary based on property type and unit count. We provide transparent, competitive quotes with no hidden maintenance surcharges.' },
              { q: 'How do you handle maintenance?', a: 'We have a network of trusted local contractors and handle everything from 24/7 emergency calls to routine inspections.' },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="p-8 rounded-3xl bg-white border border-contrast-low shadow-sm group hover:shadow-md transition-soft">
                  <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" /> {faq.q}
                  </h4>
                  <p className="text-contrast-mid leading-relaxed pl-5">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
