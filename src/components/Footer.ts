export class Footer {
  constructor(private container: HTMLElement) {}

  init(): void {}

  mount(): void {
    this.container.innerHTML = `
      <div class="footer__inner">
        <div class="footer__gradient-line"></div>
        <div class="footer__monogram">K.</div>
        <p class="footer__text">Kalana &nbsp;·&nbsp; Built with TypeScript + Vite &nbsp;·&nbsp; 2025</p>
      </div>
    `;
  }

  animate(): void {}
}
