import { gsap } from 'gsap';

export class MagneticHover {
  private elements: HTMLElement[] = [];

  attach(elements: HTMLElement[] | NodeListOf<Element>): void {
    const els = Array.from(elements) as HTMLElement[];
    for (const el of els) {
      this.elements.push(el);
      this.bindElement(el);
    }
  }

  private bindElement(el: HTMLElement): void {
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  }
}
