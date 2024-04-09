import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor complete todos los campos');
      return;
    }

    try {
      const response = await fetch("https://turbibackend.onrender.com/usuario/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoElectronico: email, contraseña: password }), // Ajusta los nombres de los campos según el backend
      });

      if (response.ok) {
        // El usuario ha sido autenticado correctamente, redirigir a la pantalla principal
        navigation.navigate('Home');
      } else {
        // La autenticación falló, mostrar un mensaje de error
        const errorData = await response.json();
        setErrorMessage(errorData.mensaje || 'Error en la autenticación'); // Ajusta la propiedad del mensaje de error según la respuesta del backend
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      setErrorMessage('Error al autenticar. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <ImageBackground source={require('../../../assets/background_2.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>¡ Bienvenido !</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
        <View style={styles.inputContainer}>
          <Image source={require('../../../assets/icon/contrasena.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Contraseña"
            placeholderTextColor="#ffffff"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text> 
        </TouchableOpacity>
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.bottomLink]}>
            <Text style={styles.bottomLinkText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')} style={[styles.bottomLink]}>
            <Text style={styles.bottomLinkText}>Recuperar Contraseña</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#007bff',
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
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomLink: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bottomLinkText: {
    color: '#ffffff',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
