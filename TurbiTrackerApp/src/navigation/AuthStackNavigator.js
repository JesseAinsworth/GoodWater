import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import RecoverScreen from '../screens/Auth/RecoverScreen';
import HomeScreen from '../screens/main/HomeScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196f3', // Un tono de azul más suave y agradable
          borderBottomWidth: 0, // Quita la línea inferior del encabezado
        },
        headerTintColor: '#ffffff', // Color del texto del encabezado
        headerTitleStyle: {
          fontWeight: 'bold', // Peso de la fuente del texto del encabezado
          fontSize: 20, // Tamaño de la fuente del texto del encabezado
        },
        headerTitleAlign: 'center', // Alineación del texto del encabezado
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Iniciar Sesión'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Registro'}}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverScreen}
        options={{title: 'Recuperación'}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
