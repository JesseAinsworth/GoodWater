import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';


const AppNavigator = () => (
  <NavigationContainer>
<AuthStackNavigator /> 
  </NavigationContainer>
);

export default AppNavigator;
