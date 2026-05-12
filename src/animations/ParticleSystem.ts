import { isMobile } from '@utils/viewport';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX = -9999;
  private mouseY = -9999;
  private animationId = 0;
  private connectionDistance = 120;
  private mouseRepelRadius = 150;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.spawnParticles();
    this.bindEvents();
  }

  private get particleCount(): number {
    return isMobile() ? 30 : 80;
  }

  private resize(): void {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  private spawnParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  private bindEvents(): void {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    window.addEventListener('resize', () => {
      this.resize();
      this.spawnParticles();
    });
  }

  start(): void {
    this.loop();
  }

  stop(): void {
    cancelAnimationFrame(this.animationId);
  }

  private loop(): void {
    this.animationId = requestAnimationFrame(() => this.loop());
    this.update();
    this.draw();
  }

  private update(): void {
    for (const p of this.particles) {
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouseRepelRadius) {
        const force = (this.mouseRepelRadius - dist) / this.mouseRepelRadius;
        p.vx += (dx / dist) * force * 0.08;
        p.vy += (dy / dist) * force * 0.08;
      }

      const maxSpeed = 1.2;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!isMobile()) {
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const a = this.particles[i];
          const b = this.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.connectionDistance) {
            const alpha = (1 - dist / this.connectionDistance) * 0.15;
            this.ctx.beginPath();
            this.ctx.moveTo(a.x, a.y);
            this.ctx.lineTo(b.x, b.y);
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }
    }

    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      this.ctx.fill();
    }
  }
}
