import initDashboard2  from "../ui/views/dashboard";
import type { Router } from "../router/Router";
import type { AppStore } from "../store/appStore";

export async function createDashboardController(
  state: AppStore,
  router: Router,
  container: HTMLDivElement
): Promise<DashboardController> {
  const placeholder: Partial<DashboardController> = {};
  const dashboard = await initDashboard2(
    container,
    state,
    placeholder as DashboardController
  );

  function init() {
    state.subscribe(() => dashboard.render());
    dashboard.render();
  }

  const controller: DashboardController = {
    init,
  };

  return controller;
}

export interface DashboardController {
  init(): void;
}
