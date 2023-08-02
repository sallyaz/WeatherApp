import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStack} from './main-navigation';

const AppNavigation: React.FC = () => {
  const AppNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'app'} component={MainStack} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
