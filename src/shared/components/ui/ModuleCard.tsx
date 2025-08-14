import React, { useRef, FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "../../types";

interface ModuleCardProps {
  icon: IconType;
  title: string;
  delay: number;
  path: string;
}

/**
 * Card interativo para cada módulo na página inicial, com efeito 3D no hover.
 */
const ModuleCard: FC<ModuleCardProps> = ({
  icon: iconClassName,
  title,
  delay,
  path,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768 && cardRef.current) {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      const rotateX = (y / height - 0.5) * -12;
      const rotateY = (x / width - 0.5) * 12;
      cardRef.current.style.transition = "transform 0.1s ease-out";
      cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(path)}
      className="module-card group relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20 transition-shadow duration-500 cursor-pointer border border-white/30 dark:border-slate-700/80 overflow-hidden"
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-cyan-600 dark:text-teal-300 transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
          {iconClassName && <i className={`${iconClassName} text-3xl`}></i>}
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 flex-grow">
          {title}
        </h3>
        <div className="text-sm font-semibold text-cyan-700 dark:text-teal-300 mt-4 self-start opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          Acessar Módulo →
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
    </div>
  );
};

export default ModuleCard;
