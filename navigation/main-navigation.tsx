import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CityDetailsScreen from '../screens/CityDetailsScreen';

export const MainStack = () => {
  const MainStack = createNativeStackNavigator();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: 'City Information',
      }}>
      <MainStack.Screen
        name={'home'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen name={'city-details'} component={CityDetailsScreen} />
    </MainStack.Navigator>
  );
};
