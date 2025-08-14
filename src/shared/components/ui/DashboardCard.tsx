import React, { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { cn } from '../../lib/utils/utils';

interface DashboardCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

/**
 * Componente de card padronizado para o Dashboard com sombra ciano padrão.
 */
const DashboardCard: FC<DashboardCardProps> = ({ title, children, className }) => {
    return (
        <Card className={cn(
            "relative overflow-hidden group transition-all duration-300 hover:-translate-y-[3px]",
            "shadow-md shadow-cyan-500/10 dark:shadow-none", // Sombra padrão no modo claro, sem sombra no modo escuro
            "dark:hover:shadow-md dark:hover:shadow-cyan-400/15", // Efeito de hover apenas no modo escuro
            className
        )}>
            <CardHeader>
                <CardTitle className="text-base text-slate-700 dark:text-slate-200">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default DashboardCard;