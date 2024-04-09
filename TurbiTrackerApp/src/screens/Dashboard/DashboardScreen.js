import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,ScrollView  } from 'react-native';
import io from 'socket.io-client';
import DataVisualization from './DataVisualization ';
import ChartComponent from './ChartComponent';

export default function DashboardScreen() {
  const [socket, setSocket] = useState(null);
  const [registros, setRegistros] = useState([]);

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
      agregarRegistro({ tipo: 'pH', valor: data });
    });

    newSocket.on('datosTurbidity', (data) => {
      agregarRegistro({ tipo: 'turbidez', valor: data });
    });

    setSocket(newSocket);

    // Cerrar la conexión al salir de la aplicación
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const agregarRegistro = (registro) => {
    setRegistros(prevRegistros => [...prevRegistros, registro]);
  };

  const renderRegistro = ({ item }) => (
    <View style={styles.registro}>
      <Text style={styles.text}>Tipo: {item.tipo}</Text>
      <Text style={styles.text}>Valor: {item.valor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visualización de Datos</Text>
        <DataVisualization
        title="Turbidez"
        limit={1000}
        colorRanges={[
          { limit: 100, color: '#ADD8E6' }, // Azul claro
          { limit: 500, color: '#98FB98' }, // Verde claro
          { limit: 1000, color: '#BC8F8F' }, // Marrón claro
        ]}
        socket={socket}
        eventName="datosTurbidity"
      />
      <DataVisualization
        title="pH"
        limit={14}
        colorRanges={[
          { limit: 3, color: '#FF4500' }, // Naranja oscuro para valores ácidos
          { limit: 7, color: '#FFFF00' }, // Amarillo para pH neutro
          { limit: 10, color: '#32CD32' }, // Verde lima para valores básicos
          { limit: 14, color: '#4682B4' }, // Azul acero para valores superiores a 14
        ]
        }
        socket={socket}
        eventName="datosPh"
      />
      
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gráficas</Text>
        <ChartComponent data={registros} tipo="pH" />
      <ChartComponent data={registros} tipo="turbidez" />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registro</Text>
        <FlatList
          data={registros}
          renderItem={renderRegistro}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#607d8b',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  registro: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
