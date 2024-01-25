import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import styles from '../style.js';

function NavigationBar() {
// the Navigation Bar at the bottom of each screen
  return (
    <SafeAreaView style={nav_style.bar, styles.bottom}>
        <View style={styles.row}>
            <Text style={nav_style.button}>Shopping List</Text>
            <Text style={nav_style.button}>Scan Barcode</Text>
            <Text style={nav_style.button}>Live Feed</Text>
        </View>
    </SafeAreaView>
  );
};

export default NavigationBar;



const nav_style = StyleSheet.create({
    button: {
        textAlign: 'center',

        width: '33.3333%',
        padding: 12,

        color: styles.color1.color,
        backgroundColor: styles.color3.color,

        borderWidth: 1,
        borderColor: styles.color3.color
    },
    bar: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        minWidth: '100%'
    }
});
