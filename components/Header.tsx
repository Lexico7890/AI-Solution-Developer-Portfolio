
import React from 'react';
import { Section } from '../types';

interface HeaderProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  onHireMe: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setSection, onHireMe }) => {
  const navItems: { label: string; id: Section }[] = [
    { label: 'About', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'Stack', id: 'stack' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
        <header className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 text-primary group cursor-pointer"
            onClick={() => setSection('home')}
          >
            <div className="relative w-8 h-8 flex items-center justify-center border border-primary/50 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-xl">terminal</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-primary"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-lg font-bold leading-none tracking-wider text-glow">OSCAR_CASAS</h2>
              <span className="text-[10px] text-primary/60 tracking-[0.2em] uppercase">AI Engineer</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative group py-2 ${
                  currentSection === item.id ? 'text-primary' : 'text-gray-300 hover:text-primary'
                }`}
              >
                <span className={`absolute -left-3 transition-opacity text-primary font-bold text-xs ${
                  currentSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>&gt;</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onHireMe}
              className="hidden sm:flex group relative px-5 py-2 overflow-hidden rounded bg-transparent border border-primary/30 text-primary text-sm font-bold tracking-wider hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                HIRE_ME
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </button>
            <button className="md:hidden text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
