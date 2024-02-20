import React from 'react';
import {StyleSheet} from 'react-native';

const colors = StyleSheet.create({
    color1: {
        color: '#000000'
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
    color7: {
        color: '#0e5858'
    },
})

const styles = StyleSheet.create({
    textColor: {
        color: colors.color1.color
    },
    highlightText: {
        color: colors.color7.color
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

        backgroundColor: colors.color6.color
    },
    container: {
        width: '95%',
        height: '98%',

        alignSelf: 'center',
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    wideRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    horizontalList: {
        maxWidth: '96%',
        marginLeft: 10
    },
});

const text_styles = StyleSheet.create({
    itemText: {
        color: styles.textColor.color,
        fontFamily: styles.fontMedium.fontFamily,

        paddingTop: 4,
        paddingBottom: 4,
    },
    inputText: {
        color: styles.textColor.color,
        fontFamily: styles.fontMedium.fontFamily,

        width: '100%',

        paddingTop: 0,
        paddingBottom: 0,
    },
    placeholder: {
        color: `${styles.textColor.color}80`,
        fontFamily: styles.fontMedium.fontFamily,

        width: '100%',

        paddingTop: 0,
        paddingBottom: 0,
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
    },
    largeTitle: {
        fontSize: 30,
        color: styles.secondaryTextColor.color,
        fontFamily: styles.fontBold.fontFamily,

        padding: 12,
        paddingTop: 0,
        marginLeft: 8,
        marginTop: 10,
    },
    footnote: {
        fontSize: 11,
        color: styles.textColor.color,
        fontFamily: styles.fontRegular.fontFamily,
        lineHeight: 14,
    },
});

const item_style = [
    StyleSheet.create({
       style: {
           width: '96.5%',

           borderWidth: 1,
           borderRadius: 5,
           borderColor: styles.borderColor.color,

           padding: 9,
           paddingLeft: 12,
           paddingRight: 12,
           margin: 6,

           backgroundColor: styles.itemBackground.color
       }
    }).style,
    styles.wideRow
];

const add_button = [
    text_styles.button,
    StyleSheet.create({
        style: {
            borderRadius: 15,

            paddingLeft: 26,
            paddingRight: 24,

            lineHeight: 25,
            paddingTop: 17,
            height: 40,
            fontSize: 26,
        }
    }).style
];

const large_button = [
    StyleSheet.create({
        button: {
           width: '80%',
           minHeight: '9.75%',

           borderWidth: 1,
           borderRadius: 20,

           padding: 8,

           alignSelf: 'center',
        }
    }).button,
    text_styles.button
];

const popup_style = StyleSheet.create({
    style: {
        width: '95%',
        height: '60%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: styles.itemBackground.color,
        alignSelf: 'center',
        padding: 20
    },
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    background: {
        height: '100%',
        backgroundColor: `${styles.backgroundColor.color}80`,
    },
    selectButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    buttonText: {
        fontSize: 13,

        lineHeight: 10,
        paddingTop: 12,
        height: 22,
    },
})

export default styles;
export {item_style, text_styles, add_button, large_button, popup_style}




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

 Position

 Flex:
    direction
    wrap
 Alignment:
    justify
    align

 Background

 */
