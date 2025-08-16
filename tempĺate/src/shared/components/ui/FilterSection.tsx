import React, { FC, ReactNode } from "react";
import ReportButton from "./ReportButton";
import { ReportActions } from "../../types";
import { Button } from 'primereact/button';

interface FilterSectionProps {
  children: ReactNode;
  advancedFilters?: ReactNode;
  onSearch: () => void;
  onClear: () => void;
  isLoading: boolean;
  isSearchDisabled: boolean;
  description?: string;
  reportActions?: ReportActions;
  showAdvanced: boolean;
  onShowAdvancedChange: (show: boolean) => void;
}

/**
 * Seção de filtros reutilizável com filtros básicos, avançados (opcionais) e ações.
 */
const FilterSection: FC<FilterSectionProps> = ({
  children,
  advancedFilters,
  onSearch,
  onClear,
  isLoading,
  isSearchDisabled,
  description,
  reportActions,
  showAdvanced,
  onShowAdvancedChange,
}) => {
  return (
    <div
      className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-lg border border-white/30 dark:border-slate-700/80 mb-12"
      style={{ zIndex: 12 }}
    >
      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 -mt-2">
          {description}
        </p>
      )}
      {children}
      {advancedFilters && (
        <>
          <div className="mt-4">
            <Button
              onClick={() => onShowAdvancedChange(!showAdvanced)}
              label={showAdvanced ? "Ocultar Filtros Avançados" : "Filtros Avançados"}
              icon="pi pi-sliders-h"
              className="p-button-text text-cyan-600 dark:text-cyan-400"
            />
          </div>
          {showAdvanced && (
            <div className="border-t border-slate-200/80 dark:border-slate-700/80 pt-6 mt-6 animate-fade-in-down">
              {advancedFilters}
            </div>
          )}
        </>
      )}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
        {/* Botões secundários à esquerda */}
        <div className="flex flex-col sm:flex-row gap-3 order-2 sm:order-1">
          <Button
            onClick={onClear}
            label="Limpar Filtros"
            icon="pi pi-filter-slash"
            className="p-button-secondary"
          />
          {reportActions && <ReportButton actions={reportActions} />}
        </div>

        {/* Botão primário à direita */}
        <div className="order-1 sm:order-2">
          <Button
            onClick={onSearch}
            label={isLoading ? "Consultando..." : "Consultar"}
            icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-search"}
            disabled={isLoading || isSearchDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
