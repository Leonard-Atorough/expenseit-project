import { Header } from "./header";
import { Aside } from "./aside";
import { Main } from "./main";

import type { Router } from "../../router/Router";

let viewRoot: HTMLDivElement;

const NAV_ID = "mainNavbar";

export function InitAppLayout(
  router: Router,
  rootId: string = "app"
): HTMLDivElement {
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

  const nav = document.getElementById(NAV_ID);

  nav?.addEventListener("click", (e) => {
    e.preventDefault();

    const link = (e.target as Element).closest("a[href]");

    const route = link?.getAttribute("href") ?? "/";
    console.log(route);
    
    router.navigate(route);
  });

  return viewRoot;
}

// export function mount(content: Node) {
//   while (viewRoot.firstChild) {
//     viewRoot.removeChild(viewRoot.firstChild);
//   }

//   viewRoot.appendChild(content);
// }
