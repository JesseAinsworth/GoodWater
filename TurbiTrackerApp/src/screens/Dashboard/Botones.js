import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Botones = () => {
  const handleChartTypeChange = (type) => {
    // Aquí puedes realizar acciones adicionales si es necesario
    console.log('Cambiando a la gráfica:', type);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title="Acidez" onPress={() => handleChartTypeChange('acidez')} />
      <Button title="pH" onPress={() => handleChartTypeChange('ph')} />
      <Button title="Turbidez" onPress={() => handleChartTypeChange('turbidez')} />
      <Button title="Alcalinidad" onPress={() => handleChartTypeChange('alcalinidad')} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default Botones;
