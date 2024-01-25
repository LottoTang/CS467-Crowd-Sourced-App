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
import {getHeaderTitle} from '@react-navigation/elements';
import styles from '../style.js';

const headerFunc = ({navigation, route, options, back}) => {
// the Header at the top of each screen, including back button, title, and username
    const title = getHeaderTitle(options, route.name);

    return(
        <SafeAreaView style={header_style.header}>
            <View style={header_style.ends}>
                <Text
                        onPress={navigation.goBack}
                        style={header_style.text}
                    >Back
                </Text>
                <View style={styles.row}>
                    <Text style={header_style.number}>3</Text>
                    <Text style={header_style.text}>Username</Text>
                </View>
            </View>
            <Text style={header_style.title}>{title}</Text>
        </SafeAreaView>
    )
}

export default headerFunc;


const header_style = StyleSheet.create({
    header: {
        height: 120,
        minWidth: '100%',

        backgroundColor: styles.color3.color,
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
        padding: 3,

        borderWidth: 1,
        borderColor: styles.color3.color,

        color: styles.color1.color
    },
    number: {
        textAlign: 'center',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 4,

        borderWidth: 1,
        borderColor: styles.color1.color,
        borderRadius: 20,

        fontFamily: 'Ultra-Regular',
        color: styles.color1.color
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',

        padding: 12,
        marginLeft: 12,
        marginTop: 16,

        borderWidth: 1,
        borderColor: styles.color3.color,

        color: styles.color1.color
    }
});
