// react imports
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import { useDispatch } from 'react-redux';

// function imports
import { deleteItemInShoppingList } from '../../redux/actions/actions.js';

// style imports
import styles, {item_style, text_styles,} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const headerFunc = ({navigation, route, options, back}) => {
  // the Header at the top of each screen, including back button, title, and username
  //TODO: set name and level based on passed in user data
  const user = {name: 'Username', level: 4};

  const title = getHeaderTitle(options, route.name);

    let header_height = 116
    if (title == "") header_height = 63

    let icon_size = 0
    if (route.params) {
        if (route.params.deletable) icon_size = 32
    }

    let header_padding = 10
    if (title == "Scan a Barcode") header_padding = 0


    const dispatch = useDispatch();

    // Delete item from shopping list
    const handleDeleteItem = () =>{
        dispatch(deleteItemInShoppingList(route.params.product));
        navigation.navigate("Home");
    }

    return(
        <SafeAreaView style={[header_style.header, {height: header_height, borderBottomWidth: header_padding}]}>
            <View style={top_row}>
                <Text onPress={navigation.goBack} style={header_style.text}>
                    Back
                </Text>

                <View style={styles.row}>
                    <Text style={header_style.number}>{user.level}</Text>
                    <Text style={header_style.text}> {user.name}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={header_style.title}>
                    {title}
                </Text>
                <Pressable style={header_style.trash} onPress={()=> handleDeleteItem()}>
                   <Icon
                       name={"trash-can-outline"}
                       size={icon_size}
                       color={styles.secondaryTextColor.color}
                   />
               </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default headerFunc;



const header_style = StyleSheet.create({
    header: {
        minWidth: '100%',

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
        marginLeft: 8,
        marginTop: 10,
    },
    trash: {
        marginRight: 18,
        alignSelf: 'center'
    }
});

const top_row = [styles.wideRow, header_style.topButtons];
