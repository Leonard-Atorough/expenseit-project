import initTransactions from "../ui/views/transactions";
import type { Router } from "../router/Router";
import type { AppStore } from "../store/appStore";
import type { Expense } from "../models/expense";

export async function createTransactionController(
  store: AppStore,
  router: Router,
  container: HTMLDivElement
): Promise<TransactionController> {
  const placeholder: Partial<TransactionController> = {};
  const transactions = await initTransactions(
    container,
    store,
    placeholder as TransactionController
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

  async function editTransaction(params: Expense) {
    const state = (await store).getState();

    const oldExpenses = state.expenses.filter(
      (expense) => expense.id !== params.id
    );

    (await store).setState((prev) => ({
      ...prev,
      expenses: [...oldExpenses, params],
      formMode: "create",
      selectedExpenseId: null,
    }));
  }

  async function deleteTransaction(expenseId: string) {
    (await store).setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((x) => x.id !== expenseId),
    }));
  }

  async function setIsEditing(expense: string) {
    (await store).setState((prev) => ({
      ...prev,
      formMode: "edit",
      selectedExpenseId: expense,
    }));
  }

  function init() {
    store.subscribe(() => transactions.render());
    transactions.render();
  }

  const controller: TransactionController = {
    init,
    addTransaction,
    editTransaction,
    setIsEditing,
    deleteTransaction
  };

  Object.assign(placeholder, controller);

  return controller;
}

export interface TransactionController {
  init(): void;
  addTransaction(raw: Omit<Expense, "id">): Promise<void>;
  editTransaction(params: Expense): Promise<void>;
  setIsEditing(expenseId: string): Promise<void>;
  deleteTransaction(expenseId: string): Promise<void>
}
