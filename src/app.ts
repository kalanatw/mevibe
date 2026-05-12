import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from '@components/Loader';
import { Navigation } from '@components/Navigation';
import { Hero } from '@components/Hero';
import { About } from '@components/About';
import { Experience } from '@components/Experience';
import { Projects } from '@components/Projects';
import { Skills } from '@components/Skills';
import { AIEngineering } from '@components/AIEngineering';
import { Contact } from '@components/Contact';
import { Footer } from '@components/Footer';

export class App {
  private loader!: Loader;

  init(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.loader = new Loader(document.body);
    this.loader.mount();
    this.loader.animate();

    this.loader.onComplete(() => {
      this.mountAll();
    });
  }

  private mountAll(): void {
    const sections: Array<{ new(el: HTMLElement): { init(): void; mount(): void; animate(): void } }> = [];

    const nav = new Navigation(document.querySelector('#nav')!);
    nav.init(); nav.mount(); nav.animate();

    const components = [
      new Hero(document.querySelector('#hero')!),
      new About(document.querySelector('#about')!),
      new Experience(document.querySelector('#experience')!),
      new Projects(document.querySelector('#projects')!),
      new Skills(document.querySelector('#skills')!),
      new AIEngineering(document.querySelector('#ai-engineering')!),
      new Contact(document.querySelector('#contact')!),
      new Footer(document.querySelector('#footer')!),
    ];

    void sections;

    for (const c of components) {
      c.init();
      c.mount();
      c.animate();
    }
  }
}
