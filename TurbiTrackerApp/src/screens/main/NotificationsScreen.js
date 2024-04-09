import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Componente principal de la aplicación
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date'); // Opciones: 'date', 'type', 'relevance'
  const [filters, setFilters] = useState({
    pH: false,
    acidez: false,
    hoy: false,
    noLeidos: false,
  });

  useEffect(() => {
    // Lógica para obtener las notificaciones desde la base de datos o servicio
    const fetchedNotifications = fetchNotificationsFromDatabase();
    setNotifications(fetchedNotifications);
  }, []);

  // Función para manejar el cambio en los filtros
  const handleToggleFilter = filter => {
    setFilters({...filters, [filter]: !filters[filter]});
  };

  // Función para simular la obtención de notificaciones desde la base de datos
  const fetchNotificationsFromDatabase = () => {
    // Aquí se simula la obtención de datos desde un endpoint
    // En este ejemplo, se usa un array estático para representar las notificaciones
    return [
      {
        id: 1,
        type: 'Turbidez',
        location: 'Río Smith',
        dateTime: '04/04/2024 10:30 AM',
        turbidityLevel: '75 NTU (Unidades Nefelométricas de Turbidez)',
        recommendedActions:
          'Evitar el consumo directo del agua hasta nuevo aviso.',
      },
      // Puedes agregar más notificaciones aquí si es necesario
    ];
  };

  // Función para filtrar las notificaciones según los filtros seleccionados
  const filteredNotifications = notifications.filter(notification => {
    if (filters.pH && notification.type === 'Turbidez') return true;
    if (filters.acidez && notification.type === 'Acidez') return true;
    if (filters.hoy && isToday(notification.dateTime)) return true;
    if (filters.noLeidos && !notification.read) return true;
    return false;
  });

  // Función para determinar si la fecha y hora de una notificación es de hoy
  const isToday = dateTime => {
    const today = new Date();
    const notificationDate = new Date(dateTime);
    return (
      today.getFullYear() === notificationDate.getFullYear() &&
      today.getMonth() === notificationDate.getMonth() &&
      today.getDate() === notificationDate.getDate()
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar notificaciones..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, filters.pH && styles.toggleButtonActive]}
          onPress={() => handleToggleFilter('pH')}>
          <Text style={styles.toggleButtonText}>pH</Text>
        </TouchableOpacity>
        {/* Otros filtros de toggle */}
      </View>
      <FlatList
        data={filteredNotifications}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              /* Manejar acción al tocar la notificación */
            }}>
            <View style={styles.notificationItem}>
              <Text>Tipo: {item.type}</Text>
              <Text>Ubicación: {item.location}</Text>
              <Text>Fecha y Hora de Detección: {item.dateTime}</Text>
              <Text>Nivel de Turbidez: {item.turbidityLevel}</Text>
              <Text>Acciones Recomendadas: {item.recommendedActions}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#607d8b', // Fondo oscuro
  },
  searchInput: {
    height: 40,
    borderColor: '#888888', // Gris
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#303030', // Gris oscuro
    color: '#ffffff', // Texto blanco
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3f51b5', // Azul
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#9c27b0', // Morado
  },
  toggleButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#444444', // Gris más oscuro
    marginBottom: 10,
    backgroundColor: '#222222', // Gris oscuro
  },
});
