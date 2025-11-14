import type { Expense } from "../../../models/expense";
import { AppStore } from "../../../store/appStore";

import styles from "./expenseRow.module.css";

type expenseRowHandlerProps = {
  setIsEditing: (expenseId: string) => Promise<void>;
  handleDelete: (expenseId: string) => Promise<void>;
};

export const createExpenseRow = (
  expense: Expense,
  isAlternative: boolean,
  handlers: expenseRowHandlerProps
): HTMLTableRowElement => {
  const tableRow = document.createElement("tr");
  tableRow.id = expense.id;
  tableRow.classList.add(styles["expense-table-row"]);
  if (isAlternative) tableRow.classList.add(`${styles["-alternate"]}`);

  tableRow.innerHTML = `
    <td class=${styles.cell}>${expense.description}</td>
    <td class=${styles.cell}>${(expense.amountCents / 100)
    .toFixed(2)
    .toString()}</td>
    <td class=${styles.cell}>${expense.date}</td>
    <td class=${styles.cell}>${expense.category ?? "(Empty)"}</td>
  `;

  tableRow.appendChild(createTableActionsRow());

  attachClickHandlers(tableRow, expense.id, {
    setIsEditing: handlers.setIsEditing,
    handleDelete: handlers.handleDelete,
  });

  return tableRow;
};

const createTableActionsRow = (): HTMLTableCellElement => {
  const cell = document.createElement("td");
  cell.classList.add(styles.cell);

  addButton(cell, { name: "edit", icon: "fa-solid fa-pencil" });
  addButton(cell, { name: "delete", icon: "fa-solid fa-trash" });

  return cell;
};

const addButton = (
  parent: HTMLTableCellElement,
  options: {
    name: string;
    icon: string;
  }
): void => {
  const button = document.createElement("button");
  button.id = options.name;
  button.classList.add(styles.button);
  const icon = document.createElement("i");
  icon.className = options.icon;
  button.appendChild(icon);
  parent.appendChild(button);
};

const attachClickHandlers = (
  row: HTMLTableRowElement,
  expenseId: string,
  handlers: expenseRowHandlerProps
) => {
  row.addEventListener("click", async (e) => {
    e.preventDefault();
    if ((e.target as HTMLElement).closest("#delete")) {
      handlers.handleDelete(expenseId);
    } else if ((e.target as HTMLElement).closest("#edit")) {
      handlers.setIsEditing(expenseId);
    }
  });
};
