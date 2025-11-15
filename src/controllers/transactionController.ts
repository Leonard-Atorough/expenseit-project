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

  async function editTransaction(expense: Expense) {
    if (!expense) {
      console.error("Cannot edit expense. No expense to edit supplied.");
    }

    try {
      const s = (await store) as AppStore;
      let edited = false;

      s.setState((prev) => {
        const exists = prev.expenses.some((e) => e.id === expense.id);
        if (!exists) {
          console.error(
            `Could not edit expense ${expense.description}. It does not exist.`
          );
          return { ...prev, formMode: "create", selectedExpenseId: null };
        }
        edited = true;
        const old = prev.expenses.filter((o) => o.id !== expense.id);
        return {
          ...prev,
          expenses: [...old, expense],
          formMode: "create",
          selectedExpenseId: null,
        };
      });
    } catch (err) {
      console.error("Attempted expense edit failed:", err);
    }
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
    deleteTransaction,
  };

  Object.assign(placeholder, controller);

  return controller;
}

export interface TransactionController {
  init(): void;
  addTransaction(raw: Omit<Expense, "id">): Promise<void>;
  editTransaction(params: Expense): Promise<void>;
  setIsEditing(expenseId: string): Promise<void>;
  deleteTransaction(expenseId: string): Promise<void>;
}
