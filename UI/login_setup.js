import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import styles from './style.js';

import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import TestUserLogin from './pages/TestPages/TestUserLogin.js';

const Stack = createNativeStackNavigator();

const headerFunc = ({navigation, route, options, back}) => {

    return(
        <SafeAreaView style={header_style.header}>
            <Text style={header_style.title}>
                Crowd-Sourced       Shopping App
            </Text>
        </SafeAreaView>
    )
}

const LoginSetup = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{title: ''}}
            />
            <Stack.Screen
              name="Sign Up"
              component={SignUpPage}
              options={{title: '', animation: "slide_from_right"}}
            />
            <Stack.Screen
              name="TestUserLogin"
              component={TestUserLogin}
              options={{title: ''}}
            />
        </Stack.Navigator>
    )
}


export default LoginSetup;


const header_style = StyleSheet.create({
    header: {
        minWidth: '100%',
        height: 0,

        borderBottomWidth: 10,
        borderColor: styles.backgroundColor.color,

        backgroundColor: styles.headerColor.color,
    },
    title: {
        fontSize: 30,
        color: styles.secondaryTextColor.color,
        fontFamily: styles.fontBold.fontFamily,
        lineHeight: 40,

        padding: 12,
        marginLeft: 8,
        marginTop: 28,
    },
})