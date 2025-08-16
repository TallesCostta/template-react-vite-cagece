
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubMenuItem as SubMenuItemType } from '../../types';

interface SubMenuItemProps {
  item: SubMenuItemType;
  onNavClick: (path: string) => void;
  level: number;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ item, onNavClick, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (!hasChildren) {
      onNavClick(item.path);
    } else {
      handleToggle();
    }
  };

  const paddingLeft = 16 + level * 16; // 1rem + level * 1rem

  return (
    <div>
      <div
        onClick={handleNavClick}
        className={`flex items-center justify-between py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-all duration-200 cursor-pointer`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className="flex items-center gap-3">
          <i className={`${item.icon} text-cyan-600 dark:text-cyan-400`} style={{ fontSize: '16px' }}></i>
          <span>{item.titulo}</span>
        </div>
        {hasChildren && (
          <i
            className={`pi pi-chevron-right transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          ></i>
        )}
      </div>
      {hasChildren && isOpen && (
        <div>
          {item.children?.map((child) => (
            <SubMenuItem key={child.id} item={child} onNavClick={onNavClick} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenuItem;
