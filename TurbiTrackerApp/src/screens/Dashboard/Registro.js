// Registro.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Registro = ({ tipo, valor }) => {
  return (
    <View style={styles.registro}>
      <Text style={styles.text}>Tipo: {tipo}</Text>
      <Text style={styles.text}>Valor: {valor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  registro: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Registro;
