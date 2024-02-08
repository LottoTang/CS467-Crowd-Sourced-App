// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// style imports
import styles, {item_style, text_styles} from '../style.js';

function LoginPage() {
// the Login page screen itself with its components

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate("Tabs")
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <Text style={login_style.title}>Sign in</Text>
            <Text style={text_styles.smallTitle}>Email</Text>
            <View style={item_style}>
                <TextInput
                    style={search_text}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <Text style={text_styles.smallTitle}>Password</Text>
            <View style={[item_style, {marginBottom: 24}]}>
                <TextInput
                    style={search_text}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View >
                <Text style={button} onPress={()=>handleSignIn()}>
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
        marginBottom: 6
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