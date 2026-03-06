
import React from 'react';

const StackSection: React.FC = () => {
  const stackItems = [
    { name: 'React 19', cat: 'Frontend Core', level: 85, icon: 'view_quilt' },
    { name: 'Python', cat: 'AI & Backend', level: 70, icon: 'psychology' },
    { name: 'LangChain', cat: 'AI Framework', level: 60, icon: 'hub' },
    { name: 'PostgreSQL', cat: 'Database', level: 75, icon: 'database' },
    { name: 'FastAPI', cat: 'Backend API', level: 80, icon: 'api' },
    { name: 'Docker', cat: 'Infrastructure', level: 85, icon: 'terminal' },
    { name: 'Redis', cat: 'Caching', level: 50, icon: 'memory' },
    { name: 'RabbitMQ', cat: 'Messaging', level: 50, icon: 'message' },
    { name: 'LangGraph', cat: 'AI Agents', level: 60, icon: 'account_tree' },
  ];

  return (
    <section className="relative py-32 bg-background-dark overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">
            <span className="text-primary text-glow">02.</span> Tech_System
          </h2>
          <div className="max-w-xl h-[1px] bg-primary/20 relative">
             <div className="absolute -top-1 -right-1 size-2 bg-primary animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackItems.map((item, i) => (
            <div key={item.name} className="group p-8 bg-surface border border-white/5 relative overflow-hidden transition-all hover:bg-surface/80">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-all"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="size-12 bg-primary/5 flex items-center justify-center rounded-sm border border-primary/20 group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                </div>
                <span className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em]">Module_{i+1}</span>
              </div>

              <h3 className="text-xl font-black text-white mb-1 uppercase italic tracking-wider">{item.name}</h3>
              <p className="text-xs text-primary/60 font-mono mb-6 uppercase tracking-widest">{item.cat}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase text-gray-500">
                  <span>Sync_Rate</span>
                  <span className="text-primary">{item.level}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-primary shadow-[0_0_10px_#00ffff] transition-all duration-1000 group-hover:translate-x-0" 
                    style={{ width: `${item.level}%`, transform: 'translateX(-100%)' }}
                  ></div>
                </div>
              </div>

              {/* Decorative Data Stream */}
              <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">analytics</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-primary/5 border border-primary/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-white uppercase italic">Core Specializations</h4>
            <p className="text-gray-400 font-mono text-sm">AI Agent Orchestration (LangGraph), RAG Systems (LangChain), Scalable Backend Architecture (FastAPI), and Real-time Inventory Management Solutions.</p>
          </div>
          <div className="flex gap-4">
             <div className="size-16 border border-primary/20 flex items-center justify-center animate-spin-slow">
                <span className="material-symbols-outlined text-primary">data_object</span>
             </div>
             <div className="size-16 border border-secondary/20 flex items-center justify-center animate-spin-reverse">
                <span className="material-symbols-outlined text-secondary">model_training</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
