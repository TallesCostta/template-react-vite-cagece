import React, { ReactNode, useState, useMemo } from "react";
import TableCard from "./TableCard";
import TablePagination from "./TablePagination";
import TableSort, { SortDirection } from "./TableSort";
import TableItemsPerPage from "./TableItemsPerPage";

interface ResponsiveTableProps<T> {
  columns: {
    key: string;
    header: string;
    className?: string;
    sortable?: boolean;
  }[];
  data: T[];
  renderCard: (item: T, variant?: "mobile" | "tablet") => ReactNode;
  renderRow: (item: T) => ReactNode;
  noResultsMessage?: string;
  cardLayout?: "grid" | "list";
  showPagination?: boolean;
  defaultItemsPerPage?: number;
  itemsPerPageOptions?: number[];
}

/**
 * Tabela responsiva que renderiza como tabela em desktop e como cartões em mobile/tablet.
 */
const ResponsiveTable = <T extends { id: string | number }>({
  columns,
  data,
  renderCard,
  renderRow,
  noResultsMessage = "Nenhum resultado encontrado.",
  cardLayout = "list",
  showPagination = true,
  defaultItemsPerPage = 25,
  itemsPerPageOptions = [5, 10, 25, 50, 100, -1],
}: ResponsiveTableProps<T>) => {
  // Estados para paginação e ordenação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sort, setSort] = useState<{
    column: string;
    direction: SortDirection;
  }>({
    column: "",
    direction: null,
  });

  // Função para ordenar dados
  const sortData = (data: T[], column: string, direction: SortDirection) => {
    if (!direction || !column) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as any)[column];
      const bValue = (b as any)[column];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue, "pt-BR");
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue), "pt-BR");
      }

      return direction === "asc" ? comparison : -comparison;
    });
  };

  // Dados ordenados
  const sortedData = useMemo(() => {
    return sortData(data, sort.column, sort.direction);
  }, [data, sort]);

  // Dados paginados
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;

    // Se itemsPerPage for -1 (Todos), retornar todos os dados
    if (itemsPerPage === -1) return sortedData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  // Resetar página quando dados mudam
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Função para lidar com ordenação
  const handleSort = (column: string, direction: SortDirection) => {
    setSort({ column, direction });
    setCurrentPage(1); // Resetar para primeira página ao ordenar
  };

  // Função para mudar página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Função para mudar itens por página
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetar para primeira página
  };

  if (data.length === 0) {
    return (
      <div className="text-center p-8 text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 rounded-lg">
        <div className="flex flex-col items-center justify-center gap-2">
          <i className="pi pi-inbox text-slate-400" style={{ fontSize: '24px' }}></i>
          <span>{noResultsMessage}</span>
        </div>
      </div>
    );
  }

  const totalPages =
    itemsPerPage === -1 ? 1 : Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Seleção de itens por página - Desktop */}
      {showPagination && data.length > 0 && (
        <div className="hidden lg:flex justify-end">
          <TableItemsPerPage
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={itemsPerPageOptions}
          />
        </div>
      )}

      {/* Desktop View (lg e acima) */}
      <div className="hidden lg:block bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-slate-700/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm responsive-table">
            <thead className="bg-slate-100/80 dark:bg-slate-700/80 text-xs text-slate-700 dark:text-slate-300 uppercase font-semibold">
              <tr>
                {columns.map((col) =>
                  col.sortable ? (
                    <TableSort
                      key={col.key}
                      column={col.key}
                      currentSort={sort}
                      onSort={handleSort}
                      className={`${col.className || ""}`}
                    >
                      {col.header}
                    </TableSort>
                  ) : (
                    <th
                      key={col.key}
                      scope="col"
                      className={`px-6 py-4 text-center font-semibold ${
                        col.className || ""
                      }`}
                    >
                      {col.header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paginatedData.map((item) => renderRow(item))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet View (md até lg) - Cards em grid */}
      <div className="hidden md:block lg:hidden">
        <div
          className={`grid grid-cols-1 ${
            cardLayout === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : ""
          } gap-4`}
        >
          {paginatedData.map((item) => renderCard(item, "tablet"))}
        </div>
      </div>

      {/* Mobile View (abaixo de md) - Cards em coluna */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((item) => renderCard(item, "mobile"))}
      </div>

      {/* Paginação */}
      {showPagination && data.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={itemsPerPageOptions}
        />
      )}
    </div>
  );
};

export default ResponsiveTable;
