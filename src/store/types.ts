import type { Expense } from "../models/expense";

// export interface ExpenseState {
//   expenses: Expense[];
// }

// export interface UIState {
//   isLoading: boolean;
//   selectedCountry?: string;
// }

type FormMode = "create" | "edit";

export interface AppState {
  expenses: Expense[];
  isLoading: boolean;
  formMode: FormMode;
  selectedExpenseId?: string | null;
  selectedCountry?: string;
}
