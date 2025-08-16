import React, { FC } from "react";

export type SortDirection = "asc" | "desc" | null;

interface TableSortProps {
  column: string;
  currentSort: { column: string; direction: SortDirection };
  onSort: (column: string, direction: SortDirection) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente para cabeçalhos de tabela com ordenação
 */
const TableSort: FC<TableSortProps> = ({
  column,
  currentSort,
  onSort,
  children,
  className = "",
}) => {
  const isActive = currentSort.column === column;
  const direction = isActive ? currentSort.direction : null;

  const handleClick = () => {
    let newDirection: SortDirection;

    if (!isActive) {
      newDirection = "asc";
    } else if (direction === "asc") {
      newDirection = "desc";
    } else if (direction === "desc") {
      newDirection = null;
    } else {
      newDirection = "asc";
    }

    onSort(column, newDirection);
  };

  return (
    <th
      onClick={handleClick}
      className={`px-6 py-3 cursor-pointer select-none hover:bg-slate-200/80 dark:hover:bg-slate-600/80 transition-colors text-center relative ${className}`}
    >
      <div className="flex items-center justify-center">
        <span className="text-center font-semibold">{children}</span>
        <div className="flex flex-col items-center ml-3">
          <i
            className={`pi pi-chevron-up transition-colors ${
              direction === "asc"
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-slate-400 dark:text-slate-500"
            }`}
          />
          <i
            className={`pi pi-chevron-down transition-colors -mt-1 ${
              direction === "desc"
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-slate-400 dark:text-slate-500"
            }`}
          />
        </div>
      </div>
    </th>
  );
};

export default TableSort;
