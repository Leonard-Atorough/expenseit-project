import type { Expense } from "../../../models/expense";
import { createExpenseRow } from "./expenseRow";
import styles from "./expenseTable.module.css";

export const mountExpenseTable = (
  expenses: Expense[],
  setIsEditing: (expenseId: string) => Promise<void>,
  handleDelete: (expenseId: string) => Promise<void>
): HTMLTableElement => {
  const table = document.createElement("table");
  table.classList.add(styles["expense-table"]);

  const headings = ["Description", "Amount", "Date", "Category", "Actions"];

  table.innerHTML = `
    <thead>
      <tr>
        ${headings
          .map((h) => `<th class=${styles["expense-table__header"]}>${h}</th>`)
          .join("")}
      </tr> 
    </thead>
  `;
  table.appendChild(mountTableBody(expenses, setIsEditing, handleDelete));

  return table;
};

const mountTableBody = (
  expenses: Expense[],
  setIsEditing: (expenseId: string) => Promise<void>,
  handleDelete: (expenseId: string) => Promise<void>
): HTMLTableSectionElement => {
  const tableBody = document.createElement("tbody");
  tableBody.classList.add("expense-table__body");

  const expenseRows = expenses.map((expense, idx) =>
    createExpenseRow(expense, idx % 2 !== 0, { setIsEditing, handleDelete })
  );

  tableBody.append(...expenseRows);

  return tableBody;
};
