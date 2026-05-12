import { gsap } from 'gsap';
import { ScrollObserver } from '@animations/ScrollObserver';
import { aboutContent } from '@data/content';

export class About {
  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    const stats = aboutContent.stats
      .map(s => `
        <div class="about__stat">
          <span class="stat__number">${s.number}</span>
          <span class="stat__label">${s.label}</span>
        </div>
      `)
      .join('');

    const paragraphs = aboutContent.paragraphs
      .map(p => `<p class="about__p">${p}</p>`)
      .join('');

    const headingLines = aboutContent.heading.split('\n');

    this.container.innerHTML = `
      <div class="about__inner">
        <div class="about__bg-text" aria-hidden="true">ABOUT</div>
        <div class="about__grid">
          <div class="about__portrait">
            <div class="about__portrait-glow"></div>
            <div class="about__portrait-frame">
              <img src="${import.meta.env.BASE_URL}profile.jpg" alt="Kalana" loading="lazy" />
            </div>
            <div class="about__portrait-tag">
              <span class="tag-label">Based in</span>
              <span class="tag-value">Colombo, Sri Lanka</span>
            </div>
          </div>
          <div class="about__content">
            <div class="about__header">
              <span class="section-label">${aboutContent.label}</span>
              <h2 class="about__heading">
                ${headingLines.map(l => `<span class="heading-line">${l}</span>`).join('<br>')}
              </h2>
            </div>
            <div class="about__paragraphs">
              ${paragraphs}
            </div>
            <blockquote class="about__quote">
              <div class="quote-glow"></div>
              <p>${aboutContent.quote}</p>
            </blockquote>
            <div class="about__stats">
              ${stats}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  animate(): void {
    ScrollObserver.parallax(
      this.container.querySelector('.about__bg-text')!,
      -20
    );

    gsap.from('.about__portrait-frame', {
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.about__portrait-tag', {
      opacity: 0,
      x: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    ScrollObserver.fadeUp('.about__header', '#about');

    gsap.from('.about__p', {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about__paragraphs',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.about__quote', {
      opacity: 0,
      x: -20,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about__quote',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.about__stat', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.about__stats',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
}
