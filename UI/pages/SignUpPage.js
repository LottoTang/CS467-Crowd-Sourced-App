// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
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

function SignUpPage({route}) {
// the Sign Up page screen itself with its component
    let user = {username: '', fullname: '', city: '', state: ''}
    if (route.params.user) user = route.params.user

    const button_name = route.params.button

    const name = user.fullname.split(" ")

    const [username, setUsername] = useState(user.username);
    const [first_name, setFirst] = useState(name[0]);
    const [last_name, setLast] = useState(name[1]);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);

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

    const serviced_cities = {OR: ["Corvallis"]}
    const invalidAlert = () => {
        const cities = []
        for (let state of Object.keys(serviced_cities)){
            for (let city of serviced_cities[state]) cities.push(`${city}, ${state}`)
        }

        Alert.alert("Invalid Location",
            `Sorry, we do not currently operate in your city. You can use our app to find stores in: ${cities}.`,
            [{text: 'Ok'}]
        );
    }

    const navigation = useNavigation();

    const handleSignUp = () => {
        if (!(state in serviced_cities)) invalidAlert()
        else if (!serviced_cities[state].includes(city)) invalidAlert()

        // if city is valid, send data to database and move to home page
        else {
            navigation.navigate("Tabs")
        }
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <SectionList
                sections={form_data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item, section}) =>
                    <View style={item_style.concat({marginBottom: 15})}>
                        <TextInput
                            style={text_styles.inputText}
                            value={item}
                            onChangeText={section.func}
                        />
                    </View>
                }
                renderSectionHeader={ ({section: {title}}) => (
                    <Text style={[text_styles.itemText, {paddingLeft: 8, paddingBottom: 0}]}>{title}</Text>
                )}
            />
            <Text style={button} onPress={handleSignUp}>
                {button_name}
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default SignUpPage;


const signup_style = StyleSheet.create({
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

const button = [signup_style.button, text_styles.button]