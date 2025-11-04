export function initHeader(root: HTMLElement) {
  const render = () => {
    const header = document.createElement("header");
    header.classList.add("header-banner");

    const title = document.createElement("h1");
    title.textContent = "Expenses Dashboard";
    title.classList.add("title");

    header.append(title);
    const rootParent = root.parentNode;

    rootParent?.insertBefore(header, root);
  };

  render();
}
