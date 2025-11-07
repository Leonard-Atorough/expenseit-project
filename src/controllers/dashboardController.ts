import initDashboard2 from "../ui/views/dashboard";
import type { Router } from "../router/Router";
import type { AppStore } from "../store/appStore";
import type { Expense } from "../models/expense";

export async function createDashboardController(
  store: AppStore,
  router: Router,
  container: HTMLDivElement
): Promise<DashboardController> {
  const placeholder: Partial<DashboardController> = {};
  const dashboard = await initDashboard2(
    container,
    store,
    placeholder as DashboardController
  );

  async function addTransaction(raw: Omit<Expense, "id">) {
    console.log("addTransaction called with:", raw);
    const id = crypto.randomUUID();
    const newExpense: Expense = { ...raw, id: id };

    (await store).setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
  }

  function init() {
    store.subscribe(() => dashboard.render());
    dashboard.render();
  }

  const controller: DashboardController = {
    init,
    addTransaction,
  };

  Object.assign(placeholder, controller);

  return controller;
}

export interface DashboardController {
  init(): void;
  addTransaction(raw: Omit<Expense, "id">): Promise<void>;
}
