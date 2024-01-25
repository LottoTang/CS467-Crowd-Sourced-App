import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    // text color
    color1: {
        color: '#6750A4'
    },
    //background color
    color2: {
        color: '#958DA5'
    },
    // border color
    color3: {
        color: '#B58392'
    },
    app: {
        height: '100%',
        width: '100%'
    },
    container: {
        alignSelf: 'center',
        height: '90%',
        width: '95%'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

const home_style = StyleSheet.create({
   listItem: {
        padding: 12,
        margin: 6,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: styles.color3.color,

        color: styles.color1.color,
        backgroundColor: styles.color2.color
   },
   addButton: {
        alignSelf: 'flex-end',
        paddingLeft: 26,
        paddingRight: 24,
        margin: 6,

        fontSize: 24,

        borderWidth: 1,
        borderRadius: 15,
        borderColor: styles.color3.color,

        color: styles.color1.color,
        backgroundColor: styles.color2.color
   },
   shopButton: {
        alignSelf: 'center',
        padding: 12,
        margin: 6,

        textAlign: 'center',
        fontSize: 24,
        width: '85%',
        minHeight: '9.75%',

        borderWidth: 1,
        borderRadius: 20,
        borderColor: styles.color3.color,

        color: styles.color1.color,
        backgroundColor: styles.color2.color
   }
});

export default styles;
export {home_style};




/**
 * STYLE WORDS
 stackoverflow.com/questions/34311756/list-of-react-native-stylesheet-properties-and-options
 */
