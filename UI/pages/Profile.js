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
import styles, {text_styles, large_button} from '../style.js';

function ProfilePage() {
// the Profile page screen itself with its components
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

    const navigation = useNavigation();

    const onLogout = async () => {
        await clearSession({}, {});
        navigation.navigate("Preapp")
    };

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
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

const button = large_button.concat()