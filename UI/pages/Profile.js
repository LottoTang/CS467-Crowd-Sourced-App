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

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <View style={styles.bottom}>
                <Text style={button} onPress={()=>{}}>
                    Sign out
                </Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default ProfilePage;

const button = large_button.concat()