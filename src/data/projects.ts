export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlight: string;
  accent: string;
  accentRgb: string;
  category: string;
}

export const projectsData: Project[] = [
  {
    id: 'vertical-ai',
    title: 'Vertical AI Agents',
    subtitle: 'Full-stack agentic AI platform',
    description:
      'RAG-powered conversational agents with tool-calling, multi-turn memory, and voice integration via OpenAI Whisper API. Self-hosted TTS (Kokoro/HuggingFace) for low-latency voice responses. Production-deployed on AWS EC2 with Django and FastAPI backends.',
    tech: ['Agentic AI', 'RAG', 'OpenAI', 'CrewAI', 'FastAPI', 'Django', 'React'],
    highlight: 'Production-deployed on AWS',
    accent: '#00d4ff',
    accentRgb: '0, 212, 255',
    category: 'AI Agent',
  },
  {
    id: 'omniverse',
    title: 'Omniverse & AI Integration',
    subtitle: 'Digital twin platform with AI',
    description:
      "First real-time chatbot inside NVIDIA Omniverse with custom UI. Dynamic object placement via Apache Kafka + Cesium, VR for Oculus Quest using CloudXR SDK, multi-user scene collaboration via NVIDIA Nucleus, and physics-enabled character controllers.",
    tech: ['NVIDIA Omniverse', 'Python', 'Apache Kafka', 'CloudXR', 'AWS', 'React', 'Java'],
    highlight: 'VR + Real-time Digital Twins',
    accent: '#7b68ee',
    accentRgb: '123, 104, 238',
    category: 'XR',
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot Systems',
    subtitle: 'Enterprise-grade conversational AI',
    description:
      'Full-stack chatbot applications with RAG, agentic frameworks, and multi-turn dialogue management. Voice bots with Whisper speech-to-text and self-hosted Kokoro TTS. Django/FastAPI backends with PostgreSQL, deployed across dev and production AWS environments.',
    tech: ['LangChain', 'OpenAI', 'Django', 'FastAPI', 'PostgreSQL', 'React'],
    highlight: 'Low-latency voice + text AI',
    accent: '#c9a84c',
    accentRgb: '201, 168, 76',
    category: 'AI Agent',
  },
  {
    id: 'awis',
    title: 'AWIS — Whale AI',
    subtitle: 'Computer vision classification system',
    description:
      'VGG16-based deep learning system for pilot whale species identification achieving 95%+ classification accuracy. Custom dataset curation, Keras/TensorFlow training pipeline, Flask API for real-time inference, and seamless user interface for image uploads.',
    tech: ['VGG16', 'Keras', 'TensorFlow', 'Flask', 'Kaggle', 'HuggingFace'],
    highlight: '95%+ classification accuracy',
    accent: '#2dce89',
    accentRgb: '45, 206, 137',
    category: 'ML',
  },
];
