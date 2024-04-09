import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa la variable de animación

  useEffect(() => {
    // Configura la animación de entrada
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000, // Duración de la animación en milisegundos
        easing: Easing.linear, // Tipo de interpolación
        useNativeDriver: true, // Utiliza el driver nativo para mejorar el rendimiento
      }
    ).start();

    // Simula una carga de 2 segundos antes de navegar a la pantalla de inicio de sesión
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Reemplaza la pantalla actual por la pantalla de inicio de sesión
    }, 2000); // 2000 milisegundos = 2 segundos

    // Limpia el temporizador si el componente se desmonta antes de que se complete el tiempo
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground source={require('../../../assets/Logo_GW.png')} style={styles.backgroundImage}>
       
        {/* Aquí puedes incluir cualquier contenido adicional que desees mostrar en la pantalla de carga */}
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
});

export default SplashScreen;
