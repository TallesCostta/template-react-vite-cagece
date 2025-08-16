import React, { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "../../types";
import { Button } from 'primereact/button';

interface PageHeaderProps {
  title: string;
  icon?: IconType;
  showBackButton?: boolean;
  actions?: ReactNode;
}

/**
 * Cabeçalho padrão para as páginas internas, com título, ícone e botão de voltar opcional.
 */
const PageHeader: FC<PageHeaderProps> = ({
  title,
  icon,
  showBackButton = true,
  actions,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between mb-8"
      style={{ zIndex: 15 }}
    >
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            icon="pi pi-arrow-left"
            onClick={() => navigate(-1)}
            className="p-button-rounded p-button-text"
          />
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            {title}
          </h1>
          {icon && (
            <div className="flex items-center">
               <i className={`${icon} text-cyan-500`} style={{ fontSize: '32px' }}></i>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">{actions}</div>
    </div>
  );
};

export default PageHeader;
