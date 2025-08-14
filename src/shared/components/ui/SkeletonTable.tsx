import React, { FC } from 'react';

/**
 * Componente de esqueleto (loading state) para tabelas e conteúdo de abas.
 */
const SkeletonTable: FC = () => (
    <div className="animate-pulse">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                </div>
            ))}
        </div>
    </div>
);

export default SkeletonTable;