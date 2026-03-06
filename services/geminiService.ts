
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithArchitect = async (message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the "AI Assistant" for Oscar Alexander Casas Alfonso's portfolio. 
            Oscar is a Software Developer and AI Engineer with expertise in:
            - AI & Backend: Python, FastAPI, LangChain, LangGraph, Sentence-Transformers.
            - Frontend: React 19, TypeScript, PWA.
            - Infrastructure: Docker, PostgreSQL, Redis, RabbitMQ, Nginx.
            
            Key Projects:
            1. Inventory SystemTrace: An analytics platform for developers that synchronizes data from GitHub (commits, pull requests, repositories) and generates productivity metrics through interactive dashboards. Built with TypeScript, Next.js, and NestJS.
            2. DevMetrics: A centralized inventory management system for electric mobility workshops, featuring Agentic Workflows and Multimodal AI (Google Gemini API) for spare parts identification. Built with Python and LLM Agents.
            
            Your speech is technical, helpful, and futuristic. Help users understand Oscar's specific implementations and technical choices.`,
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};
