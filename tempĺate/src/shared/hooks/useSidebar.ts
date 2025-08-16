import { useState, useEffect, useCallback, useRef } from "react";

interface UseSidebarReturn {
  isExpanded: boolean;
  activeMenuView: string;
  shouldShow: boolean;
  showTooltip: boolean;
  sidebarWidth: string;
  isHoverExpanded: boolean;
  isMenuButtonHovered: boolean;
  setActiveMenuView: (view: string) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMenuButtonMouseEnter: () => void;
  handleMenuButtonMouseLeave: () => void;
  handleNavClick: (path: string) => void;
  handleMenuNavigation: (module: any) => void;
}

/**
 * Hook personalizado para gerenciar o estado do sidebar
 */
export const useSidebar = (
  navigate: any,
  location: any,
  isCollapsed: boolean
): UseSidebarReturn => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeMenuView, setActiveMenuView] = useState<string>("main");
  const [isMenuButtonHovered, setIsMenuButtonHovered] =
    useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  // Reset expanded state when sidebar is not collapsed
  useEffect(() => {
    if (!isCollapsed) {
      setIsExpanded(false);
      setIsMenuButtonHovered(false);
    }
  }, [isCollapsed]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    console.log("handleMouseEnter - isCollapsed:", isCollapsed);
    if (isCollapsed) {
      setIsExpanded(true);
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isCollapsed]);

  const handleMouseLeave = useCallback(() => {
    console.log(
      "handleMouseLeave - isCollapsed:",
      isCollapsed,
      "isMenuButtonHovered:",
      isMenuButtonHovered,
      "isExpanded:",
      isExpanded
    );

    // Se estiver colapsado e o mouse sair da área do menu
    if (isCollapsed) {
      // Usar timeout para dar tempo do mouse entrar na área do botão
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        // Se o mouse não estiver sobre o botão após o timeout, fechar o sidebar
        if (!isMenuButtonHovered) {
          console.log(
            "Closing sidebar - mouse left menu area and not over button"
          );
          setIsExpanded(false);
          setActiveMenuView("main");
        } else {
          console.log("Keeping sidebar open - mouse over button");
        }
      }, 100); // 100ms de delay para dar tempo do mouse entrar na área do botão
    }
  }, [isCollapsed, isMenuButtonHovered, activeMenuView]);

  const handleMenuButtonMouseEnter = useCallback(() => {
    console.log(
      "handleMenuButtonMouseEnter - isCollapsed:",
      isCollapsed,
      "isExpanded:",
      isExpanded
    );
    // Se estiver colapsado, manter expandido
    if (isCollapsed) {
      console.log("Setting isMenuButtonHovered to true");
      setIsMenuButtonHovered(true);
      // Só expandir se já estiver expandido (não expandir se vier de outras áreas)
      if (isExpanded) {
        // Manter expandido
      } else {
        // Não expandir automaticamente se não estava expandido
        console.log("Not expanding - sidebar was not already expanded");
      }
      // Clear any existing timeout para cancelar o fechamento
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        console.log(
          "Cancelled sidebar close timeout - mouse entered button area"
        );
      }
    }
  }, [isCollapsed, isExpanded]);

  const handleMenuButtonMouseLeave = useCallback(() => {
    console.log("handleMenuButtonMouseLeave - isCollapsed:", isCollapsed);
    if (isCollapsed) {
      console.log("Setting isMenuButtonHovered to false");
      setIsMenuButtonHovered(false);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Colapsar imediatamente quando o mouse sai da área do botão
      console.log(
        "Closing sidebar immediately from handleMenuButtonMouseLeave"
      );
      setIsExpanded(false);
      setActiveMenuView("main");
    }
  }, [isCollapsed, activeMenuView]);

  const handleNavClick = useCallback(
    (path: string) => {
      console.log("Navigating to path:", path);
      navigate(path);
      if (isCollapsed) {
        setIsExpanded(false);
        setIsMenuButtonHovered(false);
        setActiveMenuView("main"); // Reset para o menu principal
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    },
    [navigate, isCollapsed]
  );

  const handleMenuNavigation = useCallback(
    (module: any) => {
      if (module.hasSubMenu) {
        const path = module.path.includes('iframe') && module.hasSubMenu ? `/${module.id}` : module.path;
        console.log("Navigating to submenu:", path);
        setActiveMenuView(path);
        // Se estiver colapsado, manter expandido. Se estiver expandido, não fazer nada
        if (isCollapsed) {
          setIsExpanded(true);
          // Garantir que não seja resetado imediatamente
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
        // Se não estiver colapsado (sidebar fixo), não fazer nada com isExpanded
        console.log(
          "Submenu navigation completed - activeMenuView:",
          path
        );
      } else {
        handleNavClick(module.path);
      }
    },
    [handleNavClick, isCollapsed]
  );

  // Computed values
  const shouldShow = !isCollapsed || isExpanded;
  const sidebarWidth = isCollapsed ? "w-16" : "w-64";
  const showTooltip = isCollapsed && !isExpanded;
  const isHoverExpanded = isCollapsed && isExpanded;

  console.log("Sidebar state:", {
    isCollapsed,
    isExpanded,
    isMenuButtonHovered,
    isHoverExpanded,
    shouldShow,
    showTooltip,
    activeMenuView,
  });

  return {
    isExpanded,
    activeMenuView,
    shouldShow,
    showTooltip,
    sidebarWidth,
    isHoverExpanded,
    isMenuButtonHovered,
    setActiveMenuView,
    handleMouseEnter,
    handleMouseLeave,
    handleMenuButtonMouseEnter,
    handleMenuButtonMouseLeave,
    handleNavClick,
    handleMenuNavigation,
  };
};
