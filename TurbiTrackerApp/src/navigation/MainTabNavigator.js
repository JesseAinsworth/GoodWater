import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
// import ProfileScreen from '../screens/Settings/ProfileScreen';
// import SettingsScreen from '../screens/Settings/SettingsScreen';
// import SensorsScreen from '../screens/MoreOptionsScreen';
// import HomeScreen from '../screens/main/HomeScreen';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import SensorsScreen from '../screens/main/SensorsScreen';
import ReportScreen from '../screens/main/ReportScreen';
import SettingsScreen from '../screens/main/SettingsScreen';


const Tab = createBottomTabNavigator();
const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#2196f3',
          borderWidth: 5,
          borderColor: '#ededed',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? require('../../assets/icon/analisis.png') : require('../../assets/icon/analisis.png');
          } else if (route.name === 'Notifications') {
            iconName = focused ? require('../../assets/icon/notificacion.png') : require('../../assets/icon/notificacion.png');
          } else if (route.name === 'Sensors') {
            iconName = focused ? require('../../assets/icon/sensor.png') : require('../../assets/icon/sensor.png');
          } else if (route.name === 'ReportScreen') {
            iconName = focused ? require('../../assets/icon/analitica.png') : require('../../assets/icon/analitica.png');
          } else if (route.name === 'SettingsScreen') {
            iconName = focused ? require('../../assets/icon/ajustamiento.png') : require('../../assets/icon/ajustamiento.png');
          }

          return <Image source={iconName} style={{ width: 25, height: 25, tintColor: color }} />;
        },
        tabBarActiveTintColor: '#64b5f6',
        tabBarInactiveTintColor: '#d7dbdd',
        
        tabBarStyle: {
          backgroundColor: '#34495e',
          borderRadius: 20, // Increased border radius
          borderWidth: 2, // Added border width
          borderColor: '#2c3e50', // Border color
          height: 70, // Increased height
          justifyContent: 'center', // Center items vertically
          paddingHorizontal: 10, // Add horizontal padding
          marginHorizontal: 10, // Add horizontal margin
        },
        tabBarLabelStyle: {
          fontSize: 14, // Increase font size
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginBottom: -5, // Adjust icon position
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Análisis', headerShown: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Notificaciones', headerShown: false }}
      />
      <Tab.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{ tabBarLabel: 'Sensores', headerShown: false }}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ tabBarLabel: 'Reportes', headerShown: false }}
      />
            <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Ajustes', headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;