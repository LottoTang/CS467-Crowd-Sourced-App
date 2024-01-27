import React from 'react';
import {StyleSheet} from 'react-native';

const colors = StyleSheet.create({
    color1: {
        color: 'black'
    },
    color2: {
        color: 'white'
    },
    color3: {
        color: '#62c4c4'
    },
    color4: {
        color: '#159292'
    },
    color5: {
        color: '#008080'
    },
    color6: {
        color: '#d2dbdb'
    },
})

const styles = StyleSheet.create({
    textColor: {
        color: colors.color1.color
    },
    itemBackground: {
        color: colors.color2.color
    },
    borderColor: {
        color: colors.color5.color
    },
    footerColor: {
        color: colors.color3.color
    },
    headerColor: {
        color: colors.color4.color
    },
    secondaryTextColor: {
        color: colors.color2.color
    },
    secondaryItemBackground: {
        color: colors.color5.color
    },
    backgroundColor: {
        color: colors.color6.color
    },


    fontRegular: {
        fontFamily: 'Kanit-Medium'
    },
    fontMedium: {
        fontFamily: 'Kanit-SemiBold'
    },
    fontBold: {
        fontFamily: 'Maitree-SemiBold'
    },


    app: {
        width: '100%',
        height: '100%',
    },
    container: {
        width: '95%',
        height: '90%',

        alignSelf: 'center',
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    wideRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        justifyContent: 'space-between',
        alignSelf: 'center',
    }
});

const text_styles = StyleSheet.create({
    itemText: {
        color: styles.textColor.color,
        fontFamily: styles.fontMedium.fontFamily,
    },
    button: {
        fontSize: 24,
        color: styles.secondaryTextColor.color,
        fontFamily: styles.fontBold.fontFamily,
        textAlign: 'center',

        borderWidth: 1,
        borderColor: styles.borderColor.color,

        backgroundColor: styles.secondaryItemBackground.color
    },
    smallTitle: {
        fontSize: 20,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 8,
        marginTop: 4,
    }
});


const item_style = [
    StyleSheet.create({
       style: {
           borderWidth: 1,
           borderRadius: 5,
           borderColor: styles.borderColor.color,

           padding: 12,
           margin: 6,

           backgroundColor: styles.itemBackground.color
       }
    }).style,
    text_styles.itemText
];

const add_button = [
    StyleSheet.create({
        style: {
            borderRadius: 15,

            paddingLeft: 26,
            paddingRight: 24,
        }
    }).style,
    text_styles.button
];

export default styles;
export {item_style, text_styles, add_button}




/**
 * STYLE WORDS
 stackoverflow.com/questions/34311756/list-of-react-native-stylesheet-properties-and-options
 */


/**
 * STYLE ORGANIZATION
 Text:
    size
    color
    font
    weight
    alignment

 Width
 Height

 Borders:
    width
    radius
    color

 Padding:
    left
    right
    top
    bottom
 Margins:
    "

 Flex:
    direction
    wrap
 Alignment:
    justify
    align

 Background

 */
