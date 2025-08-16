import React, { useState, useMemo } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import useAppStore from "../../store/appStore";
import Modal from "../ui/Modal";
import ReportModal from "../reports/ReportModal";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { SubMenuItem, SubMenu } from "../../types";

const findMenuPath = (
  pathname: string,
  subMenus: Record<string, SubMenu>
): (SubMenu | SubMenuItem)[] => {
  const path: (SubMenu | SubMenuItem)[] = [];

  const search = (
    items: SubMenuItem[],
    currentPath: (SubMenu | SubMenuItem)[]
  ) => {
    for (const item of items) {
      const newPath = [...currentPath, item];
      if (item.path === pathname) {
        return newPath;
      }
      if (item.children) {
        const found = search(item.children, newPath);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  for (const key in subMenus) {
    const menu = subMenus[key];
    const result = search(menu.items, [menu]);
    if (result) {
      return result;
    }
  }

  return path;
};

const MainLayout = () => {
  const { modal, hideAlert, menuData } = useAppStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const isHomePage = location.pathname === "/";
  const shouldShowSidebar = !isHomePage;

  const breadcrumbPath = useMemo(
    () => (menuData?.subMenus ? findMenuPath(location.pathname, menuData.subMenus) : []),
    [location.pathname, menuData?.subMenus]
  );

  const pageTitle = useMemo(() => {
    if (breadcrumbPath.length > 0) {
      return (breadcrumbPath[breadcrumbPath.length - 1] as SubMenuItem).titulo;
    }
    return "Página Inicial";
  }, [breadcrumbPath]);

  return (
    <div className="flex flex-col min-h-screen">
      <Modal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={hideAlert}
      />
      <ReportModal />
      <Header />
      {shouldShowSidebar && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      )}
      <main
        className={`transition-all duration-300 ease-in-out relative flex-grow ${
          shouldShowSidebar ? (isSidebarCollapsed ? "ml-16" : "ml-64") : "ml-0"
        }`}
        style={{ zIndex: 10 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 ml-40">
          {!isHomePage && (
            <div className="mb-6">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-3">
                <Link to="/" className="hover:text-blue-600 cursor-pointer">
                  Portal RH
                </Link>
                {breadcrumbPath.map((item, index) => (
                  <React.Fragment key={index}>
                    <span className="mx-2">/</span>
                    {index === breadcrumbPath.length - 1 ? (
                      <span className="text-gray-900 font-medium">
                        {item.titulo}
                      </span>
                    ) : (
                      <span className="hover:text-blue-600 cursor-pointer">
                        {item.titulo}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Título Principal da Tela */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {pageTitle}
              </h1>
            </div>
          )}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
