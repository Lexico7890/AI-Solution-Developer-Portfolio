
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onInitialize: () => void;
}

const Hero: React.FC<HeroProps> = ({ onInitialize }) => {
  const [text, setText] = useState('');
  const fullText = "Software Developer & AI Engineer specializing in AI systems, SaaS architecture, and data-driven solutions.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const cvContent = `
OSCAR ALEXANDER CASAS ALFONSO

SOFTWARE DEVELOPER | MACHINE LEARNING ENGINEER | AI ENGINEER

Software Developer and Machine Learning Engineer with a degree in Information Systems Analysis and Development and over 5 years of experience developing e-commerce, SaaS, and enterprise applications. Proven track record in revenue and delivery trend analysis, credit risk prediction, and full-cycle frontend development, leveraging strong skills in Python, JavaScript, SQL, ReactJS, Scikit-learn, and Docker. Experienced in frontend code quality and architecture oversight, ensuring scalable and consistent implementations.

WORK EXPERIENCE

AI Model Evaluator at ScaleAI
August 2025 - Present
I contributed to the evaluation and refinement of advanced AI models, ensuring technical accuracy and alignment with strict acceptance criteria through rigorous testing and code validation.
● I executed rigorous quality assurance and evaluation processes for advanced AI models, analyzing output accuracy, reasoning, and code quality based on strict project documentation.
● I developed and applied complex scoring rubrics and acceptance criteria to rate model responses, performing side-by-side comparisons to identify optimal responses for Reinforcement Learning from Human Feedback (RLHF) workflows.
● I validated AI-generated code snippets and technical solutions, involving web development and data structures to ensure functional correctness and adherence to industry standards.
Main Technologies: Python, SQL, JavaScript, HTML, CSS.

Frontend Developer at Konecta
February 2022 - March 2025
I analyzed and developed new functionalities for the company's various applications, implementing new technologies to improve new and existing products.
● I led the frontend development of a SaaS incident management platform, overseeing architecture, implementation, and UI design.
● I ensured code quality through review, validation, and approval of frontend contributions from team members.
● I ensured consistency and scalability in the application by applying coding standards and best practices.
● I collaborated cross-functionally throughout the development cycle to support problem-solving and technical decision-making.
● I provided backend support during critical incidents to maintain system stability and resolve issues efficiently.
Main Technologies: Javascript, ReactJS, Entity Framework, SQL Server, Angular, Docker.

PROJECTS

DevMetrics - Analytics Platform para Developers
github.com/Lexico7890/devmetrics
● I designed an analytics platform for developers that synchronizes data from GitHub (commits, pull requests, repositories) and generates productivity metrics, development patterns and performance through interactive dashboards with real-time visualizations.
● I designed a service-oriented architecture with Turborepo monorepo orchestrating 3 independent services (Next.js SSR, NestJS API, BullMQ Workers) communicating via RabbitMQ for asynchronous events and Redis for multi-layer caching and job queues.
● I implemented a PostgreSQL multi-schema database system using bounded contexts (auth, analytics, jobs) with Prisma ORM, preparing the architecture for migration to microservices without data refactoring.
● I configured a complete infrastructure with Docker Compose (9 services), Nginx as a unified reverse proxy with rate limiting and security headers, and a background processing pipeline for incremental synchronization of GitHub API data.
Main Technologies: TypeScript, Next.js (App Router/SSR/RSC), NestJS, PostgreSQL, Prisma, Redis, RabbitMQ, BullMQ, Docker Compose, Nginx, Turborepo, Tailwind CSS.

Trazea - Workshop Management with AI
github.com/Lexico7890/Trazea
● I designed a centralized inventory management system for electric mobility workshops, allowing real-time tracking of spare parts, usage reasoning, and operational records across multiple locations.
● I implemented an Agentic Workflow using voice interfaces to orchestrate multiple AI agents, allowing users to execute complex inventory commands and retrieve data using natural language.
● I integrated Multimodal AI (Google Gemini API) to process image inputs, automating spare parts identification and streamlining the registration process.
● I designed a scalable architecture ready for predictive analytics integration to forecast demand and optimize workshop efficiency.
Main Technologies: Python, Google Gemini API, LLM Agents, Speech Processing, PostgreSQL, Docker, JavaScript, Tailwind.

SKILLS
Technical Skills: JavaScript, Python, HTML, Typescript, SQL, ReactJS, Docker.
Methodologies: Agile (Scrum).
Other Tools: Jira, Git, MCP, Agent.
Languages: English B1.

EDUCATION
National Learning Service (SENA)
2018 - 2020
Technologist in Analysis and Development of Information Systems, Analysis of Computer Systems.
    `;
    const blob = new Blob([cvContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Oscar_Alexander_Casas_Alfonso_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative flex flex-col justify-center min-h-screen pt-20 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 bottom-0 h-[60vh] cyber-grid pointer-events-none origin-bottom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark pointer-events-none"></div>
        
        {/* Decorative Orbs */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* HUD Elements */}
      <div className="absolute inset-0 pointer-events-none p-12 hidden lg:block">
        <div className="hud-corner top-12 left-12 border-t-2 border-l-2"></div>
        <div className="hud-corner top-12 right-12 border-t-2 border-r-2"></div>
        <div className="hud-corner bottom-12 left-12 border-b-2 border-l-2"></div>
        <div className="hud-corner bottom-12 right-12 border-b-2 border-r-2"></div>
        
        <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-12 items-center opacity-30">
          <div className="w-[1px] h-32 bg-primary"></div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] rotate-90 whitespace-nowrap">Neural Flux Optimized</span>
          <div className="w-[1px] h-32 bg-primary"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="inline-flex items-center gap-3 self-start px-4 py-1.5 rounded-sm bg-primary/5 border border-primary/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-mono text-primary font-bold tracking-[0.2em] uppercase">Status: Core Active</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase italic">
              <span className="block text-glow">AI Solutions</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glitch-text">Developer</span>
            </h1>
          </div>

          <div className="h-12 flex items-center">
            <p className="text-lg md:text-xl text-gray-400 font-mono typing-cursor border-l-2 border-primary pl-4 max-w-2xl">
              {text}
            </p>
          </div>

          <div className="flex flex-wrap gap-5 mt-4">
            <button 
              onClick={onInitialize}
              className="group relative h-14 px-8 overflow-hidden rounded-sm bg-primary text-black font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                Initialize Projects
                <span className="material-symbols-outlined font-black">bolt</span>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            <button 
              onClick={handleDownload}
              className="group relative h-14 px-8 overflow-hidden rounded-sm border border-white/20 text-white font-bold uppercase tracking-widest hover:border-primary transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                Download Intel
                <span className="material-symbols-outlined">download</span>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-0 bg-primary/10 group-hover:h-full transition-all"></div>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'ML Ops', val: '0.94ms' },
              { label: 'Accuracy', val: '98.5%' },
              { label: 'Experience', val: '5Y+' },
              { label: 'Agents', val: 'Active' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-surface border-l-2 border-primary/30 flex flex-col gap-1 backdrop-blur-sm">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{stat.label}</span>
                <span className="text-lg font-bold text-white tracking-tighter">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:block relative">
          <div className="relative aspect-square w-full">
            {/* Spinning Rings */}
            <div className="absolute inset-0 rounded-full border-[1px] border-primary/20 animate-spin-slow"></div>
            <div className="absolute inset-10 rounded-full border-[1px] border-secondary/20 animate-spin-reverse" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-20 rounded-full border-[1px] border-white/10 animate-spin-slow" style={{ animationDuration: '30s' }}></div>
            
            {/* Central Visual */}
            <div className="absolute inset-[15%] rounded-full overflow-hidden border-2 border-primary shadow-[0_0_80px_rgba(0,255,255,0.15)] group cursor-crosshair">
              <img 
                src="https://xeypfdmbpkzkkfmthqwb.supabase.co/storage/v1/object/sign/ocdev/ocdev_logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lZGU2NzgyYi0wMjIxLTRhNmUtYTJmMC1kZTAwOGFmZjAxZjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvY2Rldi9vY2Rldl9sb2dvLnBuZyIsImlhdCI6MTc3MjgwNzA5NywiZXhwIjoxODA0MzQzMDk3fQ.VJzdSJ-ijk2g5Xk3M9C4AGkdwiCUmYh3wGOjRV6QqxE" 
                alt="Cyber Visual" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-color group-hover:opacity-0 transition-opacity"></div>
              <div className="absolute inset-0 scanlines opacity-40"></div>
            </div>

            {/* Floating Data Nodes */}
            <div className="absolute top-0 right-0 bg-surface border border-gray-800 p-3 rounded-sm shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] font-mono text-gray-300">NEURAL_READY</span>
              </div>
            </div>
            
            <div className="absolute bottom-10 -left-6 bg-surface border border-gray-800 p-3 rounded-sm shadow-2xl animate-pulse">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">memory</span>
                <span className="text-[10px] font-mono text-gray-300">HBM3_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-primary/40 group cursor-pointer hover:text-primary transition-colors">
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Access Database</span>
        <div className="size-8 rounded-full border border-current flex items-center justify-center animate-bounce">
          <span className="material-symbols-outlined text-sm">arrow_downward</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
