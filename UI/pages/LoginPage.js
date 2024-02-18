// Code retrieved from : https://github.com/auth0-samples/auth0-react-native-sample/blob/master/00-Login-Hooks/App.tsx

// react imports
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth0 } from 'react-native-auth0';

// style imports
import styles, {large_button} from '../style.js';

function LoginPage() {
// the Login page screen itself with its components
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

    // TODO: replace "all_user" code with code accessing user table in database
    const all_users = {}

    const navigation = useNavigation();

    const onLogin = async () => {
        await authorize({}, {});
        await checkAuthorization()
    };

    const checkAuthorization = async () => {
        const credentials = await getCredentials();
        const token = credentials?.accessToken
        if (token !== undefined ) {
            all_users[token] = {username: "", fullname: ""}

            // if this token isn't in user database, create new user
            if (!(token in all_users)) navigation.navigate('Sign Up', {button: "Sign Up"})
            else navigation.navigate("Tabs")
        }
    };

    useEffect(() => {
        checkAuthorization()
    }, [])

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