import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Grafico = ({ data }) => {
  if (!data || !data.labels || !data.datasets) {
    return (
      <View style={styles.chartContainer}>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={350}
        height={220}
        yAxisLabel="Máximo: 1000"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Grafico;
