import React, { ReactNode } from "react";

interface TableCardProps {
  children: ReactNode;
  className?: string;
  variant?: "mobile" | "tablet" | "desktop";
}

/**
 * Componente de card otimizado para tabelas responsivas
 */
const TableCard: React.FC<TableCardProps> = ({
  children,
  className = "",
  variant = "mobile",
}) => {
  const baseClasses =
    "bg-white/70 dark:bg-slate-800/70 rounded-lg shadow-md border border-white/30 dark:border-slate-700/80 transition-all duration-200 hover:shadow-lg";

  const variantClasses = {
    mobile: "p-4 space-y-3",
    tablet: "p-5 space-y-4",
    desktop: "p-6 space-y-4",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default TableCard;

