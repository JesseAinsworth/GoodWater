import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const LineChartComponent = ({ datosPh, datosTurbidity }) => {
  if (!datosPh || !datosTurbidity) {
    return null;
  }

  const labels = datosPh.map(data => data.timestamp);
  const dataPh = datosPh.map(data => data.value);
  const dataTurbidity = datosTurbidity.map(data => data.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: dataPh,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: dataTurbidity,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos de pH y Turbidez</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#000', // Cambia el color de fondo
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cambia el color de las líneas
          strokeWidth: 2,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default LineChartComponent;
