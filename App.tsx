
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import StackSection from './components/StackSection';
import ChatBot from './components/ChatBot';
import ProjectTerminal from './components/ProjectTerminal';
import { Section } from './types';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  const [currentSection, setSection] = useState<Section>('home');
  const [isChanging, setIsChanging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const [formData, setFormData] = useState({ identifier: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.identifier.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('ALL_FIELDS_REQUIRED');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('INVALID_EMAIL_FORMAT');
      return;
    }

    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error?.message || data.error || 'Transmission failed');
      }

      setFormStatus('success');
      setFormData({ identifier: '', email: '', message: '' });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setFormStatus('error');
      setFormError(err.message || 'TRANSMISSION_FAILED');
    }
  };

  const handleSectionChange = (section: Section) => {
    if (section === currentSection) return;
    setIsChanging(true);
    setTimeout(() => {
      setSection(section);
      setIsChanging(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background-dark selection:bg-primary selection:text-black">
      <Header 
        currentSection={currentSection} 
        setSection={handleSectionChange} 
        onHireMe={() => setIsModalOpen(true)}
      />
      
      <main className={`transition-all duration-500 ${isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {currentSection === 'home' && <Hero onInitialize={() => setIsTerminalOpen(true)} />}
        {currentSection === 'projects' && <ProjectsSection />}
        {currentSection === 'stack' && <StackSection />}
        
        {currentSection === 'contact' && (
          <div className="pt-32 container mx-auto px-6 lg:px-24 min-h-screen flex flex-col items-center justify-center text-center">
            <div className="mb-12">
              <h2 className="text-6xl md:text-8xl font-black text-glow-magenta mb-6 uppercase tracking-tighter italic">// Establish_Link</h2>
              <div className="h-1 w-24 bg-secondary mx-auto"></div>
            </div>
            
            <p className="text-gray-400 max-w-xl mb-12 font-mono text-sm leading-relaxed uppercase tracking-widest">
              Direct frequency link available. Uplink protocols initialized for high-bandwidth collaboration and neural system architecture consulting.
            </p>

            <div className="w-full max-w-2xl bg-surface p-1 rounded-sm border border-white/5 relative">
              {/* Corner HUD markers */}
              <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-secondary"></div>
              <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-secondary"></div>

              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                  <input 
                    type="text" 
                    placeholder="IDENTIFIER_NAME" 
                    value={formData.identifier}
                    onChange={(e) => setFormData(prev => ({ ...prev, identifier: e.target.value }))}
                    disabled={formStatus === 'loading'}
                    className="bg-background-dark border-none p-6 text-white font-mono placeholder:text-gray-700 focus:ring-1 focus:ring-secondary outline-none uppercase disabled:opacity-50" 
                  />
                  <input 
                    type="email" 
                    placeholder="COMMS_FREQUENCY_EMAIL" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={formStatus === 'loading'}
                    className="bg-background-dark border-none p-6 text-white font-mono placeholder:text-gray-700 focus:ring-1 focus:ring-secondary outline-none uppercase disabled:opacity-50" 
                  />
                  <textarea 
                    placeholder="TRANSMISSION_CONTENT..." 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    disabled={formStatus === 'loading'}
                    className="md:col-span-2 bg-background-dark border-none p-6 text-white font-mono placeholder:text-gray-700 focus:ring-1 focus:ring-secondary outline-none uppercase resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                {formError && (
                  <div className="p-4 bg-red-500/10 border-t border-red-500/50 text-red-500 font-mono text-sm uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">error</span>
                    ERR: {formError}
                  </div>
                )}

                {formStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border-t border-green-500/50 text-green-500 font-mono text-sm uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    TRANSMISSION_SUCCESSFUL: DATA_RECEIVED
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className="w-full h-20 bg-secondary/10 border-t border-white/5 text-secondary font-black uppercase tracking-[0.5em] hover:bg-secondary hover:text-black transition-all group overflow-hidden disabled:opacity-50 disabled:hover:bg-secondary/10 disabled:hover:text-secondary disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {formStatus === 'loading' ? 'TRANSMITTING...' : formStatus === 'success' ? 'LINK_ESTABLISHED' : 'Transmit Signal'}
                    <span className={`material-symbols-outlined transition-transform duration-500 ${formStatus === 'loading' ? 'animate-pulse' : formStatus === 'success' ? '' : 'group-hover:translate-x-12 group-hover:-translate-y-12'}`}>
                      {formStatus === 'success' ? 'check' : 'send'}
                    </span>
                  </span>
                </button>
              </form>
            </div>

            <div className="mt-16 flex gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
               <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl">location_on</span>
                  <span className="font-mono text-[9px] tracking-widest uppercase">Node: Bogotá_Colombia</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl">schedule</span>
                  <span className="font-mono text-[9px] tracking-widest uppercase">Active: 18:00 - 04:00</span>
               </div>
            </div>
          </div>
        )}
      </main>

      <ChatBot />

      {/* Project Terminal */}
      <ProjectTerminal 
        projects={PROJECTS} 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-surface border border-primary/30 p-8 rounded-sm shadow-[0_0_50px_rgba(0,255,255,0.1)]">
            {/* Corner HUD markers */}
            <div className="absolute -top-1 -left-1 size-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute -bottom-1 -right-1 size-4 border-b-2 border-r-2 border-primary"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">// Neural_Link</h2>
                <div className="h-1 w-12 bg-primary mt-2"></div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-primary/5 border-l-2 border-primary">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-1">Identity</span>
                <p className="text-white font-bold tracking-wider">Oscar Alexander Casas Alfonso</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Location</span>
                  <p className="text-sm text-gray-300">Bogotá D.C, Colombia</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Status</span>
                  <p className="text-sm text-primary animate-pulse">Available for uplink</p>
                </div>
              </div>

              <div className="space-y-4">
                <a href="mailto:oscaralexander2626@gmail.com" className="flex items-center gap-4 p-4 bg-surface border border-white/5 hover:border-primary/50 transition-all group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
                  <span className="font-mono text-sm text-gray-300">oscaralexander2626@gmail.com</span>
                </a>
                <a href="tel:+573026826521" className="flex items-center gap-4 p-4 bg-surface border border-white/5 hover:border-primary/50 transition-all group">
                  <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">call</span>
                  <span className="font-mono text-sm text-gray-300">+57 302 682 6521</span>
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Protocol: Direct_Comms_v1.0</span>
              <div className="flex gap-2">
                <div className="size-1 rounded-full bg-primary animate-ping"></div>
                <div className="size-1 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 border-t border-white/5 bg-background-dark relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-black italic tracking-tighter text-glow">OSCAR_CASAS</h3>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Software Developer & AI Engineer // System v3.4.0
            </p>
          </div>
          
          <div className="flex gap-12">
            {[
              { label: 'GITHUB', url: 'https://github.com/Lexico7890' },
              { label: 'LINKEDIN', url: 'https://linkedin.com/in/oscarcasas26' }
            ].map(social => (
              <a 
                key={social.label} 
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-gray-500 hover:text-primary transition-colors tracking-[0.3em] font-bold border-b border-transparent hover:border-primary pb-1"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-gray-700">
             <span className="text-[10px] font-mono">LATENCY: 12MS</span>
             <div className="size-1 rounded-full bg-green-500"></div>
             <span className="text-[10px] font-mono">ENCRYPTION: AES-512</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
