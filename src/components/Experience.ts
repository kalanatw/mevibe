import { gsap } from 'gsap';
import { ScrollObserver } from '@animations/ScrollObserver';
import { experienceData } from '@data/experience';
import { sectionLabels } from '@data/content';

export class Experience {
  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    const items = experienceData.map(item => `
      <div class="timeline__item">
        <div class="timeline__dot ${item.current ? 'timeline__dot--current' : ''}"></div>
        <div class="timeline__meta">
          <span class="timeline__period">${item.period}</span>
        </div>
        <div class="timeline__card">
          <div class="timeline__company-row">
            <span class="timeline__company">${item.company}</span>
            ${item.current ? '<span class="timeline__current-badge">Current</span>' : ''}
          </div>
          <div class="timeline__role">${item.role}</div>
          <ul class="timeline__highlights">
            ${item.highlights.map(h => `<li class="timeline__highlight">${h}</li>`).join('')}
          </ul>
          <div class="timeline__tech">
            ${item.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="experience__inner">
        <div class="experience__header">
          <span class="section-label">${sectionLabels.experience}</span>
          <h2 class="section-heading">${sectionLabels.experienceHeading}</h2>
        </div>
        <div class="experience__timeline">
          <div class="timeline__track">
            <div class="timeline__line-fill"></div>
          </div>
          ${items}
        </div>
      </div>
    `;
  }

  animate(): void {
    ScrollObserver.fadeUp('.experience__header', '#experience');

    const lineEl = this.container.querySelector('.timeline__line-fill');
    const timelineEl = this.container.querySelector('.experience__timeline');
    if (lineEl && timelineEl) {
      ScrollObserver.drawLine(lineEl, timelineEl);
    }

    gsap.from('.timeline__item', {
      x: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.experience__timeline',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }
}
