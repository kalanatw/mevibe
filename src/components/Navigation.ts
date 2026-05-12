export class Navigation {
  private container: HTMLElement;
  private hamburger: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private isMenuOpen = false;
  private links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  init(): void {}

  mount(): void {
    this.container.innerHTML = `
      <div class="nav__inner">
        <div class="nav__logo" data-scroll-to="hero">
          K<span>.</span>
        </div>
        <nav class="nav__links">
          ${this.links.map(l => `<a class="nav__link" href="#${l.toLowerCase()}">${l}</a>`).join('')}
        </nav>
        <a href="#contact" class="nav__cta">Let's Talk</a>
        <button class="nav__hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav__mobile-menu">
        ${this.links.map(l => `<a class="nav__mobile-link" href="#${l.toLowerCase()}">${l}</a>`).join('')}
      </div>
    `;

    this.hamburger = this.container.querySelector('.nav__hamburger');
    this.mobileMenu = this.container.querySelector('.nav__mobile-menu');
  }

  animate(): void {
    this.bindScrollBehavior();
    this.bindHamburger();
    this.bindActiveSection();
    this.bindLogoScroll();
  }

  private bindScrollBehavior(): void {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        this.container.classList.add('scrolled');
      } else {
        this.container.classList.remove('scrolled');
      }
    });
  }

  private bindHamburger(): void {
    if (!this.hamburger || !this.mobileMenu) return;

    this.hamburger.addEventListener('click', () => {
      this.isMenuOpen = !this.isMenuOpen;
      this.hamburger!.classList.toggle('open', this.isMenuOpen);
      this.mobileMenu!.classList.toggle('open', this.isMenuOpen);
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    });

    this.mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        this.isMenuOpen = false;
        this.hamburger!.classList.remove('open');
        this.mobileMenu!.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  private bindActiveSection(): void {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = this.container.querySelectorAll('.nav__link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(section => observer.observe(section));
  }

  private bindLogoScroll(): void {
    const logo = this.container.querySelector('.nav__logo');
    logo?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
