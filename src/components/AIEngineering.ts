import { gsap } from 'gsap';
import { sectionLabels } from '@data/content';

const diagrams = {
  multiAgent: `
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Orchestrator -->
      <rect x="100" y="10" width="80" height="30" rx="6" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" fill="rgba(0,212,255,0.05)"/>
      <text x="140" y="29" text-anchor="middle" fill="rgba(0,212,255,0.8)" font-size="9" font-family="JetBrains Mono">ORCHESTRATOR</text>
      <!-- Agents -->
      <rect x="20" y="80" width="60" height="28" rx="5" stroke="rgba(0,212,255,0.25)" stroke-width="1" fill="rgba(0,212,255,0.03)"/>
      <text x="50" y="98" text-anchor="middle" fill="rgba(200,200,220,0.7)" font-size="8" font-family="JetBrains Mono">TRAINING</text>
      <rect x="110" y="80" width="60" height="28" rx="5" stroke="rgba(0,212,255,0.25)" stroke-width="1" fill="rgba(0,212,255,0.03)"/>
      <text x="140" y="98" text-anchor="middle" fill="rgba(200,200,220,0.7)" font-size="8" font-family="JetBrains Mono">DEPLOY</text>
      <rect x="200" y="80" width="60" height="28" rx="5" stroke="rgba(0,212,255,0.25)" stroke-width="1" fill="rgba(0,212,255,0.03)"/>
      <text x="230" y="98" text-anchor="middle" fill="rgba(200,200,220,0.7)" font-size="8" font-family="JetBrains Mono">PREDICT</text>
      <!-- Lines -->
      <line class="arch-path" x1="140" y1="40" x2="50" y2="80" stroke="rgba(0,212,255,0.35)" stroke-width="1" stroke-dasharray="200"/>
      <line class="arch-path" x1="140" y1="40" x2="140" y2="80" stroke="rgba(0,212,255,0.35)" stroke-width="1" stroke-dasharray="200"/>
      <line class="arch-path" x1="140" y1="40" x2="230" y2="80" stroke="rgba(0,212,255,0.35)" stroke-width="1" stroke-dasharray="200"/>
    </svg>
  `,
  rag: `
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Nodes row -->
      <rect x="5" y="45" width="44" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="27" y="63" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="7.5" font-family="JetBrains Mono">DOCS</text>
      <rect x="62" y="45" width="44" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="84" y="63" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="7.5" font-family="JetBrains Mono">EMBED</text>
      <rect x="119" y="45" width="44" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="141" y="63" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="7.5" font-family="JetBrains Mono">VEC DB</text>
      <rect x="176" y="45" width="44" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="198" y="63" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="7.5" font-family="JetBrains Mono">LLM</text>
      <rect x="233" y="45" width="44" height="28" rx="5" stroke="rgba(0,212,255,0.35)" stroke-width="1.5" fill="rgba(0,212,255,0.07)"/>
      <text x="255" y="63" text-anchor="middle" fill="rgba(0,212,255,0.8)" font-size="7.5" font-family="JetBrains Mono">OUTPUT</text>
      <!-- Arrows -->
      <polyline class="arch-path" points="49,59 62,59" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" marker-end="url(#arrow)" stroke-dasharray="100"/>
      <polyline class="arch-path" points="106,59 119,59" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" stroke-dasharray="100"/>
      <polyline class="arch-path" points="163,59 176,59" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" stroke-dasharray="100"/>
      <polyline class="arch-path" points="220,59 233,59" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" stroke-dasharray="100"/>
    </svg>
  `,
  realtime: `
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Source -->
      <rect x="10" y="46" width="52" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="36" y="64" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="8" font-family="JetBrains Mono">SOURCE</text>
      <!-- Kafka -->
      <rect x="78" y="46" width="52" height="28" rx="5" stroke="rgba(0,212,255,0.35)" stroke-width="1.5" fill="rgba(0,212,255,0.06)"/>
      <text x="104" y="64" text-anchor="middle" fill="rgba(0,212,255,0.85)" font-size="8" font-family="JetBrains Mono">KAFKA</text>
      <!-- NiFi -->
      <rect x="146" y="46" width="52" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="172" y="64" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="8" font-family="JetBrains Mono">NiFi</text>
      <!-- Storage -->
      <rect x="214" y="46" width="56" height="28" rx="5" stroke="rgba(0,212,255,0.3)" stroke-width="1" fill="rgba(0,212,255,0.04)"/>
      <text x="242" y="64" text-anchor="middle" fill="rgba(200,200,220,0.6)" font-size="8" font-family="JetBrains Mono">STORAGE</text>
      <!-- Connections -->
      <line class="arch-path" x1="62" y1="60" x2="78" y2="60" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" stroke-dasharray="100"/>
      <line class="arch-path" x1="130" y1="60" x2="146" y2="60" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" stroke-dasharray="100"/>
      <line class="arch-path" x1="198" y1="60" x2="214" y2="60" stroke="rgba(0,212,255,0.4)" stroke-width="1.5" stroke-dasharray="100"/>
      <!-- Pulse dots -->
      <circle cx="70" cy="60" r="3" fill="rgba(0,212,255,0.6)"/>
      <circle cx="138" cy="60" r="3" fill="rgba(0,212,255,0.6)"/>
      <circle cx="206" cy="60" r="3" fill="rgba(0,212,255,0.6)"/>
    </svg>
  `,
};

const cards = [
  {
    number: '01',
    title: 'Multi-Agent Orchestration',
    desc: 'LangGraph-orchestrated workflows where specialized agents collaborate — ingesting data, training models via Driverless AI, deploying through H2O MLOps, and surfacing predictions through conversational interfaces.',
    diagram: diagrams.multiAgent,
  },
  {
    number: '02',
    title: 'RAG Pipeline Design',
    desc: 'End-to-end retrieval-augmented generation systems: document ingestion → embedding → vector database → retrieval → LLM synthesis, with multimodal outputs and full source traceability.',
    diagram: diagrams.rag,
  },
  {
    number: '03',
    title: 'Real-time Data Systems',
    desc: 'Apache Kafka + NiFi streaming pipelines enabling real-time document ingestion, event-driven processing triggers, and live analytics at production scale.',
    diagram: diagrams.realtime,
  },
];

export class AIEngineering {
  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    const cardHTML = cards.map(c => `
      <div class="ai-card">
        <div class="ai-card__diagram">${c.diagram}</div>
        <div class="ai-card__body">
          <span class="ai-card__number">${c.number}</span>
          <h3 class="ai-card__title">${c.title}</h3>
          <p class="ai-card__desc">${c.desc}</p>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="ai__inner">
        <div class="ai__header">
          <span class="section-label">${sectionLabels.ai}</span>
          <h2 class="section-heading">${sectionLabels.aiHeading}</h2>
        </div>
        <p class="ai__subtext">${sectionLabels.aiSubtext}</p>
        <div class="ai__cards">
          ${cardHTML}
        </div>
        <div class="ai__philosophy">
          <p class="ai__philosophy-text">
            "The goal is not to replace human intelligence — it's to amplify it. Every system I build is designed to make the person using it feel superhuman."
          </p>
          <span class="ai__philosophy-author">— Kalana</span>
        </div>
      </div>
    `;
  }

  animate(): void {
    gsap.from('.ai__header, .ai__subtext', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#ai-engineering',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.ai-card', {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ai__cards',
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => this.drawSVGPaths(),
      },
    });

    gsap.from('.ai__philosophy', {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ai__philosophy',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  }

  private drawSVGPaths(): void {
    setTimeout(() => {
      this.container.querySelectorAll('.arch-path').forEach((path, i) => {
        const el = path as SVGGeometryElement;
        const len = 200;
        gsap.fromTo(el,
          { strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            delay: i * 0.08,
            ease: 'power2.out',
          }
        );
      });
    }, 300);
  }
}
