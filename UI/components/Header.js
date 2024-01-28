import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import styles from '../style.js';

const headerFunc = ({navigation, route, options, back}) => {
// the Header at the top of each screen, including back button, title, and username
    const title = getHeaderTitle(options, route.name);
    //TODO: set name and level based on passed in user data
    const user = {name: "Username", level: 4}

    return(
        <SafeAreaView style={header_style.header}>
            <View style={top_row}>
                <Text onPress={navigation.goBack} style={header_style.text}>
                    Back
                </Text>

                <View style={styles.row}>
                    <Text style={header_style.number}>{user.level}</Text>
                    <Text style={header_style.text}> {user.name}</Text>
                </View>
            </View>
            <Text style={header_style.title}>
                {title}
            </Text>
        </SafeAreaView>
    )
}

export default headerFunc;



const header_style = StyleSheet.create({
    header: {
        minWidth: '100%',
        height: 123,

        borderBottomWidth: 10,
        borderColor: styles.backgroundColor.color,

        backgroundColor: styles.headerColor.color,
    },
    topButtons: {
        width: '93%',
        marginTop: 10,
    },
    text: {
        color: styles.secondaryTextColor.color,
        fontFamily: styles.fontRegular.fontFamily,
        textAlign: 'center',

        padding: 4,
    },
    number: {
        fontSize: 13,
        color: styles.secondaryTextColor.color,
        fontFamily: 'Ultra-Regular',
        textAlign: 'center',

        borderWidth: 2,
        borderRadius: 20,
        borderColor: styles.secondaryTextColor.color,

        paddingLeft: 7,
        paddingRight: 8,
        paddingTop: 6,
    },
    title: {
        fontSize: 30,
        color: styles.secondaryTextColor.color,
        fontFamily: styles.fontBold.fontFamily,

        padding: 12,
        paddingTop: 0,
        marginLeft: 12,
        marginTop: 16,
    }
});

const top_row = [styles.wideRow, header_style.topButtons];
