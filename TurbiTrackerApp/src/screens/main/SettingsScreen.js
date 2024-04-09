import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Componente principal de la pantalla de Configuración
export default function SettingsScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateUserInfo = () => {
    if (!name || !email) {
      alert('Por favor, complete todos los campos');
      return;
    }
    setTimeout(() => {
      alert('Información Actualizada');
    }, 1000);
  };

  const handleChangePassword = () => {
    if (!password || !newPassword) {
      alert('Por favor, complete todos los campos');
      return;
    }
    setTimeout(() => {
      alert('Contraseña Cambiada');
    }, 1000);
  };

  const handleChangeEmail = () => {
    if (!email) {
      alert('Por favor, ingrese su nuevo correo electrónico');
      return;
    }
    setTimeout(() => {
      alert('Correo Electrónico Cambiado');
    }, 1000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            setTimeout(() => {
              alert('Sesión Cerrada');
            }, 1000);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={text => setName(text)}
        editable={!password && !newPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        editable={!name && !email}
      />
      {password && (
        <TextInput
          style={styles.input}
          placeholder="Nueva Contraseña"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
        editable={!password && !newPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateUserInfo}>
        <Text style={styles.buttonText}>Actualizar Información de Usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Cambiar Correo Electrónico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5252' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión (Advertencia)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#607d8b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#2196F3',
  },
  input: {
    height: 40,
    borderColor: '#CFD8DC',
    borderWidth: 1,
    marginBottom: 10,
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
