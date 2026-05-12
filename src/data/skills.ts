export interface SkillNode {
  name: string;
  ring: 0 | 1 | 2;
  angle: number;
}

export const skillNodes: SkillNode[] = [
  // Inner ring — Core Languages
  { name: 'Python', ring: 0, angle: 0 },
  { name: 'TypeScript', ring: 0, angle: 120 },
  { name: 'Java', ring: 0, angle: 240 },

  // Middle ring — AI/ML Stack
  { name: 'LangGraph', ring: 1, angle: 0 },
  { name: 'LangChain', ring: 1, angle: 51 },
  { name: 'OpenAI', ring: 1, angle: 102 },
  { name: 'FastAPI', ring: 1, angle: 153 },
  { name: 'Django', ring: 1, angle: 204 },
  { name: 'React', ring: 1, angle: 255 },
  { name: 'Node.js', ring: 1, angle: 306 },

  // Outer ring — Infrastructure
  { name: 'Docker', ring: 2, angle: 0 },
  { name: 'AWS', ring: 2, angle: 40 },
  { name: 'Kafka', ring: 2, angle: 80 },
  { name: 'NiFi', ring: 2, angle: 120 },
  { name: 'PostgreSQL', ring: 2, angle: 160 },
  { name: 'MongoDB', ring: 2, angle: 200 },
  { name: 'NGINX', ring: 2, angle: 240 },
  { name: 'Linux', ring: 2, angle: 280 },
  { name: 'Git', ring: 2, angle: 320 },
];

export interface SkillBar {
  name: string;
  percent: number;
}

export const skillBars: SkillBar[] = [
  { name: 'AI / ML Engineering', percent: 92 },
  { name: 'Backend Development', percent: 88 },
  { name: 'Data Engineering', percent: 80 },
  { name: 'Cloud & DevOps', percent: 78 },
  { name: 'Frontend Development', percent: 75 },
  { name: 'XR / Immersive Tech', percent: 72 },
];

export const techCloud = [
  'Python', 'TypeScript', 'Java', 'Node.js', 'React',
  'FastAPI', 'Django', 'Spring',
  'LangGraph', 'LangChain', 'OpenAI', 'CrewAI', 'HuggingFace',
  'RAG', 'Agentic AI', 'TensorFlow', 'Keras',
  'Apache Kafka', 'Apache NiFi',
  'Docker', 'AWS', 'PostgreSQL', 'MongoDB',
  'NVIDIA Omniverse', 'CloudXR', 'Oculus Quest',
  'NGINX', 'Git', 'Linux',
];
