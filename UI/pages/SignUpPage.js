// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
  FlatList,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// style imports
import styles, {item_style, text_styles} from '../style.js';

function SignUpPage() {
// the Sign Up page screen itself with its components

    const [username, setUsername] = useState('');
    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const form_data = [
        {
            title: "Username",
            data: [username],
            func: setUsername
        },
        {
            title: "First name",
            data: [first_name],
            func: setFirst
        },
        {
            title: "Last name",
            data: [last_name],
            func: setLast
        },
        {
            title: "City",
            data: [city],
            func: setCity
        },
        {
            title: "State",
            data: [state],
            func: setState
        },
    ]

    const navigation = useNavigation();

    const handleSignUp = () => {
        navigation.navigate("Tabs")
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <SectionList
                sections={form_data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item, section}) =>
                    <View style={item_style}>
                        <TextInput
                            style={search_text}
                            value={item}
                            onChangeText={section.func}
                        />
                    </View>
                }
                renderSectionHeader={ ({section: {title}}) => (
                    <Text style={text_styles.smallTitle}>{title}</Text>
                )}
            />
            <Text style={button} onPress={handleSignUp}>
                Sign up
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default SignUpPage;


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