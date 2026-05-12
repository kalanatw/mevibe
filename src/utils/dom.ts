export function qs<T extends Element = Element>(selector: string, parent: Element | Document = document): T {
  const el = parent.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

export function qsa<T extends Element = Element>(selector: string, parent: Element | Document = document): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Partial<Record<string, string>> = {},
  ...children: (string | Node)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== undefined) element.setAttribute(key, value);
  }
  for (const child of children) {
    if (typeof child === 'string') {
      element.insertAdjacentHTML('beforeend', child);
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

export function setHTML(element: Element, html: string): void {
  element.innerHTML = html;
}
