// react imports
import React from 'react';
import {
  Alert,
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

// style imports
import styles, {text_styles} from '../style.js';


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

export { StoresDropdown, TagsDropdown, BrandsDropdown, PromotionsDropdown }


const label_text = [text_styles.itemText, {paddingLeft: 8, paddingBottom: 0}]