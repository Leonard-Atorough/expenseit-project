import type { Expense } from "../../../models/expense";
import { createExpenseRow } from "./expenseRow";
import styles from "./expenseTable.module.css";

export const mountExpenseTable = (expenses: Expense[]): HTMLTableElement => {
  const table = document.createElement("table");
  table.classList.add(styles["expense-table"]);

  const headings = ["DESCRIPTION", "AMOUNT", "DATE", "CATEGORY", "ACTIONS"];

  table.innerHTML = `
    <thead>
      <tr>
        ${headings
          .map((h) => `<th class=${styles["expense-table-heading"]}>${h}</th>`)
          .join("")}
      </tr> 
    </thead>
    <tbody class=${["expense-table-body"]}>
      ${expenses
        .map(
          (expense, idx) => createExpenseRow(expense, idx % 2 !== 0).outerHTML
        )
        .join("")}
    </tbody>
  `;

  return table;
};
