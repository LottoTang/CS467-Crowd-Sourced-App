// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';

// component imports
import CheckList from './CheckList.js'

// style imports
import styles, {item_style, text_styles, add_button, popup_style} from '../style.js';


const PopupList = ({data, type, close}) => {
    // displays a Flatlist of the provided data
    return (
        <View style={popup_style.style}>
            <Text style={text_styles.smallTitle}>{type} by:</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item: {label, value}}) =>
                    <Pressable style={item_style} onPress={() => close({value})} >
                        <Text style={text_styles.itemText}>{label}</Text>
                    </Pressable>
                }
            />
        </View>
    )
}

const PopupCheckList = ({data, preselected, close}) => {
    // displays a checklist of the provided data
    const [selected_items, setSelectedItems] = useState(preselected)

    return (
        <View style={popup_style.style}>
            <View style={{maxHeight: "74%"}}>
                <CheckList
                    data={data}
                    type="store"
                    selected_items={selected_items}
                    setSelectedItems={setSelectedItems}
                />
            </View>
            <Pressable style={[popup_style.selectButton, styles.bottom]} onPress={() => close(selected_items)}>
                <Text style={[add_button, {fontSize: 13}]}>Filter</Text>
            </Pressable>
        </View>
    )
}

function PopupModal({popup, popup_type="Sort", data, closePopup, preselected=[]}) {
    // the popup modal itself, which hides the background and pulls up a white tab with data
    return (
        <View>
            <Modal
                animationType="fade"
                visible={popup}
                transparent={true}
                onRequestClose={() => closePopup()}
            >
                <View style={popup_style.background}>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                visible={popup}
                transparent={true}
                onRequestClose={() => closePopup()}
            >
                <View style={popup_style.container}>
                    { popup_type == "Select" ? (
                            <PopupCheckList data={data} preselected={preselected} close={closePopup}/>
                        ) : (
                            <PopupList data={data} type={popup_type} close={closePopup}/>
                    )}
                </View>
            </Modal>
        </View>
    )
}

export default PopupModal;