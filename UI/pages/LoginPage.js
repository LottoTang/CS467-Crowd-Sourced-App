// Code retrieved from : https://github.com/auth0-samples/auth0-react-native-sample/blob/master/00-Login-Hooks/App.tsx

// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth0 } from 'react-native-auth0';

// style imports
import styles, {large_button} from '../style.js';

function LoginPage() {
// the Login page screen itself with its components
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

    const navigation = useNavigation();

    const onLogin = async () => {
        await authorize({}, {});
        const credentials = await getCredentials();
        if (credentials?.accessToken !== undefined ) navigation.navigate("Tabs")
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.app}>
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <Text style={login_style.title}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <Text style={button} onPress={onLogin}>
                Sign in
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default LoginPage;


const login_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
        marginBottom: 6,

        alignSelf: 'center'
    },
    button: {
       padding: 12,
       margin: 6,
    }
});

const button = large_button.concat(login_style.button);