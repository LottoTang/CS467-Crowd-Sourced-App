import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../components/Header.js';

// Temporarily importing HomeScreen until real component is created
import HomeScreen from '../pages/HomeScreen.js';


const Stack = createNativeStackNavigator();

const ScanTab = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="Scan"
              component={HomeScreen}
              options={{title: 'Scan a Barcode'}}
            />
        </Stack.Navigator>
    )
};

export default ScanTab;