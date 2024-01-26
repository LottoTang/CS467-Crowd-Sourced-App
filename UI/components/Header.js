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
            <View style={header_style.ends}>
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
        height: 113,
        minWidth: '100%',

        backgroundColor: styles.headerColor.color,
        borderBottomWidth: 1,
        borderColor: styles.borderColor.color
    },
    ends: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        justifyContent: 'space-between',
        alignSelf: 'center',

        width: '93%',
        marginTop: 10,
    },
    text: {
        textAlign: 'center',
        fontFamily: styles.fontRegular.fontFamily,

        padding: 4,
        color: styles.secondaryTextColor.color,
    },
    number: {
        textAlign: 'center',
        paddingLeft: 7,
        paddingRight: 8,
        paddingTop: 6,

        borderWidth: 2,
        borderRadius: 20,
        borderColor: styles.secondaryTextColor.color,

        color: styles.secondaryTextColor.color,
        fontFamily: 'Ultra-Regular',
        fontSize: 13
    },
    title: {
        fontSize: 30,
        fontFamily: styles.fontBold.fontFamily,

        color: styles.secondaryTextColor.color,

        padding: 12,
        paddingTop: 0,
        marginLeft: 12,
        marginTop: 16,
    }
});
