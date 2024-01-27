import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from './components/Header.js';
import HomeScreen from './pages/HomeScreen.js';
import TestingPage from './pages/TestPages/TestingPage.js';
import { AddItemForm } from './pages/TestPages/TestAddItem.js';
import { TestViewProduct } from './pages/TestPages/TestViewProduct.js';

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
        <Stack.Screen name="TestAddItem"
          component={AddItemForm}
          options={{title: "Test Add Item"}}
        />
        <Stack.Screen name="TestViewProduct"
          component={TestViewProduct}
          options={{title: "Test View Item"}}
        />

    </Stack.Navigator>
  );
};

export default pageSetup;