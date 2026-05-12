export class TypeWriter {
  private strings: string[];
  private element: HTMLElement;
  private currentIndex = 0;
  private currentText = '';
  private isDeleting = false;
  private typeSpeed = 65;
  private deleteSpeed = 35;
  private pauseDuration = 2200;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private cursor: HTMLSpanElement;

  constructor(element: HTMLElement, strings: string[]) {
    this.element = element;
    this.strings = strings;
    this.cursor = document.createElement('span');
    this.cursor.className = 'typewriter-cursor';
    this.cursor.textContent = '|';
    this.element.after(this.cursor);
  }

  start(): void {
    this.tick();
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private tick(): void {
    const fullString = this.strings[this.currentIndex];
    const delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting) {
      this.currentText = fullString.slice(0, this.currentText.length + 1);
    } else {
      this.currentText = fullString.slice(0, this.currentText.length - 1);
    }

    this.element.textContent = this.currentText;

    if (!this.isDeleting && this.currentText === fullString) {
      this.timer = setTimeout(() => {
        this.isDeleting = true;
        this.tick();
      }, this.pauseDuration);
      return;
    }

    if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.strings.length;
      this.timer = setTimeout(() => this.tick(), 400);
      return;
    }

    this.timer = setTimeout(() => this.tick(), delay);
  }
}
