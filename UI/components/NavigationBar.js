import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
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
        color: styles.textColor.color,
        fontFamily: styles.fontRegular.fontFamily,
        textAlign: 'center',

        width: '33.3333%',
        padding: 12,

        backgroundColor: styles.footerColor.color
    },
    bar: {
        minWidth: '100%',
        marginTop: 20,

        flex: 1,
        alignItems: 'center',
    }
});
