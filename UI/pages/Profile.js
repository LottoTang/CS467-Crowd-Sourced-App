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
import styles, {text_styles} from '../style.js';

function ProfilePage() {
// the Profile page screen itself with its components

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    </SafeAreaView>
    );
};

export default ProfilePage;