import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MeasurementIndicator = ({
  title,
  limit,
  colorRanges,
  socket,
  eventName,
}) => {
  const [measurement, setMeasurement] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, (data) => {
      setMeasurement(data);
      updateBackgroundColor(data);
    });

    return () => {
      socket.off(eventName);
    };
  }, [socket, eventName]);

  const updateBackgroundColor = (data) => {
    for (const range of colorRanges) {
      if (data <= range.limit) {
        setBackgroundColor(range.color);
        break;
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(measurement / limit) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.value}>
        {measurement !== null
          ? `${measurement} ${title === 'Turbidez' ? 'NTU' : ''}`
          : 'Cargando...'}
      </Text>
      <Text style={styles.limit}>
        Límite de medición: {limit} {title === 'Turbidez' ? 'NTU' : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000', // Negro
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Blanco semitransparente
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(173, 216, 230, 0.8)', // Azul claro
  },
  value: {
    fontSize: 16,
    color: '#000000', // Negro
    marginBottom: 5,
  },
  limit: {
    fontSize: 14,
    color: '#000000', // Negro
  },
});

export default MeasurementIndicator;
