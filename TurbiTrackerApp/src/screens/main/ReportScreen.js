import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { BarChart, PieChart } from 'react-native-chart-kit';

// Definición de colores personalizados
const themeColors = {
  primary: '#3F51B5', // Azul
  secondary: '#9C27B0', // Morado
  gray: '#757575' // Gris
};

// Estilos personalizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#607d8b', // Fondo oscuro
  },
  calendar: {
    marginTop: 20,
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Texto blanco
    marginBottom: 20,
  },
  exportButton: {
    backgroundColor: themeColors.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  exportButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: themeColors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  historyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Componente principal de la pantalla de informes
export default function ReportScreen() {
  const [reports, setReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    // Simulación de carga de informes desde una fuente externa
    fetchReports();
  }, []);

  // Función para cargar los informes desde una fuente externa
  const fetchReports = async () => {
    try {
      // Lógica para obtener los informes desde una fuente externa
      const fetchedReports = await fetchReportsFromDatabase();
      setReports(fetchedReports);
    } catch (error) {
      console.error('Error al obtener los informes:', error);
      Alert.alert('Error', 'No se pudieron cargar los informes. Inténtelo de nuevo más tarde.');
    }
  };

  // Función para manejar la selección de una fecha en el calendario
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Lógica para encontrar el informe correspondiente a la fecha seleccionada
    const reportForDate = reports.find(report => report.date === date);
    setSelectedReport(reportForDate);
  };

  // Función para exportar el informe actual
  const exportReport = () => {
    // Lógica para exportar el informe actual en un formato específico
    Alert.alert('Informe exportado', 'El informe actual se ha exportado correctamente.');
  };

  return (
    <View style={styles.container}>
     <Calendar
  style={styles.calendar}
  theme={{
    calendarBackground: '#121212', // Fondo oscuro del calendario
    textSectionTitleColor: 'white', // Color del texto del título del mes
    selectedDayBackgroundColor: themeColors.secondary, // Color del fondo de los días seleccionados
    selectedDayTextColor: 'white', // Color del texto de los días seleccionados
    todayTextColor: themeColors.primary, // Color del texto del día actual
    dayTextColor: 'white', // Color del texto de los días no seleccionados
    textDisabledColor: '#686868', // Color del texto de los días deshabilitados
    dotColor: themeColors.secondary, // Color de los puntos indicadores de los eventos
    selectedDotColor: 'white', // Color de los puntos indicadores de los días seleccionados
    arrowColor: 'white', // Color de las flechas de navegación
    monthTextColor: 'white', // Color del texto de los nombres de los meses
    textDayFontFamily: 'Arial', // Tipo de fuente del texto del día
    textMonthFontFamily: 'Arial', // Tipo de fuente del texto del mes
    textDayHeaderFontFamily: 'Arial', // Tipo de fuente del texto del encabezado del día
  }}
  markedDates={{
    [selectedDate]: { selected: true, selectedColor: themeColors.secondary }, // Fecha seleccionada
    // Otras fechas con informes disponibles pueden marcarse aquí
  }}
  onDayPress={(day) => handleDateSelect(day.dateString)}
/>

      {selectedReport && (
        <View>
          <Text style={styles.chartTitle}>Informe del {selectedReport.date}</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={{
                labels: selectedReport.labels,
                datasets: [{ data: selectedReport.data }]
              }}
              width={400}
              height={220}
              yAxisSuffix="k"
              chartConfig={{
                backgroundGradientFrom: themeColors.primary,
                backgroundGradientTo: themeColors.secondary,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Texto blanco
                style: { borderRadius: 16 }
              }}
            />
          </View>
          <TouchableOpacity style={styles.exportButton} onPress={exportReport}>
            <Text style={styles.exportButtonText}>Exportar informe</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.historyButton} onPress={() => {/* Navegar a la pantalla de historial de informes */}}>
        <Text style={styles.historyButtonText}>Ver historial de informes</Text>
      </TouchableOpacity>
    </View>
  );
}
