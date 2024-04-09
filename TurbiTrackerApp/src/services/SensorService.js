import axios from 'axios';

const API_URL = 'https://turbibackend.onrender.com/sensores';

// Función para obtener todos los sensores
export const getAllSensors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los sensores:', error);
    throw new Error('No se pudieron obtener los sensores. Inténtelo de nuevo más tarde.');
  }
};

// Función para guardar los datos de un sensor
export const saveSensorData = async (sensorData) => {
  try {
    const response = await axios.post(API_URL, sensorData);
    return response.data;
  } catch (error) {
    console.error('Error al guardar los datos del sensor:', error);
    throw new Error('No se pudieron guardar los datos del sensor. Inténtelo de nuevo más tarde.');
  }
};

// Función para actualizar los datos de un sensor
export const updateSensorData = async (sensorData) => {
  try {
    const response = await axios.put(API_URL, sensorData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar los datos del sensor:', error);
    throw new Error('No se pudieron actualizar los datos del sensor. Inténtelo de nuevo más tarde.');
  }
};

// Función para borrar los datos de un sensor
export const deleteSensorData = async () => {
  try {
    const response = await axios.delete(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al borrar los datos del sensor:', error);
    throw new Error('No se pudieron borrar los datos del sensor. Inténtelo de nuevo más tarde.');
  }
};
