import type { AppStore } from "../store/appStore";
import InitDashboard from "../ui/views/dashboard";

export async function CreateDashboardController(
  store: AppStore,
  container: HTMLDivElement
): Promise<DashboardController> {
  const placeholder: Partial<DashboardController> = {};
  const dashboard = await InitDashboard(
    container,
    store,
    placeholder as DashboardController
  );

  function init() {
    store.subscribe(() => dashboard.render());
    dashboard.render();
  }

  const controller: DashboardController = {
    init,
  };

  Object.assign(placeholder, controller);

  return controller;
}

export interface DashboardController {
  init(): void;
}
