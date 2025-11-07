import type { DashboardController } from "../../controllers/dashboardController";
import { AppStore } from "../../store/appStore";
import { mountAddExpenseForm } from "../components/expenseForm/expenseForm";
import { mountExpenseTable } from "../components/expenseTable/expenseTable";

import styles from "./dashboard.module.css";

const formId = "addExpenseForm";

export default async function initDashboard2(
  root: HTMLDivElement,
  state: AppStore,
  controller: DashboardController
) {
  async function render() {
    const { expenses, mode } = state.getState();

    root.innerHTML = "";

    const dashboard = document.createElement("div");
    dashboard.classList.add(styles["dashboard-view"]);

    const formContainer = document.createElement("div");
    formContainer.id = formId;
    formContainer.classList.add(styles["expense-form-container"]);
    formContainer.appendChild(
      mountAddExpenseForm({
        onSubmit: controller.addTransaction,
        isEditing: mode,
      })
    );

    const table = mountExpenseTable(expenses);

    dashboard.append(formContainer, table);
    root.appendChild(dashboard);
  }
  return { render };
}
