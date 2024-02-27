// react imports
import React from 'react';
import {
  Alert,
  Pressable,
  Text,
  View
} from 'react-native';
import { useState, useEffect } from 'react'

// function imports
import { giveSuggestedItems } from '../../redux/funtionality/helperFunctions.js';

// component imports
import PopupModal from './PopupModal.js'

// style imports
import {item_style, text_styles} from '../style.js';

function Dropdown ({value, setValue, options, type, placeholder=null, alert=false, alertMsg=[]}) {
// Dropdown component is a selectable box similar to text input, that opens a popup when pressed

    // set up default placeholder text in box
    if (!placeholder) placeholder = `Select a ${type}`

    // popup modal setup
    const [popup, setPopup] = useState(false)

    const closePopup = (selection=null) => {
        if (selection != null) setValue(selection)
        setPopup(false)
    }

    // set up popup options
    let popup_type = "Dropdown"
    if (type != "store") popup_type = ["Dropdown", "Searchable"]
    if (type == "product") popup_type = ["Dropdown", "Searchable", "Select"]


    // search functionality for popups marked as "Searchable"
    const [suggested_items, setSuggestedItems] = useState(options);
    useEffect(() => {
        setSuggestedItems(options)
    }, [options])

    const [search, setSearch] = useState("")
    const handleInputChange = (text)=>{
        setSearch(text);
        const filter_data = giveSuggestedItems(options, text);
        setSuggestedItems(filter_data);
    }

    // open popup if allowed, display alert message otherwise
    const openPopup = () => {
        if (alert) Alert.alert(alertMsg[0], alertMsg[1], [{text: 'Ok'}])
        else setPopup(true)
    }

    return(
        <View>
            <PopupModal
                popup={popup}
                popup_type={popup_type}
                data={suggested_items}
                closePopup={closePopup}
                preselected={value}
                select_type={type}
                search={search}
                setSearch={handleInputChange}
            />
            <Pressable style={item_style.concat({marginBottom: 15})} onPress={openPopup}>
                {value && value.length > 0 ? (
                    <Text style={text_styles.inputText}>{value.toString()}</Text>
                ) : (
                    <Text style={text_styles.placeholder}>{placeholder}</Text>
                )}
            </Pressable>
        </View>
    )
}


export default Dropdown