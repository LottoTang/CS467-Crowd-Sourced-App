// react imports
import React from 'react';
import {
  Pressable,
  Text,
  View
} from 'react-native';
import { useState } from 'react';

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

    //TODO: allow users to type on the dropdown input box to search for values and add new values for brand and product tags

    return(
        <View>
            <PopupModal
                popup={popup}
                popup_type={"Dropdown"}
                data={options}
                closePopup={closePopup}
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