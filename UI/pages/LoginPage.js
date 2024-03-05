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
import { useDispatch } from 'react-redux';
import { useAuth0 } from 'react-native-auth0';

// function imports
import { setUser } from '../../redux/actions/actions.js';

// data imports
import axios from 'axios';
import { decreaseUserLevel } from '../../redux/funtionality/postPatchFunctions.js';

// component imports
import Loading from '../components/LoadingPage.js'

// style imports
import styles, {large_button} from '../style.js';

function LoginPage() {
// the Login page screen itself with its components
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onLogin = async () => {
        await authorize({}, {});
        await checkAuthorization()
    };

    const checkAuthorization = async () => {
        // check if the user has logged in through auth0
        const credentials = await getCredentials();
        const token = credentials?.accessToken

        if (token && user) {
            // test if the user is in the database
            try{
                const response = await axios.get(`http://10.0.2.2:3000/users/checker/${user.sub}`, {}
                ).then(async result => {
                    let user_obj = result.data

                    const last_post = new Date(user_obj.user_creation_date)
                    const last_downgrade = new Date(user_obj.last_downgrade_date)

                    const getMonths = (date_1, date_2) => {
                        const millisecs_absent = date_1 - date_2
                        const days_absent = millisecs_absent / 86400000
                        const months_absent = Math.floor(days_absent / 30)
                        return months_absent
                    }

                    const total_downgrade = getMonths(new Date(), last_post)
                    let already_downgraded = getMonths(last_downgrade, last_post)

                    if (already_downgraded < 0) already_downgraded = 0

                    let to_downgrade = total_downgrade - already_downgraded

                    for (let i = 0; i < to_downgrade; i++) {
                        user_obj = await decreaseUserLevel(user_obj._id,);
                    }

                    // if user is found, send to home page and set redux user
                    dispatch(setUser(user_obj));
                    navigation.navigate("Tabs")
                    })
                .catch(error => {
                    console.log(error)
                    // if no user found, send to sign up page
                    if (error.response.status == 404) navigation.navigate('Sign Up', {button: "Sign Up", sub: user.sub, email: user.email})
                    });
            } catch(error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        checkAuthorization()
    }, [user])

    if (isLoading) {
        return <Loading />
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