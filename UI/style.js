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
    }
});

const item_style = StyleSheet.create({
   style: {
       color: styles.textColor.color,
       fontFamily: styles.fontMedium.fontFamily,

       borderWidth: 1,
       borderRadius: 5,
       borderColor: styles.borderColor.color,

       padding: 12,
       margin: 6,

       backgroundColor: styles.itemBackground.color
   }
})

const text_styles = {
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
}

export default styles;
export {item_style, text_styles}




/**
 * STYLE WORDS
 stackoverflow.com/questions/34311756/list-of-react-native-stylesheet-properties-and-options
 */
