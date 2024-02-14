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
import styles, {item_style, text_styles, large_button} from '../style.js';
import Icon from 'react-native-vector-icons/Feather';

function ProfilePage() {
// the Profile page screen itself with its components
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

    const navigation = useNavigation();

    const onLogout = async () => {
        await clearSession({}, {});
        navigation.navigate("Preapp")
    };

    // TODO: replace with user data from database
    const full_name = "John Doe"
    const username = "shoppingpro700"
    const level = 4
    const city = "Corvallis"
    const state = "OR"

    // highest shopper level
    const master = 5

    let text = "levels"
    if (master - level == 1) text = "level"

    const level_names = ["Beginner Shopper", "Frequent Shopper", "Seasoned Shopper", "Experienced Shopper", "Master Shopper"]

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <View style={{height: 30}}></View>

            <View style={item_style}>
                <View style={[styles.wide_row, {alignSelf: 'center'}]}>
                    <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                        {level_names[level - 1]}
                    </Text>
                </View>
                <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                    <Text style={[profile_style.levelIcon, {marginTop: 0, alignSelf: 'flex-end'}]}>
                        {level}
                    </Text>
                </View>
            </View>
            <Text style={plainText}>
                {master - level} {text} to go to Master Shopper!
            </Text>

            <View style={{height: 40}}></View>


            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={styles.row}>
                    <Text style={text_styles.smallTitle}>Account Details</Text>
                    <Pressable style={profile_style.editIcon} onPress={() => {}}>
                        <Icon
                            name={"edit"}
                            size={32}
                            color={styles.secondaryItemBackground.color}
                        />
                    </Pressable>
                </View>
                <View style={{alignSelf: "flex-start", width: '80%'}}>
                    <View style={item_style}>
                        <Icon
                            name={"user"}
                            size={26}
                            color={styles.secondaryItemBackground.color}
                        />
                        <Text style={plainText}>{full_name}</Text>
                    </View>
                    <View style={item_style}>
                        <Icon
                            name={"map-pin"}
                            size={26}
                            color={styles.secondaryItemBackground.color}
                        />
                        <Text style={plainText}>{city}, {state}</Text>
                    </View>
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
    right: {
        paddingTop: 0,
        paddingRight: 12,

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

        alignSelf: 'center',
    },
});
const button = large_button.concat()
const plainText = [text_styles.itemText, profile_style.right]