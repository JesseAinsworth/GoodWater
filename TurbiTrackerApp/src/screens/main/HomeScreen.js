import React from 'react';
import { View, StyleSheet } from 'react-native'; // Importa View y StyleSheet desde react-native
import MainTabNavigator from '../../navigation/MainTabNavigator'; // Importa el TabNavigator

const HomeScreen = () => (
  <View style={styles.container}> 
    <MainTabNavigator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#607d8b',
    paddingBottom: 5, // Agrega espacio en la parte superior
  },
});

export default HomeScreen;
