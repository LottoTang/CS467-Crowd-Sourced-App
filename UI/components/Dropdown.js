// react imports
import React from 'react';
import {
  Pressable,
  Text,
  View
} from 'react-native';
import { useState } from 'react'

// function imports
import { giveSuggestedItems } from '../../redux/funtionality/helperFunctions.js';

// component imports
import PopupModal from './PopupModal.js'

// style imports
import {item_style, text_styles} from '../style.js';

function Dropdown ({value, setValue, options, type, placeholder=null}) {
    const [popup, setPopup] = useState(false)

    const closePopup = (selection=null) => {
        if (selection != null) setValue(selection.value)
        setPopup(false)
    }

    if (!placeholder) placeholder = `Select a ${type}`

    const [search, setSearch] = useState("")
    const [suggested_items, setSuggestedItems] = useState(options);

    const handleInputChange = (text)=>{
        setSearch(text);
        const filter_data = giveSuggestedItems(options, text);
        setSuggestedItems(filter_data);
    }

    return(
        <View>
            <PopupModal
                popup={popup}
                popup_type={"Dropdown"}
                data={suggested_items}
                closePopup={closePopup}
                search={search}
                setSearch={handleInputChange}
            />
            <Pressable style={item_style.concat({marginBottom: 15})} onPress={() => setPopup(true)}>
                {value ? (
                    <Text style={text_styles.inputText}>{value}</Text>
                ) : (
                    <Text style={text_styles.placeholder}>{placeholder}</Text>
                )}
            </Pressable>
        </View>
    )
}


export default Dropdown