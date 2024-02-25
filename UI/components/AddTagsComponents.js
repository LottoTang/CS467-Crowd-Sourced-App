// react imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// data imports
import axios from 'axios';
import { stores } from "../../testData/testingData2";

// component imports
import Dropdown from '../components/Dropdown.js'

// style imports
import styles, {text_styles} from '../style.js';


const StoresDropdown = ({store, setStore, user}) => {
// Dropdown popup that allows user to select a store input
    // TODO: pull stores from database

    const available_stores = []
    for (const store_id in stores) {
        const store = stores[store_id]
        if (store.city == user.city && store.state == user.state) available_stores.push(store.name)
    }

    return (
        <View>
            <Text style={label_text}>Store</Text>
            <Dropdown
                value={store}
                setValue={setStore}
                options={available_stores}
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
    const [possible_brands, setBrands] = useState(["Please select one or more product tags first"])
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
        if (new_brands.length != 0) setBrands(new_brands)
        else setBrands(["Please select one or more product tags first"])
    }, [tags])


    return (
        <View>
            <Text style={label_text}>Brand</Text>
            <Dropdown
                value={brand}
                setValue={setBrand}
                options={possible_brands}
                type={"brand"}
            />
        </View>
    )
}

const PromotionsDropdown = ({sale, setSale}) => {
// Dropdown popup that allows user to select a promotion input
    const all_promotions = useSelector(state => state.all_promotions)
    const promotions = ["None"]
    for (const promotion_id in all_promotions) {
        const promotion = all_promotions[promotion_id]
        promotions.push(promotion.promotion_type)
    }

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