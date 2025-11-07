import { InitAppLayout } from "./ui/layout/appLayout";
import { CreateRouter } from "./router/Router";
import { createDashboardController } from "./controllers/dashboardController";
import { AppStore } from "./store/appStore";

// async function initApp(container: HTMLElement) {
//   initHeader(container);
//   initAside(container);
//   const { element: dashboard, cleanup } = await initDashboard();
//   initMain(container, dashboard);
//   //   return cleanup;
// }

// const run = async () => {
//   document.addEventListener("DOMContentLoaded", async () => {
//     const appRoot = document.getElementById("app");
//     if (!appRoot) {
//       console.error("Missing app root element: #app");
//       throw new Error("Missing #app container");
//     }

//     const cleanup = await initApp(appRoot);

//     // Optionally handle cleanup on unload
//     window.addEventListener("beforeunload", () => {
//       //   cleanup();
//     });
//   });
// };
// run();

const router = CreateRouter();
const contentRoot = InitAppLayout(router);
const store = AppStore;

router.register("/", async () => {
  const controller = await createDashboardController(
    await store,
    router,
    contentRoot
  );
  controller.init();
});

router.register("/dashboard", async () => {
  const controller = await createDashboardController(
    await store,
    router,
    contentRoot
  );
  controller.init();
});

router.register("/transactions", () => {
  contentRoot.innerHTML = "<h2>Transactions page – coming soon</h2>";
});

router.register("/account", () => {
  contentRoot.innerHTML = "<h2>Account page – coming soon</h2>";
});

router.register("/settings", () => {
  contentRoot.innerHTML = "<h2>Settings page – coming soon</h2>";
});

router.register("*", () => router.navigate("/"));
router.navigate(window.location.pathname || "/");
