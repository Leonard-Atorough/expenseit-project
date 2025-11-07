import { InitAppLayout } from "./ui/layout/appLayout";
import { CreateRouter } from "./router/Router";
import { createTransactionController } from "./controllers/transactionController";
import { AppStore } from "./store/appStore";

const router = CreateRouter();
const contentRoot = InitAppLayout(router);
const store = AppStore;

router.register("/", async () => {
  const controller = await createTransactionController(
    await store,
    router,
    contentRoot
  );
  controller.init();
});

router.register("/transactions", async () => {
  const controller = await createTransactionController(
    await store,
    router,
    contentRoot
  );
  controller.init();
});

router.register("/dashboard", async () => {
  contentRoot.innerHTML = "<h2>Dashboard page – coming soon</h2>";
});

router.register("/account", () => {
  contentRoot.innerHTML = "<h2>Account page – coming soon</h2>";
});

router.register("/settings", () => {
  contentRoot.innerHTML = "<h2>Settings page – coming soon</h2>";
});

router.register("*", () => router.navigate("/"));
router.navigate(window.location.pathname || "/");
