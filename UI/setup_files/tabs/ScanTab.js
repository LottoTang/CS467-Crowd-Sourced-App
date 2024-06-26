import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../../components/Header.js';

import ScanBarCode from '../../pages/ScanBarCode.js';
import AddTagsPage from '../../pages/AddTags.js';


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
              name="Add Tags"
              component={AddTagsPage}
              options={{title: 'Add Item Info'}}
            />
        </Stack.Navigator>
    )
};

export default ScanTab;