import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'; // Importamos nuestro componente principal de navegación

const App = () => {
  return (
    <View style={styles.container}>
      {/* StatusBar para ajustar el color de la barra de estado según el tema de la aplicación */}
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      {/* Componente principal de navegación */}
      <AppNavigator />
      {/* View para aplicar el degradado a la barra de estado */}
      <View style={styles.statusBarGradient}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarGradient: {
    height: StatusBar.currentHeight,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

export default App;
