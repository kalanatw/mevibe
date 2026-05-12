import { gsap } from 'gsap';
import { skillNodes, skillBars, techCloud } from '@data/skills';
import { sectionLabels } from '@data/content';
import { isMobile } from '@utils/viewport';

export class Skills {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animId = 0;
  private time = 0;

  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    const bars = skillBars.map(s => `
      <div class="skill-bar" data-percent="${s.percent}">
        <div class="skill-bar__header">
          <span class="skill-bar__name">${s.name}</span>
          <span class="skill-bar__percent">${s.percent}%</span>
        </div>
        <div class="skill-bar__track">
          <div class="skill-bar__fill"></div>
        </div>
      </div>
    `).join('');

    const tags = techCloud.map(t => `<span class="skills__tech-tag">${t}</span>`).join('');

    this.container.innerHTML = `
      <div class="skills__inner">
        <div class="skills__header">
          <span class="section-label">${sectionLabels.skills}</span>
          <h2 class="section-heading">${sectionLabels.skillsHeading}</h2>
        </div>
        <div class="skills__layout">
          <div class="skills__orbital-wrap">
            <canvas id="skills-canvas"></canvas>
            <div class="skills__orbital-center">
              <span class="center-label">Core Stack</span>
              <span class="center-value">19+ Skills</span>
            </div>
          </div>
          <div class="skills__bars">
            ${bars}
          </div>
        </div>
        <div class="skills__tech-cloud">
          <span class="skills__tech-label">Full Technology Stack</span>
          <div class="skills__tech-tags">
            ${tags}
          </div>
        </div>
      </div>
    `;
  }

  animate(): void {
    gsap.from('.skills__header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.skill-bar', {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills__bars',
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => this.animateBars(),
      },
    });

    gsap.from('.skills__tech-tag', {
      scale: 0.8,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.skills__tech-cloud',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    if (!isMobile()) {
      this.initOrbitalCanvas();
    }
  }

  private animateBars(): void {
    this.container.querySelectorAll('.skill-bar').forEach(bar => {
      const percent = bar.getAttribute('data-percent') ?? '0';
      const fill = bar.querySelector<HTMLElement>('.skill-bar__fill');
      if (fill) {
        gsap.to(fill, {
          width: `${percent}%`,
          duration: 1.3,
          ease: 'power3.out',
          delay: 0.1,
        });
      }
    });
  }

  private initOrbitalCanvas(): void {
    this.canvas = this.container.querySelector<HTMLCanvasElement>('#skills-canvas');
    if (!this.canvas) return;

    const resize = () => {
      if (!this.canvas) return;
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    this.ctx = this.canvas.getContext('2d');
    this.loopOrbital();
  }

  private loopOrbital(): void {
    this.animId = requestAnimationFrame(() => this.loopOrbital());
    this.time += 0.005;
    this.drawOrbital();
  }

  private drawOrbital(): void {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    ctx.clearRect(0, 0, W, H);

    const radii = [W * 0.18, W * 0.32, W * 0.45];
    const speeds = [0.4, -0.25, 0.15];
    const ringColors = ['rgba(0,212,255,0.12)', 'rgba(0,212,255,0.08)', 'rgba(0,212,255,0.05)'];

    radii.forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = ringColors[i];
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,212,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,212,255,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    for (const node of skillNodes) {
      const r = radii[node.ring];
      const speed = speeds[node.ring];
      const angle = ((node.angle * Math.PI) / 180) + this.time * speed;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,212,255,0.9)';
      ctx.fill();

      ctx.font = `500 11px 'JetBrains Mono', monospace`;
      ctx.fillStyle = 'rgba(240,240,245,0.75)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const labelOffset = 16;
      const lx = cx + (r + labelOffset) * Math.cos(angle);
      const ly = cy + (r + labelOffset) * Math.sin(angle);
      ctx.fillText(node.name, lx, ly);
    }
  }
}
