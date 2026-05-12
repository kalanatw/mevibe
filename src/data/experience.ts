export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  highlights: string[];
  tech: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'h2o',
    company: 'H2O.ai',
    role: 'Machine Learning Engineer',
    period: 'Aug 2025 — Present',
    current: true,
    highlights: [
      'Engineered OpenWebUI × H2OGPTE integration layer enabling RAG workflows, document ingestion, and multimodal outputs with traceable document references.',
      'Built Marketing Insight Agent: customer lifetime value prediction, churn modeling, segmentation analytics, and LLM-based email generation using FastAPI, H2O Wave, and Driverless AI.',
      'Architected Predictive AI Agent Platform with LangGraph — multi-agent ML workflow orchestrating model training via Driverless AI, deployment through H2O MLOps, and real-time conversational prediction interface.',
      'Developed Transaction Monitoring Agent with real-time fraud detection, anomaly scoring, and LLM-powered summarization dashboards for actionable business insights.',
    ],
    tech: ['LangGraph', 'FastAPI', 'H2O Wave', 'Driverless AI', 'H2O MLOps', 'Python', 'React', 'RAG'],
  },
  {
    id: 'cove',
    company: 'Cove Island',
    role: 'Python Engineer',
    period: 'Jul 2024 — Aug 2025',
    current: false,
    highlights: [
      'Built advanced physics-based character controllers in NVIDIA Omniverse and led development of the platform\'s first real-time chatbot. Enabled dynamic object placement in digital twin environments via Apache Kafka + Cesium.',
      'Developed VR applications for Oculus Quest using NVIDIA CloudXR SDK; built low-latency web streaming of Omniverse sessions via TURN servers on AWS EC2.',
      'Designed real-time document ingestion pipelines with Apache NiFi and Kafka. Deployed and fine-tuned local LLMs (Qwen, Colpali) in secure AWS environments as cost-effective OpenAI alternatives.',
      'Built AI chatbot systems with OpenAI, LangChain, Django, and FastAPI backends. Mentored team members, delivered MVPs under tight deadlines to onboard new U.S.-based clients.',
    ],
    tech: ['NVIDIA Omniverse', 'Python', 'Apache Kafka', 'Apache NiFi', 'CloudXR', 'OpenAI', 'LangChain', 'Django', 'FastAPI', 'Docker', 'AWS', 'PostgreSQL'],
  },
];
