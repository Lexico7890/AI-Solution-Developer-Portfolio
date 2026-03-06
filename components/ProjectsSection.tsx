
import React from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';

const ProjectsSection: React.FC = () => {
  const projects = PROJECTS;

  return (
    <section className="relative py-32 bg-background-dark min-h-screen overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
              <span className="text-primary text-glow">//</span> Project_Manifest
            </h2>
            <p className="text-gray-500 font-mono text-sm max-w-lg">
              Core deployments focusing on SaaS infrastructure and data-driven AI solutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <div 
              key={project.id || idx}
              className="group relative bg-surface/50 border border-white/5 p-8 transition-all duration-500 hover:border-primary/40 hover:-translate-y-2"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 size-4 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all"></div>
              <div className="absolute bottom-0 left-0 size-4 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all"></div>
              
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Type: Core Deployment</span>
                <span className="material-symbols-outlined text-primary opacity-20 group-hover:opacity-100 transition-opacity">memory</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tight uppercase italic">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map(t => (
                  <span key={t} className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 text-gray-400 font-mono rounded-sm uppercase tracking-tighter">
                    {t}
                  </span>
                ))}
              </div>

              {project.metrics && (
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{project.metrics.label}</span>
                  <span className="text-sm font-bold text-secondary text-glow-magenta font-mono">{project.metrics.value}</span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
