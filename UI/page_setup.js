import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from './components/Header.js';
import HomeScreen from './pages/HomeScreen.js';

const Stack = createNativeStackNavigator();

function pageSetup() {
  return (
    <Stack.Navigator screenOptions={{header: headerFunc}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Your Shopping List'}}
        />
    </Stack.Navigator>
  );
};

export default pageSetup;