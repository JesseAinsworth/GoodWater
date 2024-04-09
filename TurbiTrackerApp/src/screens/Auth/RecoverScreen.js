import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const RecoverScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRecover = () => {
    // Aquí puedes implementar la lógica para enviar un correo de recuperación de contraseña
    // Por simplicidad, esta función solo muestra un mensaje de éxito temporal
    setErrorMessage('Se ha enviado un correo electrónico con instrucciones para recuperar la contraseña.');
  };

  return (
    <ImageBackground source={require('../../../assets/background_2.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Recuperar acceso</Text>
        {errorMessage ? <Text style={styles.successMessage}>{errorMessage}</Text> : null}
        <View style={styles.inputContainer}>
          <Image source={require('../../../assets/icon/correo-electronico.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Correo electrónico"
            placeholderTextColor="#ffffff"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <TouchableOpacity onPress={handleRecover} style={[styles.button, { backgroundColor: '#007bff' }]}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: '#007bff',
    color: '#ffffff',
  },
  whiteText: {
    color: '#ffffff',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginBottom: 20,
  },
});

export default RecoverScreen;
