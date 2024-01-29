import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, {item_style, text_styles} from '../style.js';


const ItemComponent = ({item}) => {
// item component that represents one brand
    const navigation = useNavigation();

    const [selected, setSelected] = useState(false);
    const [icon, setIcon] = useState("checkbox-blank-outline");

    const handleSelectBrand = (item) => {
        setSelected(!selected)
    };

    useEffect(() => {
        if (selected) {
            setIcon("checkbox-marked")
        } else {
            setIcon("checkbox-blank-outline")
        };
    }, [selected]);

    return (
        <Pressable style={item_style} onPress={() => handleSelectBrand()}>
            <Text style={text_styles.itemText}>
                {item}
            </Text>
            <Icon
                name={icon}
                size={26}
                color={styles.secondaryItemBackground.color}
                style={{alignSelf: 'center'}}
            />
        </Pressable>
    )
}

const BrandList = () => {
// list component for the brand list
    // TODO: replace the list with data pulled from querying database
    const brands = ["Rao's", "Pomi"]

    const navigation = useNavigation();
    const handleAddItem = (item) => {
        // Go to select brand page
        navigation.navigate('Select Brand', {product: item});
    };

    return (
        <View>
            <FlatList
                data={brands}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} />
                }
            />
        </View>
    )
}

function SelectBrand({route}) {
// the Select Brand screen itself with its components
    const {product} = route.params;

    // for the page title, capitalize the first letter of the item
    const words = product.split(" ");
    let item_name = ''
    for (const word of words) {
        const letter = word[0].toUpperCase()
        item_name = item_name.concat(letter, word.slice(1, word.length), " ")
    };

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={brand_style.title}>{item_name}</Text>
            <Text style={text_styles.smallTitle}>Brand(s):</Text>
            <BrandList />
        </View>
    </SafeAreaView>
    );
};

export default SelectBrand;


const brand_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,
    },
});