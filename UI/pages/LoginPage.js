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
import styles, {item_style, text_styles} from '../style.js';

function LoginPage() {
// the Login page screen itself with its components
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

    const onLogin = async () => {
        await authorize({}, {});
        const credentials = await getCredentials();
        Alert.alert('AccessToken: ' + credentials?.accessToken);
    };

    const onLogout = async () => {
        await clearSession({}, {});
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

    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate("Tabs")
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <View >
                <Text style={button} onPress={()=>onLogin()}>
                    Sign in
                </Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default LoginPage;


const login_style = StyleSheet.create({
    searchText: {
        width: '100%',
        paddingTop: 0,
        paddingBottom: 0,
    },
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
        marginBottom: 6,

        alignSelf: 'center'
    },
    button: {
       width: '80%',
       minHeight: '9.75%',

       borderWidth: 1,
       borderRadius: 20,

       padding: 12,
       margin: 6,

       alignSelf: 'center',
    }
});

const search_text = [text_styles.itemText, login_style.searchText]
const button = [login_style.button, text_styles.button]