// QualityDashboard.js
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MeasurementIndicator from './MeasurementIndicator'; // Importa el componente MeasurementIndicator

const QualityDashboard = () => {
  const [turbidity, setTurbidity] = useState(null);
  const [pH, setPH] = useState(null);
  const [alkalinity, setAlkalinity] = useState(null);
  const [acidity, setAcidity] = useState(null);

  return (
    <View style={styles.container}>
      <MeasurementIndicator
        title="Turbidez"
        limit={1000}
        colorRanges={[
          {limit: 100, color: '#ADD8E6'}, // Azul claro
          {limit: 500, color: '#98FB98'}, // Verde claro
          {limit: 1000, color: '#BC8F8F'}, // Marrón claro
        ]}
        measurement={turbidity}
        setMeasurement={setTurbidity}
      />
      <MeasurementIndicator
        title="pH"
        limit={14}
        colorRanges={[
          {limit: 3, color: '#FFA07A'}, // Rojo claro
          {limit: 7, color: '#FFFF00'}, // Amarillo
          {limit: 10, color: '#98FB98'}, // Verde claro
          {limit: 14, color: '#ADD8E6'}, // Azul claro
        ]}
        measurement={pH}
        setMeasurement={setPH}
      />
      <MeasurementIndicator
        title="Alcalinidad"
        limit={500}
        colorRanges={[
          {limit: 100, color: '#FFA500'}, // Naranja claro
          {limit: 250, color: '#FF8C00'}, // Naranja
          {limit: 500, color: '#FF6347'}, // Rojo claro
        ]}
        measurement={alkalinity}
        setMeasurement={setAlkalinity}
      />
      <MeasurementIndicator
        title="Acidez"
        limit={100}
        colorRanges={[
          {limit: 20, color: '#98FB98'}, // Verde claro
          {limit: 50, color: '#FFFF00'}, // Amarillo
          {limit: 100, color: '#FFA07A'}, // Rojo claro
        ]}
        measurement={acidity}
        setMeasurement={setAcidity}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
});

export default QualityDashboard;
