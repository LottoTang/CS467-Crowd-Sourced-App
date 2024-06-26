// react imports
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useAuth0 } from 'react-native-auth0';

// style imports
import styles, {item_style, text_styles, large_button} from '../style.js';
import Icon from 'react-native-vector-icons/Feather';

function ProfilePage() {
// the Profile page screen itself with its components
    const {authorize, clearSession, getCredentials, error, isLoading} = useAuth0();
    const user = useSelector(state => state.user);

    const navigation = useNavigation();

    const onLogout = async () => {
        await clearSession({}, {});
        navigation.navigate("Preapp", {screen: "Login"})
    };

    const onEdit = () => {
        navigation.navigate('Sign Up', {user: user, button: "Update"})
    }

    // highest shopper level
    const master = 4

    let text = "levels"
    if (master - user.shopping_level == 1) text = "level"

    let whole_text = `${master - user.shopping_level} ${text} to go to Master Shopper!`
    if (user.shopping_level == 4) whole_text = "Congrats, you're a MASTER Shopper!"

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={title}>{user.username}</Text>

            <View style={item_style}>
                <View style={[styles.wide_row, {alignSelf: 'center'}]}>
                    <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                        {level_names[user.shopping_level - 1]}
                    </Text>
                </View>
                <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                    <Text style={[profile_style.levelIcon, {marginTop: 0, alignSelf: 'flex-end'}]}>
                        {user.shopping_level}
                    </Text>
                </View>
            </View>
            <Text style={plainText}>
                {whole_text}
            </Text>

            <View style={{height: 50}}></View>


            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={styles.row}>
                    <Text style={text_styles.smallTitle}>Account Details</Text>
                    <Pressable style={profile_style.editIcon} onPress={onEdit}>
                        <Icon
                            name={"edit"}
                            size={28}
                            color={styles.secondaryItemBackground.color}
                        />
                    </Pressable>
                </View>

                <View style={item_style.concat({justifyContent: 'flex-start'})}>
                        <Icon
                            name={"user"}
                            size={26}
                            color={styles.secondaryItemBackground.color}
                        />
                        <Text style={plainText}>{user.firstname} {user.lastname}</Text>
                    </View>
                    <View style={item_style.concat({justifyContent: 'flex-start'})}>
                        <Icon
                            name={"map-pin"}
                            size={26}
                            color={styles.secondaryItemBackground.color}
                        />
                        <Text style={plainText}>{user.city}, {user.state}</Text>
                    </View>
            </View>

            <View style={styles.bottom}>
                <Text style={button} onPress={onLogout}>
                    Sign out
                </Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default ProfilePage;

const profile_style = StyleSheet.create({
    username: {
        color: text_styles.itemText.color,
        textAlign: "center",
        marginTop: 25,
        marginBottom: 35,
    },
    smallText: {
        paddingLeft: 32,
        paddingRight: 12,
        paddingTop: 0,

        alignSelf: 'flex-end'
    },
    levelIcon: {
        fontSize: 18,
        color: styles.secondaryItemBackground.color,
        fontFamily: 'Ultra-Regular',
        textAlign: 'center',

        borderWidth: 2,
        borderRadius: 20,
        borderColor: styles.secondaryItemBackground.color,

        paddingLeft: 8,
        paddingRight: 9,
        paddingTop: 4,
    },
    editIcon: {
        paddingRight: 12,
        paddingBottom: 15,

        alignSelf: 'flex-end',
    },
});
const button = large_button.concat()
const plainText = [text_styles.itemText, profile_style.smallText]
const title = [text_styles.largeTitle, profile_style.username]