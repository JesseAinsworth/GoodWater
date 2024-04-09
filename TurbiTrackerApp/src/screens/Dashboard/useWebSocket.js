// useWebSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);

    newSocket.on('connect', () => {
      console.log('Conectado al servidor de websocket');
    });

    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor de websocket');
    });

    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [url]);

  return socket;
};

export default useWebSocket;
