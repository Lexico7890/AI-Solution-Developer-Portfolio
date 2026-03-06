
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Trazea',
    description: 'Centralized inventory management system for electric mobility workshops, allowing real-time tracking of spare parts, usage reasoning, and operational records across multiple locations with Agentic Workflows.',
    tech: ['Python', 'Google Gemini API', 'LLM Agents', 'Speech Processing', 'PostgreSQL', 'LangGraph', 'TypeScript', 'Tailwind'],
    metrics: { label: 'AI Agent', value: 'Multimodal' }
  },
  {
    id: '2',
    title: 'DevMetrics',
    description: 'Analytics platform for developers that synchronizes data from GitHub (commits, pull requests, repositories) and generates productivity metrics, development patterns and performance through interactive dashboards.',
    tech: ['TypeScript', 'Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'RabbitMQ', 'BullMQ', 'Docker Compose', 'Nginx', 'Turborepo', 'Tailwind CSS'],
    metrics: { label: 'Sync Rate', value: 'Incremental' }
  }
];
