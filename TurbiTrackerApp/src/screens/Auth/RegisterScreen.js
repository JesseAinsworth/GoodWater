import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      alert('Por favor complete todos los campos');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    try {
      const response = await fetch("https://turbibackend.onrender.com/usuario/register", { // Cambia la URL por la URL correcta de tu API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoElectronico: email, contraseña: password }), // Ajusta los nombres de los campos según el backend
      });
  
      if (response.ok) {
        alert('Registro exitoso');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        alert('Error al registrar: ' + errorData.mensaje); // Ajusta la propiedad del mensaje de error según la respuesta del backend
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. Por favor, inténtelo de nuevo más tarde.');
    }
  };
  

  return (
    <ImageBackground source={require('../../../assets/background_2.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Nueva cuenta</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../../../assets/icon/usuario.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Nombre"
            placeholderTextColor="#ffffff"
            onChangeText={text => setNombre(text)}
            value={nombre}
          />
        </View>
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
            secureTextEntry={!showPassword}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={showPassword ? require('../../../assets/icon/eye-open.png') : require('../../../assets/icon/eye-closed.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../../assets/icon/contrasena.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
          <TextInput
            style={[styles.input, styles.whiteText]}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#ffffff"
            secureTextEntry={!showPassword}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
});

export default RegisterScreen;
