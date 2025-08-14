import React, { FC } from "react";

interface TableItemsPerPageProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

/**
 * Componente para seleção de itens por página
 */
const TableItemsPerPage: FC<TableItemsPerPageProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 25, 50, 100],
}) => {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
      <span>Mostrar</span>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
      >
        {itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value={-1}>Todos</option>
      </select>
      <span>itens por página</span>
    </div>
  );
};

export default TableItemsPerPage;
