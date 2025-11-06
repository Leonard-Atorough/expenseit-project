export function initAside(root: HTMLElement) {
  render(root);
}
const render = (root: HTMLElement) => {
  const aside = document.createElement("aside");
  aside.classList.add("main-sidebar");
  aside.id = "main-sidebar";
  root.appendChild(aside);
};

export function Aside() {
  return `
    <aside class="main-sidebar">
    </aside>
    `;
}
