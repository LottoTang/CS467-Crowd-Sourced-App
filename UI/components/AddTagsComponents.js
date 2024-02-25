// date picker code taken from https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file

// react imports
import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// data imports
import axios from 'axios';

// component imports
import Dropdown from '../components/Dropdown.js'
import DateTimePicker from '@react-native-community/datetimepicker';

// style imports
import styles, {item_style, text_styles} from '../style.js';


const StoresDropdown = ({store, setStore, stores}) => {
// Dropdown popup that allows user to select a store input

    return (
        <View>
            <Text style={label_text}>Store</Text>
            <Dropdown
                value={store}
                setValue={setStore}
                options={stores}
                type={"store"}
            />
        </View>
    )
}

const TagsDropdown = ({tags, setTags}) => {
// Dropdown popup that allows user to select 1+ product tag inputs
    const products = []
    const all_products = useSelector(state => state.all_products)
    for (product_id in all_products) {
        const product = all_products[product_id]
        products.push(product.name)
    }

    return (
        <View>
            <Text style={label_text}>Product Tags</Text>
            <Dropdown
                value={tags}
                setValue={setTags}
                options={products}
                type={"product"}
                placeholder={"Select at least one product"}
            />
        </View>
    )
}

const BrandsDropdown = ({tags, brand, setBrand}) => {
// Dropdown popup that allows user to select a brand input
    const all_products = useSelector(state => state.all_products)

    // find possible brands for each selected product tag
    const [possible_brands, setBrands] = useState([])
    useEffect(() => {
        let brands = new Set()
        for (const tag of tags) {
            for (const product_id in all_products) {
                const product = all_products[product_id]
                if (product.name == tag) product.brands.forEach(brand => brands.add(brand))
            }
        }
        const new_brands = []
        brands.forEach(brand => new_brands.push(brand))
        setBrands(new_brands)
    }, [tags])

    return (
        <View>
            <Text style={label_text}>Brand</Text>
            <Dropdown
                value={brand}
                setValue={setBrand}
                options={possible_brands}
                type={"brand"}
                alert={tags.length == 0}
                alertMsg={["Invalid Product", "Please select at least one product first"]}
            />
        </View>
    )
}

const PromotionsDropdown = ({sale, setSale, promotions}) => {
// Dropdown popup that allows user to select a promotion input

    return (
        <View>
            <Text style={label_text}>Sale</Text>
            <Dropdown
                value={sale}
                setValue={setSale}
                options={promotions}
                type={"sale"}
                placeholder={"None"}
            />
        </View>
    )
}

const SaleDatePicker = ({endSale, setEnd, pickDate, setPicker}) => {
// Popup shows a calendar that allows selecting a sale end date
    const handleSelectDate = (event, selectedDate) => {
        setPicker(false);
        setEnd(selectedDate);
    };

    return (
        <View>
            {pickDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={endSale}
                    mode={"date"}
                    is24Hour={true}
                    onChange={handleSelectDate}
                />
            )}
            <Text style={label_text}>Sale End Date</Text>
            <Pressable style={item_style.concat({marginBottom: 15})} onPress={() => setPicker(true)}>
                {endSale ? (
                    <Text style={text_styles.inputText}>{endSale.toDateString()}</Text>
                ) : (
                    <Text style={text_styles.placeholder}>Select a date</Text>
                )}
            </Pressable>
        </View>
    )
}

export { StoresDropdown, TagsDropdown, BrandsDropdown, PromotionsDropdown, SaleDatePicker }


const label_text = [text_styles.itemText, {paddingLeft: 8, paddingBottom: 0}]