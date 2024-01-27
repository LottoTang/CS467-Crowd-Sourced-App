import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from './components/Header.js';
import HomeScreen from './pages/HomeScreen.js';
import AddItems from './pages/AddItems.js';

const Stack = createNativeStackNavigator();

function pageSetup() {
  return (
    <Stack.Navigator screenOptions={{header: headerFunc}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Your Shopping List'}}
        />
        <Stack.Screen
          name="Add Items"
          component={AddItems}
          options={{title: ''}}
        />
    </Stack.Navigator>
  );
};

export default pageSetup;