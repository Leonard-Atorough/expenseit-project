import { Header } from "./header";
import { Aside } from "./aside";
import { Main } from "./main";

let viewRoot: HTMLDivElement;

export function InitAppLayout(rootId: string = "app"): HTMLDivElement {
  const appRoot = document.getElementById(rootId);

  if (!appRoot) {
    console.error("Missing app root element: #app");
    throw new Error("Missing #app container");
  }

  appRoot.innerHTML = `
    ${Header()}
    <div class="main-body">
      ${Aside()}
      ${Main()}
    </div>
  `;

  viewRoot = document.querySelector(".main-content") as HTMLDivElement;
  console.log(viewRoot);
  return viewRoot;
}

export function mount(content: Node) {
  while (viewRoot.firstChild) {
    viewRoot.removeChild(viewRoot.firstChild);
  }

  viewRoot.appendChild(content);
}
