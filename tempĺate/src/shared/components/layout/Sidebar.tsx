import React, { FC, memo, useCallback, useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Module } from "../../types";
import { useSidebar } from "../../hooks/useSidebar";
import { useSa2 } from "react-sa2";
import { Button } from 'primereact/button';
import useAppStore from "../../store/appStore";
import SubMenuItem from "./SubMenuItem";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: FC<SidebarProps> = memo(({ isCollapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { funcoesSa2 } = useSa2();
  const menuData = useAppStore((state) => state.menuData);
  const modules = menuData?.modulos;
  const subMenus = menuData?.subMenus;

  const {
    isExpanded,
    activeMenuView,
    shouldShow,
    showTooltip,
    sidebarWidth,
    isHoverExpanded,
    setActiveMenuView,
    handleMouseEnter,
    handleMouseLeave,
    handleNavClick,
    handleMenuNavigation,
  } = useSidebar(navigate, location, isCollapsed);

  const filteredModules = useMemo(() => {
    if (!searchTerm.trim()) return modules || [];
    const searchLower = searchTerm.toLowerCase();
    if (!modules) return [];
    return modules.filter((module) =>
      module.titulo.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, modules]);

  const filteredSubItems = useMemo(() => {
    if (!searchTerm.trim() || !subMenus || !subMenus[activeMenuView]) return [];
    const searchLower = searchTerm.toLowerCase();
    const items = subMenus[activeMenuView].items;

    function filterItems(items: any[]): any[] {
        return items.reduce((acc, item) => {
            const isMatch = item.titulo.toLowerCase().includes(searchLower);
            const children = item.children ? filterItems(item.children) : [];
            if (isMatch || children.length > 0) {
                acc.push({ ...item, children });
            }
            return acc;
        }, []);
    }

    return filterItems(items);
}, [searchTerm, subMenus, activeMenuView]);

  const handleToggleCollapse = useCallback(() => onToggleCollapse(), [onToggleCollapse]);
  const handleNavClickCallback = useCallback((path: string) => handleNavClick(path), [handleNavClick]);
  const handleMenuNavigationCallback = useCallback((module: Module) => handleMenuNavigation(module), [handleMenuNavigation]);
  const handleSetActiveMenuView = useCallback((view: string) => setActiveMenuView(view), [setActiveMenuView]);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value), []);
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        if (filteredModules?.length > 0) {
          const firstModule = filteredModules[0];
          if (firstModule.hasSubMenu) handleMenuNavigation(firstModule);
          else handleNavClick(firstModule.path);
        } else if (filteredSubItems?.length > 0) {
          handleNavClick(filteredSubItems[0].path);
        }
        setSearchTerm("");
      }
    }, [searchTerm, filteredModules, filteredSubItems, handleMenuNavigation, handleNavClick]);

  const sidebarZIndex = isHoverExpanded ? 20 : 5;
  const sidebarClasses = `fixed left-0 top-20 h-[calc(100vh-5rem)] shadow-lg border-r border-slate-200 dark:border-slate-700 sidebar-transition ${sidebarWidth} ${isCollapsed && isExpanded ? "w-64" : ""} ${isHoverExpanded ? "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm" : "bg-white dark:bg-slate-800"} ${isHoverExpanded ? "animate-expand-sidebar" : ""}`;

  return (
    <div data-sidebar className={sidebarClasses} style={{ zIndex: sidebarZIndex, overflow: "hidden" }}>
      <div className="h-full flex flex-col sidebar-content">
        <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${activeMenuView !== "main" ? "-translate-x-full" : "translate-x-0"}`}>
          <div className="flex flex-col h-full">
            <div className={isCollapsed ? "p-2 border-b border-slate-200 dark:border-slate-700 mt-2" : "p-2 border-b border-slate-200 dark:border-slate-700 ml-4 mt-2"}>
              <Button onClick={handleToggleCollapse} icon={isCollapsed ? "pi pi-bars" : "pi pi-times"} label={shouldShow ? "Menu" : ""} className={shouldShow && isCollapsed ? "w-full text-left ml-4" : "w-full text-left"} text />
            </div>
            <div className="flex-1 p-2 space-y-0.5" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="mb-2">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative group" style={{ height: '2.5rem' }}>
                    <i
                      className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                      style={{ fontSize: '16px', transformOrigin: 'center center' }}
                    ></i>
                    <input
                      type="text"
                      placeholder={shouldShow ? "Buscar..." : ""}
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className={`w-full pl-9 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-opacity duration-200 ${
                        shouldShow ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    />
                    {shouldShow && (
                      <Button
                        type="submit"
                        icon="pi pi-search"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-200"
                        text
                      />
                    )}
                  </div>
                </form>
              </div>
              <Link to="/" onClick={() => handleNavClickCallback("/")} className={`flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-all duration-200 ${location.pathname === "/" ? "bg-slate-100 dark:bg-slate-700" : ""} ${showTooltip ? "sidebar-tooltip" : ""}`} data-tooltip={showTooltip ? "Página Inicial" : ""}>
                <i className="pi pi-home text-cyan-600 dark:text-cyan-400 transition-transform duration-200 hover:scale-110" style={{fontSize: '20px'}}></i>
                {shouldShow && <span className="sidebar-text sidebar-text-transition animate-fade-in-text">Página Inicial</span>}
              </Link>
              <div className="border-t border-slate-200 dark:border-slate-700 my-1.5"></div>
              {filteredModules.map((module: Module, index: number) => (
                <div key={module.id} onClick={() => handleMenuNavigationCallback(module)} className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded-md transition-all duration-200 ${location.pathname === module.path ? "bg-slate-100 dark:bg-slate-700" : ""} ${showTooltip ? "sidebar-tooltip" : ""}`} data-tooltip={showTooltip ? module.titulo : ""} style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="text-cyan-600 dark:text-cyan-400 flex-shrink-0"><i className={`${module.icon} transition-transform duration-200 hover:scale-110`} style={{fontSize: '20px'}}></i></div>
                    {shouldShow && <span className="sidebar-text sidebar-text-transition flex-1 animate-fade-in-text">{module.titulo}</span>}
                  </div>
                  {shouldShow && module.hasSubMenu && <i className="pi pi-chevron-right flex-shrink-0 transition-transform duration-200 hover:scale-110" style={{fontSize: '16px'}}></i>}
                </div>
              ))}
              
              <div className="border-t border-slate-200 dark:border-slate-700 my-1.5"></div>
              <a href="#" onClick={() => funcoesSa2.sair()} className={`flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200 ${showTooltip ? "sidebar-tooltip" : ""}`} data-tooltip={showTooltip ? "Sair (Logoff)" : ""}>
                <i className="pi pi-sign-out transition-transform duration-200 hover:scale-110" style={{fontSize: '20px'}}></i>
                {shouldShow && <span className="sidebar-text sidebar-text-transition animate-fade-in-text">Sair (Logoff)</span>}
              </a>
            </div>
          </div>
        </div>
        <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${activeMenuView === "main" ? "translate-x-full" : "translate-x-0"}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {subMenus && subMenus[activeMenuView] && (
            <div className="flex flex-col h-full">
              <div className="p-2 mt-2">
                <Button onClick={() => handleSetActiveMenuView("main")} icon="pi pi-arrow-left" label={shouldShow ? subMenus[activeMenuView].titulo : ""} className="w-full text-left" text />
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700"></div>
              <div className="flex-1 p-2 space-y-0.5">
                {(searchTerm.trim() ? filteredSubItems : subMenus[activeMenuView].items).map((subItem) => (
                  <SubMenuItem key={subItem.id} item={subItem} onNavClick={handleNavClickCallback} level={0} />
                ))}
                {searchTerm.trim() && filteredSubItems.length === 0 && shouldShow && <div className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 text-center">Nenhum resultado encontrado</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
