import * as React from 'react';
import { SafeAreaView } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginPage from './pages/LoginPage.js';
import TabSetup from './tab_setup.js';

const Stack = createNativeStackNavigator();

const headerFunc = ({navigation, route, options, back}) => {
    return(
        <SafeAreaView style={{height: 0}}>
        </SafeAreaView>
    )
}

const appSetup = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{title: ''}}
            />
            <Stack.Screen
              name="Tabs"
              component={TabSetup}
              options={{title: ''}}
            />
        </Stack.Navigator>
    )
}


export default appSetup;
