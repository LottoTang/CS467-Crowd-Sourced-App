import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from './components/Header.js';
import HomeScreen from './pages/HomeScreen.js';
import TestingPage from './pages/TestingPage.js';

const Stack = createNativeStackNavigator();

// Added a testing page to test navigation functionality

function pageSetup() {
  return (
    <Stack.Navigator screenOptions={{header: headerFunc}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Your Shopping List'}}
        />
        <Stack.Screen name="Testing"
          component={TestingPage}
          options={{title: 'Testing Page'}}
        />
    </Stack.Navigator>
  );
};

export default pageSetup;