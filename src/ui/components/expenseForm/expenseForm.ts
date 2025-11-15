import { createExpenseModel, type Expense } from "../../../models/expense";
import { AppStore } from "../../../store/appStore";

import styles from "./expenseForm.module.css";

export interface ExpenseFormProps {
  onSubmit: (handler: Omit<Expense, "id">) => Promise<void>;
  onEdit: (handler: Expense) => Promise<void>;
  mode: string;
  selectedExpense: string;
}

export const mountAddExpenseForm = (
  props: ExpenseFormProps
): HTMLFormElement => {
  const { onSubmit, onEdit, mode, selectedExpense } = props;
  const form = createForm();

  if (mode === "edit") {
    handleEditMode(form, selectedExpense);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const payload: Omit<Expense, "id"> = {
      description: fd.get("desc") as string,
      amountCents: Math.round(parseFloat(fd.get("amount") as string) * 100),
      date: fd.get("date") as string,
      category: fd.get("category") as string,
    };
    if (mode === "edit") {
      await onEdit({ ...payload, id: selectedExpense });
      resetForm(form);
    } else {
      await onSubmit(payload);
      resetForm(form);
    }
  });

  return form;
};

function resetForm(form: HTMLFormElement) {
  form.reset();
  form.id = "";

  const button = form.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement;
  button.textContent = "Add";
  button.classList.remove(styles["-edit"]);
}

async function handleEditMode(
  form: HTMLFormElement,
  selectedExpenseId: string
): Promise<void> {
  const expense = (await AppStore)
    .getState()
    .expenses.filter((expense) => expense.id === selectedExpenseId)[0];

  if (!expense) return;

  form.reset();

  form.id = expense.id;
  (form.elements.namedItem("desc") as HTMLInputElement).value =
    expense.description;
  (form.elements.namedItem("amount") as HTMLInputElement).value = (
    expense.amountCents / 100
  ).toFixed(2);
  (form.elements.namedItem("date") as HTMLInputElement).value = expense.date;
  (form.elements.namedItem("category") as HTMLSelectElement).value =
    expense.category ?? "";
  const button = form.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement;
  button.textContent = "Edit";
  button.classList.add(styles["-edit"]);
}

function createForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add(`${styles["add-form"]}`);

  const descInput = createInput({
    name: "desc",
    placeholder: "Description...",
    required: true,
  });
  const amountInput = createInput({
    name: "amount",
    type: "number",
    step: "0.01",
    required: true,
  });
  const dateInput = createInput({ name: "date", type: "date", required: true });

  const categorySelect = createCategorySelect();

  const button = document.createElement("button");
  button.classList.add(`${styles.button}`);
  button.type = "submit";
  button.textContent = "Add";

  const fragement = new DocumentFragment();
  fragement.append(descInput, amountInput, dateInput, categorySelect, button);
  form.appendChild(fragement);

  return form;
}

const createInput = (options: {
  name: string;
  type?: string;
  placeholder?: string;
  step?: string;
  required?: boolean;
}): HTMLInputElement => {
  const input = document.createElement("input");
  input.classList.add(`${styles.input}`);
  input.name = options.name;
  input.type = options.type ?? "text";
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.step) input.step = options.step;
  if (options.required) input.required = options.required;
  return input;
};

function createCategorySelect(): HTMLSelectElement {
  const select = document.createElement("select");
  select.classList.add(styles.input);
  select.name = "category";

  const DEFAULT_CATEGORY_MAP = [
    "Food & Drink",
    "Transportation",
    "Housing",
    "Health & Wellness",
    "Entertainment",
    "Travel",
    "Education",
    "Personal Care",
    "Pets",
    "Savings & Investments",
    "Miscellaneous",
    "Other",
  ];

  for (const category of DEFAULT_CATEGORY_MAP) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  }

  return select;
}
