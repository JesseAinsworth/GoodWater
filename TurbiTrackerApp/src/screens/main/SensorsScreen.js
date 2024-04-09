import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { saveSensorData, updateSensorData, deleteSensorData } from '../../services/SensorService'; // Funciones para interactuar con la base de datos

export default function SensorsScreen() {
  const [sensors, setSensors] = useState([
    { id: 1, name: 'Sensor A', type: 'Tipo 1', macAddress: 'AA:BB:CC:DD:EE:FF', measurementRange: '0-100', subscription: 'Premium' },
    { id: 2, name: 'Sensor B', type: 'Tipo 2', macAddress: '11:22:33:44:55:66', measurementRange: '50-200', subscription: 'Basic' }
  ]);

  const handleSave = () => {
    saveSensorData(sensors)
      .then(() => Alert.alert('Éxito', 'Datos del sensor guardados correctamente'))
      .catch(error => Alert.alert('Error', 'No se pudieron guardar los datos del sensor. Inténtelo de nuevo más tarde.'));
  };

  const handleUpdate = () => {
    updateSensorData(sensors)
      .then(() => Alert.alert('Éxito', 'Datos del sensor actualizados correctamente'))
      .catch(error => Alert.alert('Error', 'No se pudieron actualizar los datos del sensor. Inténtelo de nuevo más tarde.'));
  };

  const handleDelete = () => {
    deleteSensorData()
      .then(() => Alert.alert('Éxito', 'Datos del sensor eliminados correctamente'))
      .catch(error => Alert.alert('Error', 'No se pudieron eliminar los datos del sensor. Inténtelo de nuevo más tarde.'));
  };

  return (
    <View style={styles.container}>
      {sensors.map(sensor => (
        <View key={sensor.id} style={styles.sensorContainer}>
          <TextInput
            style={styles.input}
            value={sensor.name}
            onChangeText={(text) => {/* Lógica para actualizar el nombre del sensor */}}
            placeholder="Nombre del Sensor"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={sensor.macAddress}
            onChangeText={(text) => {/* Lógica para actualizar la dirección MAC del sensor */}}
            placeholder="Dirección MAC"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={sensor.measurementRange}
            onChangeText={(text) => {/* Lógica para actualizar el rango de medición del sensor */}}
            placeholder="Rango de Medición"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={sensor.subscription}
            onChangeText={(text) => {/* Lógica para actualizar la suscripción del sensor */}}
            placeholder="Suscripción"
            placeholderTextColor="#666"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Datos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#32cd32' }]} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar Datos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ff4500' }]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Borrar Datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#607d8b',
  },
  sensorContainer: {
    marginBottom: 20,
    backgroundColor: '#bfc9ca',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#333',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
