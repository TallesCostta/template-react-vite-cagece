import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const IframePage: React.FC = () => {
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');
  
  const [iframeHeight, setIframeHeight] = useState('calc(100vh - 64px)'); // Ex: 100% da altura da tela menos o header

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframeResize') {
        const newHeight = `${event.data.height}px`;
        setIframeHeight(newHeight);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!url) {
    return <div>URL não fornecida</div>;
  }

  return (
    <iframe
      src={url}
      style={{
        width: '100%', 
        height: iframeHeight, 
        border: 'none',
        transition: 'height 0.2s ease-in-out'
      }}
      title="External Content"
    />
  );
};

export default IframePage;