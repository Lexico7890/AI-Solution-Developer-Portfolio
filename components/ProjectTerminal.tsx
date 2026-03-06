
import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface ProjectTerminalProps {
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
}

const ProjectTerminal: React.FC<ProjectTerminalProps> = ({ projects, isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['System initialized...', 'Type "grep <tech>" to filter projects (e.g., grep Python)', 'Type "ls" to see all projects', 'Type "clear" to reset']);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, filteredProjects]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setHistory(prev => [...prev, `> ${input}`]);

    if (cmd === 'ls') {
      setFilteredProjects(projects);
      setHistory(prev => [...prev, `Listing all projects... Found ${projects.length} entries.`]);
    } else if (cmd.startsWith('grep ')) {
      const term = cmd.replace('grep ', '').trim();
      const filtered = projects.filter(p => 
        p.tech.some(t => t.toLowerCase().includes(term)) || 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
      setFilteredProjects(filtered);
      setHistory(prev => [...prev, `Filtering by: "${term}"... Found ${filtered.length} matches.`]);
    } else if (cmd === 'clear') {
      setHistory(['Terminal cleared.']);
      setFilteredProjects(projects);
    } else if (cmd === 'help') {
      setHistory(prev => [...prev, 'Available commands:', 'ls - List all projects', 'grep <term> - Filter projects by technology or name', 'clear - Clear terminal history', 'exit - Close terminal']);
    } else if (cmd === 'exit') {
      onClose();
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmd}. Type "help" for assistance.`]);
    }

    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl h-[80vh] bg-black border border-primary/30 flex flex-col shadow-[0_0_100px_rgba(0,255,255,0.1)] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-red-500/50"></div>
            <div className="size-2 rounded-full bg-yellow-500/50"></div>
            <div className="size-2 rounded-full bg-green-500/50"></div>
            <span className="ml-4 font-mono text-[10px] text-primary/60 uppercase tracking-widest">Project_Query_Terminal_v2.0</span>
          </div>
          <button onClick={onClose} className="text-primary/40 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Terminal Output */}
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar" ref={scrollRef}>
            <div className="space-y-1 mb-8">
              {history.map((line, i) => (
                <div key={i} className={`${line.startsWith('>') ? 'text-primary' : 'text-gray-500'} break-all`}>
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="flex items-center gap-2 text-primary">
              <span className="shrink-0">oscar@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none p-0 text-primary placeholder:text-primary/20"
                placeholder="type command..."
                autoFocus
              />
            </form>
          </div>

          {/* Results Grid */}
          <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-primary/20 bg-primary/5 p-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} className="group relative bg-black/40 border border-primary/10 p-4 hover:border-primary/40 transition-all animate-glitch">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-primary font-black uppercase italic tracking-tighter">{project.title}</h4>
                      <span className="text-[9px] font-mono text-gray-600">ID: {project.id}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-2 font-light">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map(t => (
                        <span key={t} className="text-[8px] px-1.5 py-0.5 bg-primary/10 text-primary/80 font-mono border border-primary/20 uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono text-center py-20">
                  <span className="material-symbols-outlined text-4xl mb-4 opacity-20">search_off</span>
                  <p className="text-xs uppercase tracking-widest">No matches found in database</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-4 py-1 bg-primary/5 border-t border-primary/10 flex justify-between items-center">
          <span className="text-[8px] font-mono text-gray-600 uppercase">Status: Connected</span>
          <span className="text-[8px] font-mono text-gray-600 uppercase">Results: {filteredProjects.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTerminal;
