import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NEWS_LIST_SCREEN} from '../constants/Constants';
import NewListScreen from '../modules/newsList/NewList.screen';
export const MainApp = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={NEWS_LIST_SCREEN}
          component={NewListScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
