import * as React from 'react';
import { SafeAreaView } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginSetup from './login_setup.js';
import TabSetup from './tab_setup.js';
import ProfileSetup from './profile_setup.js';

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
              name="Preapp"
              component={LoginSetup}
              options={{title: ''}}
            />
            <Stack.Screen
              name="Tabs"
              component={TabSetup}
              options={{title: '', animation: "slide_from_right"}}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileSetup}
                options={{title: '', animation: "slide_from_bottom"}}
            />
        </Stack.Navigator>
    )
}


export default appSetup;
