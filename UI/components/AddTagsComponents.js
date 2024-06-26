// date picker code taken from https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file

// react imports
import React from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';

// function imports
import { giveSuggestedItems, sortAlphabetically } from '../../redux/funtionality/helperFunctions.js';

// data imports
import { searchStores, searchProducts, fetchBrands, searchPromotions } from '../../redux/funtionality/connectionMongo.js';

// component imports
import Dropdown from '../components/Dropdown.js'
import DateTimePicker from '@react-native-community/datetimepicker';

// style imports
import {item_style, text_styles} from '../style.js';


const StoresDropdown = ({store, setStore}) => {
// Dropdown popup that allows user to select a store input
    return (
        <View>
            <Text style={label_text}>Store</Text>
            <Dropdown
                value={store}
                setValue={setStore}
                options={[]}
                type={"store"}
                searchFunc={searchStores}
            />
        </View>
    )
}

const TagsDropdown = ({tags, setTags, setNew, new_products}) => {
// Dropdown popup that allows user to select 1+ product tag inputs
    return (
        <View>
            <Text style={label_text}>Product Tags</Text>
            <Dropdown
                value={tags}
                setValue={setTags}
                options={[]}
                type={"product"}
                placeholder={"Select at least one product"}
                searchFunc={searchProducts}
                setNew={setNew}
                new_values={new_products}
            />
        </View>
    )
}

const BrandsDropdown = ({tags, brand, setBrand, setNew, editable}) => {
// Dropdown popup that allows user to select a brand input

    // find possible brands for each selected product tag
    const [possible_brands, setBrands] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const brands = []
            for (const tag of tags) {
                const product_brands = await fetchBrands(tag)
                product_brands.forEach(brand => {if (!brands.includes(brand)) brands.push(brand)})
            }
            setBrands(sortAlphabetically(brands))
        }
        fetchData()
    }, [tags])

    // function to call when brands are searched in the dropdown
    const searchFunc = (search)=>{
        return giveSuggestedItems(possible_brands, search)
    }

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
                searchFunc={searchFunc}
                setNew={setNew}
                editable={editable}
            />
        </View>
    )
}

const PromotionsDropdown = ({sale, setSale, promotions, setNew}) => {
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
                searchFunc={searchPromotions}
                setNew={setNew}
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