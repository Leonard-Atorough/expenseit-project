import type { DashboardController } from "../../controllers/dashboardController";
import type { Expense } from "../../models/expense";
import type { AppStore } from "../../store/appStore";

import styles from "./dashboard.module.css";

export default async function InitDashboard(
  root: HTMLDivElement,
  store: AppStore,
  controller: DashboardController
) {
  async function render() {
    const { expenses } = store.getState();

    root.innerHTML = "";

    const summaryTabs = document.createElement("div");
    summaryTabs.classList.add(styles["summary-tabs"]);

    const expenseAmount = createSummaryTab(
      (
        expenses.reduce<number>((acc, crr) => acc + crr.amountCents, 0) / 100
      ).toFixed(2),
      "Expenses",
      "£"
    );

    const transactionCount = createSummaryTab(
      expenses.length.toString(),
      "Transactions"
    );

    summaryTabs.append(expenseAmount, transactionCount);

    root.appendChild(summaryTabs);
  }

  return { render };
}
function createSummaryTab(value: string, title: string, sign?: string) {
  const summaryTab = document.createElement("div");
  summaryTab.classList.add(styles["summary-tabs__tab"]);

  const content = document.createElement("div");
  content.classList.add(styles["summary-tabs__content"]);
  content.textContent = `${sign ?? ""}${value}`;

  const t = document.createElement("p");
  t.classList.add(styles["summary-tabs__title"]);
  t.textContent = title;

  summaryTab.append(content, title);
  return summaryTab;
}
