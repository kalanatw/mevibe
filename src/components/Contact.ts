import { gsap } from 'gsap';
import { MagneticHover } from '@animations/MagneticHover';
import { sectionLabels } from '@data/content';

const socials = [
  {
    platform: 'GitHub',
    handle: 'github.com/kalana',
    href: 'https://github.com',
    icon: `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
  {
    platform: 'LinkedIn',
    handle: 'linkedin.com/in/kalana-w',
    href: 'https://www.linkedin.com/in/kalana-w',
    icon: `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    platform: 'Email',
    handle: 'kalanathathsara99@gmail.com',
    href: 'mailto:kalanathathsara99@gmail.com',
    icon: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
];

export class Contact {
  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    const socialHTML = socials.map(s => `
      <a href="${s.href}" class="social-link" target="_blank" rel="noopener noreferrer">
        <div class="social-link__icon">${s.icon}</div>
        <div class="social-link__info">
          <span class="social-link__platform">${s.platform}</span>
          <span class="social-link__handle">${s.handle}</span>
        </div>
        <span class="social-link__arrow">↗</span>
      </a>
    `).join('');

    this.container.innerHTML = `
      <div class="contact__inner">
        <div class="contact__grid">
          <div class="contact__left">
            <div class="contact__header">
              <span class="section-label">${sectionLabels.contact}</span>
              <h2 class="section-heading">${sectionLabels.contactHeading}</h2>
            </div>
            <p class="contact__subtext">${sectionLabels.contactSubtext}</p>
            <div class="contact__socials">
              ${socialHTML}
            </div>
          </div>
          <div class="contact__right">
            <form class="contact__form" id="contact-form">
              <div class="form-group">
                <label class="form-label" for="form-name">Your Name</label>
                <input class="form-input" id="form-name" type="text" placeholder="John Doe" autocomplete="name" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="form-email">Email Address</label>
                <input class="form-input" id="form-email" type="email" placeholder="john@company.com" autocomplete="email" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="form-message">Message</label>
                <textarea class="form-textarea" id="form-message" placeholder="Tell me about your project..." required></textarea>
              </div>
              <div class="form-success" id="form-success">
                ✓ Message sent! I'll get back to you soon.
              </div>
              <button type="submit" class="form-submit" id="form-submit">
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    this.bindForm();
  }

  private bindForm(): void {
    const form = this.container.querySelector<HTMLFormElement>('#contact-form');
    const success = this.container.querySelector<HTMLElement>('#form-success');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector<HTMLButtonElement>('#form-submit');
      if (btn) btn.textContent = 'Sending...';

      setTimeout(() => {
        if (success) success.classList.add('visible');
        form.reset();
        if (btn) {
          btn.innerHTML = `Sent ✓`;
          setTimeout(() => {
            btn.innerHTML = `Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
          }, 3000);
        }
      }, 800);
    });
  }

  animate(): void {
    gsap.from('.contact__left > *', {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.contact__right', {
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    const magnetic = new MagneticHover();
    const submitBtn = this.container.querySelector<HTMLElement>('#form-submit');
    if (submitBtn) magnetic.attach([submitBtn]);
  }
}
