import type { ResponsiveListColumn } from "../../types";
import "./ResponsiveListTable.css";

interface ResponsiveListTableProps<T> {
  items: T[];
  columns: ResponsiveListColumn<T>[];
  get_id: (item: T) => string;
  on_select?: (item: T) => void;
}

export function ResponsiveListTable<T>({
  items,
  columns,
  get_id,
  on_select,
}: ResponsiveListTableProps<T>) {
  return (
    <table className="responsive-list-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ textAlign: col.align ?? "start", width: col.width }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const id = get_id(item);
          const clickable = Boolean(on_select);
          return (
            <tr
              key={id}
              className={clickable ? "responsive-list-row-clickable" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? () => on_select?.(item) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        on_select?.(item);
                      }
                    }
                  : undefined
              }
            >
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align ?? "start" }}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
