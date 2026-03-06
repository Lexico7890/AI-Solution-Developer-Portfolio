
import React, { useState, useRef, useEffect } from 'react';
import { chatWithArchitect } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithArchitect(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error: System link lost.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-surface border border-primary/30 rounded shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-primary/10 border-b border-primary/20 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm animate-pulse">monitoring</span>
              <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">System Interface</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[300px]">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 font-mono text-[10px] mt-12 uppercase">
                Awaiting user initialization...
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary/20 border border-primary/40 text-primary-200' 
                    : 'bg-surface border border-gray-700 text-gray-300 font-mono'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface border border-gray-700 p-3 rounded animate-pulse">
                  <span className="text-xs font-mono text-primary tracking-widest">THINKING...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-background-dark border-t border-gray-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query system..."
              className="flex-1 bg-surface border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={handleSend}
              className="bg-primary/20 border border-primary/50 text-primary p-2 rounded hover:bg-primary/30"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative size-14 bg-surface border border-primary/30 rounded-full flex items-center justify-center hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
          <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">terminal</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
