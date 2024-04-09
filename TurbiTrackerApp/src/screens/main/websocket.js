import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';

export default function App() {
  const [socket, setSocket] = useState(null);
  const [datosPh, setDatosPh] = useState(null);
  const [datosTurbidity, setDatosTurbidity] = useState(null);

  useEffect(() => {
    // Establecer conexión al websocket
    const newSocket = io('wss://turbibackend.onrender.com');

    // Manejar eventos del websocket
    newSocket.on('connect', () => {
      console.log('Conectado al servidor de websocket');
    });

    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor de websocket');
    });

    newSocket.on('datosPh', (data) => {
      setDatosPh(data); 
    });

    newSocket.on('datosTurbidity', (data) => {
      setDatosTurbidity(data); 
    });

    setSocket(newSocket);

    // Cerrar la conexión al salir de la aplicación
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Datos de pH recibidos: {datosPh}</Text>
      <Text style={styles.text}>Datos de turbidez recibidos: {datosTurbidity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});