// src/types/index.ts
import { ComponentType } from 'react';

export type IconType = string | ComponentType<{ size?: number; className?: string }>;

export interface Module {
    id: string;
    titulo: string;
    icon: IconType;
    path: string | null;
    hasSubMenu?: boolean;
}

export interface SubMenuItem {
    id: string;
    titulo: string;
    icon: IconType;
    path: string;
    children?: SubMenuItem[]; // Adicionado para suportar sub-menus aninhados
}

export interface SubMenu {
    titulo: string;
    icon: IconType;
    items: SubMenuItem[];
}

export interface PortalRotas {
    rotas?: Rota[];
    modulos?: Module[];
    subMenus?: Record<string, SubMenu>;

}

export interface Rota {
    id: string;
    path: string | null;
    component: string;
}

export interface RetornoMenuSa2 {
    mapModulo: Record<string, MenuSa2[]>;
}
export interface MenuSa2 {
  modSeqModulo: number;
  modNomModulo: string;
  modActModulo: string | null;
  modImgModulo: string | null;
  moduloPai: number;
  nomeApresentacao: string;
  modFlgExcluirMenu: boolean;
  itensArvore: MenuSa2[]; // Estrutura recursiva para sub-itens
  modOrdApresentacao: number;
  modFlgAbrirMenuNovaAba: boolean;
  modFlgConsideraSistema: boolean;
  descricao: string;
}