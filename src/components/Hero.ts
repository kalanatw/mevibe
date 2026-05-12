import { gsap } from 'gsap';
import { ParticleSystem } from '@animations/ParticleSystem';
import { TypeWriter } from '@animations/TypeWriter';
import { MagneticHover } from '@animations/MagneticHover';
import { heroContent } from '@data/content';

export class Hero {
  private particles: ParticleSystem | null = null;
  private typeWriter: TypeWriter | null = null;

  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    this.container.innerHTML = `
      <canvas id="particle-canvas"></canvas>
      <div class="hero__bg-word">BUILD</div>
      <div class="hero__content">
        <div class="hero__eyebrow">${heroContent.eyebrow}</div>
        <h1 class="hero__name">${heroContent.name}<span class="name-accent">.</span></h1>
        <div class="hero__tagline">
          <span class="hero__static">I build&nbsp;</span>
          <span class="hero__typewriter" id="typewriter"></span>
        </div>
        <p class="hero__subtext">${heroContent.subtext}</p>
        <div class="hero__actions">
          <a href="#projects" class="btn btn--primary hero__btn-primary">${heroContent.ctaPrimary}</a>
          <a href="#contact" class="btn btn--ghost hero__btn-secondary">${heroContent.ctaSecondary}</a>
        </div>
      </div>
      <div class="hero__scroll-indicator">
        <span>Scroll</span>
        <div class="hero__scroll-line"></div>
      </div>
    `;
  }

  animate(): void {
    const canvas = this.container.querySelector<HTMLCanvasElement>('#particle-canvas');
    if (canvas) {
      this.particles = new ParticleSystem(canvas);
      this.particles.start();
    }

    const typewriterEl = this.container.querySelector<HTMLElement>('#typewriter');
    if (typewriterEl) {
      this.typeWriter = new TypeWriter(typewriterEl, heroContent.typewriterStrings);
      setTimeout(() => this.typeWriter!.start(), 1400);
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__eyebrow', { y: 30, opacity: 0, duration: 0.8 }, 0.2)
      .from('.hero__name', { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, 0.4)
      .from('.hero__tagline', { y: 40, opacity: 0, duration: 0.9 }, 0.7)
      .from('.hero__subtext', { y: 30, opacity: 0, duration: 0.8 }, 0.9)
      .from('.hero__actions', { y: 30, opacity: 0, duration: 0.8 }, 1.05)
      .from('.hero__scroll-indicator', { opacity: 0, duration: 1 }, 1.5)
      .from('.hero__bg-word', { opacity: 0, duration: 1.5 }, 0.3);

    const magnetic = new MagneticHover();
    const btns = this.container.querySelectorAll('.btn');
    magnetic.attach(btns);
  }
}
