import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../components/Header.js';

// Temporarily importing HomeScreen until real component is created
import HomeScreen from '../pages/HomeScreen.js';
// Temporary scan page for scanning an item's barcode
import ScanBarCode from '../pages/TestPages/ScanBarCode.js';
import TestScanInput from '../pages/TestPages/TestScanInput.js';


const Stack = createNativeStackNavigator();

const ScanTab = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="Scan"
              component={ScanBarCode}
              options={{title: 'Scan a Barcode'}}
            />
            <Stack.Screen
                name="ScanInput"
                component={TestScanInput}
                options={{title: 'Input Details'}}
            />
        </Stack.Navigator>
    )
};

export default ScanTab;