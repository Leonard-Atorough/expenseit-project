import type { TransactionController } from "../../controllers/transactionController";
import { AppStore } from "../../store/appStore";
import { mountAddExpenseForm } from "../components/expenseForm/expenseForm";
import { mountExpenseTable } from "../components/expenseTable/expenseTable";

import styles from "./transactions.module.css";

const formId = "addExpenseForm";

export default async function initDashboard(
  root: HTMLDivElement,
  state: AppStore,
  controller: TransactionController
) {
  async function render() {
    const { expenses, formMode, selectedExpenseId } = state.getState();

    root.innerHTML = "";

    const dashboard = document.createElement("div");
    dashboard.classList.add(styles["transactions-view"]);

    const formContainer = document.createElement("div");
    formContainer.id = formId;
    formContainer.classList.add(styles["expense-form-container"]);
    formContainer.innerHTML = "<h2>Add Expense</h2>";
    formContainer.appendChild(
      mountAddExpenseForm({
        onSubmit: controller.addTransaction,
        onEdit: controller.editTransaction,
        mode: formMode,
        selectedExpense: selectedExpenseId!,
      })
    );

    const table = mountExpenseTable(
      expenses,
      controller.setIsEditing,
      controller.deleteTransaction
    );

    dashboard.append(formContainer, table);
    root.appendChild(dashboard);
  }
  return { render };
}
