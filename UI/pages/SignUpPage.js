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
import { useDispatch } from 'react-redux';

// function imports
import { setUser } from '../../redux/actions/actions.js';

// data imports
import axios from 'axios';
import {getUser} from '../../redux/funtionality/connectionMongo.js'

// style imports
import styles, {item_style, text_styles} from '../style.js';

function SignUpPage({route}) {
// the Sign Up page screen itself with its component
    let user = {auth_sub: route.params.sub, email: route.params.email, username: '', firstname: '', lastname: '', city: '', state: ''}
    if (route.params.user) user = route.params.user

    const button_name = route.params.button

    const [username, setUsername] = useState(user.username);
    const [first_name, setFirst] = useState(user.firstname);
    const [last_name, setLast] = useState(user.lastname);
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
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        if (!(state in serviced_cities)) invalidAlert()
        else if (!serviced_cities[state].includes(city)) invalidAlert()

        // if city is valid, send data to database and move to home page
        else {
            let reqFunc = axios.post
            let user_id = ''
            if (route.params.user) {
                reqFunc = axios.patch
                user_id = route.params.user._id
            }

            const new_user = {
                auth_sub: user.auth_sub,
                email: user.email,
                firstname: first_name,
                lastname: last_name,
                username: username,
                city: city,
                state: state
            }

            // verify if user data has changed or not
            let identical = true
            for (key in new_user) {
                if (new_user[key] !== user[key]) identical = false
            }

            if (identical) navigation.navigate("Tabs")

            else {
                try{
                    const response = await reqFunc(`http://${address}:3000/users/${user_id}`,
                        new_user
                    ).then(async result => {
                        dispatch(setUser(result.data));
                        navigation.navigate("Tabs")
                    })
                    .catch(error => console.log(error))
                } catch(error) {
                    console.error(error);
                }
            }
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