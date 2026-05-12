import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticHover } from '@animations/MagneticHover';
import { projectsData } from '@data/projects';
import { sectionLabels } from '@data/content';

export class Projects {
  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    const cards = projectsData.map(p => `
      <div class="project-card"
           style="--accent: ${p.accent}; --accent-rgb: ${p.accentRgb};"
           data-id="${p.id}">
        <div class="project-card__glow"></div>
        <span class="project-card__category">${p.category}</span>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__subtitle">${p.subtitle}</p>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__footer">
          <span class="project-card__highlight">${p.highlight}</span>
          <div class="project-card__tech">
            ${p.tech.slice(0, 4).map(t => `<span class="project-card__tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="projects__inner">
        <div class="projects__header">
          <span class="section-label">${sectionLabels.projects}</span>
          <h2 class="section-heading">${sectionLabels.projectsHeading}</h2>
        </div>
        <div class="projects__grid">
          ${cards}
        </div>
      </div>
    `;
  }

  animate(): void {
    gsap.from('.projects__header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    ScrollTrigger.batch('.project-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
        });
      },
      start: 'top 88%',
    });

    const magnetic = new MagneticHover();
    const cards = this.container.querySelectorAll('.project-card');
    magnetic.attach(cards);
  }
}
