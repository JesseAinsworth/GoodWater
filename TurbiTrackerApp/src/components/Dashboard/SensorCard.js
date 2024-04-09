import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SensorCard = ({ data }) => {
  if (!data) {
    return null; // Si no hay datos, no renderizar el componente
  }

  const { location, type, value } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SensorCard;
