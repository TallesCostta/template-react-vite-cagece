import { FC } from "react";
import { Paginator } from "primereact/paginator";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

/**
 * Componente de paginação para tabelas com seleção de itens por página
 */
const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
}) => {
  const first = (currentPage - 1) * itemsPerPage;

  const onPageChangePrime = (event: { first: number; page: number, rows: number }) => {
    onPageChange(event.page + 1);
    onItemsPerPageChange(event.rows);
  };

  const template = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = itemsPerPageOptions.map((option) => ({
        label: option,
        value: option,
      }));

      return (
        <div className="flex items-center">
          <span className="mr-2 text-sm text-slate-600 dark:text-slate-400">Itens por página:</span>
          <select
            value={options.value}
            onChange={options.onChange}
            className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
          >
            {dropdownOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    },
    CurrentPageReport: (options: any) => {
      return (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {options.first} - {options.last} de {options.totalRecords} resultados
        </span>
      );
    },
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-lg border border-white/30 dark:border-slate-700/80">
       <Paginator
        first={first}
        rows={itemsPerPage}
        totalRecords={totalItems}
        rowsPerPageOptions={itemsPerPageOptions}
        onPageChange={onPageChangePrime}
        template={template}
        className="w-full bg-transparent"
      />
    </div>
  );
};

export default TablePagination;
