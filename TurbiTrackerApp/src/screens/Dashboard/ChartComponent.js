import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ChartComponent = ({ data, tipo }) => {
  const [valores, setValores] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Filtrar los datos según el tipo (pH o turbidez)
    const filteredData = data.filter(item => item.tipo === tipo);
    
    // Obtener los valores y las etiquetas
    const valores = filteredData.map(item => parseFloat(item.valor) || 0);
    const etiquetas = filteredData.map((_, index) => index.toString());

    setValores(valores);
    setEtiquetas(etiquetas);
  }, [data, tipo]);

  if (valores.length === 0 || etiquetas.length === 0) {
    return (
      <View>
        <Text>No hay datos disponibles para {tipo}</Text>
      </View>
    );
  }

  // Limitar los datos a 10 para mostrar en la pantalla
  const datosVisibles = valores.slice(0, 10);
  const etiquetasVisibles = etiquetas.slice(0, 10);

  return (
    <ScrollView horizontal={true} style={{ marginVertical: 10 }} scrollEnabled={valores.length > 10}>
      <LineChart
        data={{
          labels: etiquetasVisibles,
          datasets: [
            {
              data: datosVisibles,
            },
          ],
        }}
        width={Math.max(screenWidth, valores.length * 50)} // Ajusta el ancho del gráfico al máximo entre el ancho de la pantalla y el tamaño de los datos
        height={200}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          propsForBackgroundLines: {
            stroke: 'rgba(0, 0, 0, 0.1)',
          },
          propsForVerticalLabels: {
            fill: 'rgba(0, 0, 0, 0.8)',
            fontSize: 10,
          },
          propsForHorizontalLabels: {
            fill: 'rgba(0, 0, 0, 0.8)',
            fontSize: 10,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

export default ChartComponent;
