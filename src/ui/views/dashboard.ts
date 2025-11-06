import type { DashboardController } from "../../controllers/dashboardController";
import type { Expense } from "../../models/expense";
import { AppStore } from "../../store/appStore";
import {
  mountAddExpenseForm,
  mountAddExpenseForm2,
} from "../components/expenseForm/expenseForm";
import {
  createExpenseRow,
  createExpenseRow2,
} from "../components/expenseTable/expenseRow";
import {
  mountExpenseTable,
  mountExpenseTable2,
} from "../components/expenseTable/expenseTable";

import styles from "./dashboard.module.css";

const formId = "addExpenseForm";

export async function initDashboard(): Promise<{
  element: HTMLDivElement;
  cleanup: () => void;
}> {
  const { addExpenseForm, table } = BuildUI();

  const unsubscribe = (await AppStore).subscribe((state) => {
    const tableBody = table.tBodies[0];
    tableBody.innerHTML = "";
    state.expenses.forEach((expense: Expense, idx: number) =>
      tableBody.appendChild(createExpenseRow2(expense, idx % 2 !== 0))
    );
  });

  const dashboard = document.createElement("div");
  dashboard.classList.add(styles["dashboard-view"]);
  dashboard.append(addExpenseForm, table);

  return {
    element: dashboard,
    cleanup: async () => {
      unsubscribe();
      (await AppStore).dispose();
    },
  };
}

function BuildUI() {
  const addExpenseForm = document.createElement("div");
  addExpenseForm.id = formId;
  addExpenseForm.className = styles["expense-form-container"];
  mountAddExpenseForm(addExpenseForm);

  const table = mountExpenseTable();

  return { addExpenseForm, table };
}

export default async function initDashboard2(
  root: HTMLDivElement,
  state: AppStore,
  controller: DashboardController
) {
  async function render() {
    const expenses = state.getState().expenses;

    root.innerHTML = `
      <div class="dashboard-view">
        <div id="${formId}" class=${styles["expense-form-container"]}>
          ${mountAddExpenseForm2()}
        </div>
        ${mountExpenseTable2(expenses).outerHTML}
      </div>
    `;
  }
  return { render };
}
