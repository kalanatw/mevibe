import { gsap } from 'gsap';

export class Loader {
  private container: HTMLElement;
  private onCompleteCallback: (() => void) | null = null;
  private progressFill: HTMLElement | null = null;
  private progress = 0;

  constructor(private body: HTMLElement) {
    this.container = document.getElementById('loader')!;
  }

  onComplete(cb: () => void): void {
    this.onCompleteCallback = cb;
  }

  mount(): void {
    this.container.innerHTML = `
      <svg class="loader__monogram" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 12 L20 68 M20 40 L48 12 M20 40 L52 68"
          stroke="#00d4ff"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="loader__label">Initializing systems</span>
      <div class="loader__progress-track">
        <div class="loader__progress-fill" id="loader-progress"></div>
      </div>
    `;

    this.progressFill = document.getElementById('loader-progress');
  }

  animate(): void {
    const path = this.container.querySelector<SVGPathElement>('path');
    const label = this.container.querySelector<HTMLElement>('.loader__label');

    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(label, { opacity: 1, duration: 0.4 });
          this.simulateProgress();
        },
      });
    } else {
      this.simulateProgress();
    }
  }

  private simulateProgress(): void {
    const duration = 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      this.progress = Math.min(100, (elapsed / duration) * 100);

      if (this.progressFill) {
        this.progressFill.style.width = `${this.progress}%`;
      }

      if (this.progress < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => this.exit(), 300);
      }
    };

    requestAnimationFrame(tick);
  }

  private exit(): void {
    gsap.to(this.container, {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        this.container.style.display = 'none';
        this.onCompleteCallback?.();
      },
    });
  }
}
