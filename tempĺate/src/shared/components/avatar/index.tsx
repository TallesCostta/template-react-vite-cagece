import React, { useMemo } from 'react';
import { useSa2 } from 'react-sa2';

interface AvatarProps {
  size: number;
}

const Avatar: React.FC<AvatarProps> = ({ size }) => {
  const { usuario } = useSa2();

  const getInicial = (nome: string | undefined | null) => nome?.trim()?.charAt(0).toUpperCase() || 'U';

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const randomColor = useMemo(() => {
    const storageKey = 'user-avatar-color';
    const savedColor = sessionStorage.getItem(storageKey);

    if (savedColor) {
      return savedColor;
    }

    const newColor = getRandomColor();
    sessionStorage.setItem(storageKey, newColor);
    return newColor;
  }, []);

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    background: `linear-gradient(135deg, ${randomColor}, #ffffff)`,
    color: randomColor,
    fontSize: `${size / 2}px`,
  };

  return (
    <div
      style={avatarStyle}
      className="rounded-full flex items-center justify-center font-bold uppercase border-2 border-white shadow-md"
    >
      {getInicial(usuario?.colaborador?.colDscNome)}
    </div>
  );
};

export default Avatar;
