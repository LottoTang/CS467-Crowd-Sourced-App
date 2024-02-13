import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from './components/Header.js';
import ProfilePage from './pages/Profile.js'

import styles from './style.js';

const Stack = createNativeStackNavigator();

const ProfileSetup = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
                name="Profile Page"
                component={ProfilePage}
                options={{title: '', animation: "slide_from_bottom"}}
            />
        </Stack.Navigator>
    )
}

export default ProfileSetup;