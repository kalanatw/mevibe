import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class ScrollObserver {
  static fadeUp(
    elements: string | Element | Element[],
    trigger: string | Element,
    stagger = 0,
    delay = 0
  ): void {
    gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  static batch(selector: string, options?: { stagger?: number; y?: number }): void {
    ScrollTrigger.batch(selector, {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: options?.y ?? 60,
          opacity: 0,
          stagger: options?.stagger ?? 0.1,
          duration: 0.85,
          ease: 'power3.out',
        });
      },
      start: 'top 88%',
    });
  }

  static drawLine(element: Element, trigger: Element): void {
    gsap.set(element, { scaleY: 0 });
    gsap.to(element, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });
  }

  static parallax(element: Element, yPercent: number): void {
    gsap.to(element, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}
