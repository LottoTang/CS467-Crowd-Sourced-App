// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';

// component imports
import CheckList from './CheckList.js'

// style imports
import styles, {item_style, text_styles, add_button, popup_style} from '../style.js';


const SearchBar = ({search, setSearch, addable, add}) => {
// displays a box at the top where user can search the options
// includes a button for creating a new option

    // placeholder on search bar, tells user if they can create or not
    let placeholder = "Search"
    if (addable) placeholder = "Search/Create"

    // addable is false if search is empty or if search text is already an existing option
    if (!search) addable = false

    // make space for the button next to text input if addable
    let width = "100%"
    if (addable) width = "79%"

    return(
        <View>
            <Text style={[text_styles.itemText, {paddingLeft: 8, paddingBottom: 0}]}>Search</Text>
            <View style={item_style.concat({marginBottom: 15})}>
                <TextInput
                    style={[text_styles.placeholder, {width: width}]}
                    value={search}
                    onChangeText={setSearch}
                    placeholder={placeholder}
                    placeholderTextColor={text_styles.placeholder.color}
                />
                { addable ? (
                    <Text style={add_button.concat(popup_style.addButton)} onPress={()=> add(search)}>+</Text>
                ) : null}
            </View>
        </View>
    )
}


const PopupList = ({data, type, close, search, setSearch, setNew}) => {
// displays a FlatList of the provided array of data
    let title;
    if (type == "Sort" || type == "Filter") title = `${type} by:`

    // if new option is created, select it and close the popup
    const add = (new_item) => {
        setNew(new_item)
        close(new_item)
    }

    return (
        <View style={popup_style.style}>
            { type.includes("Searchable") ? (
                <SearchBar search={search} setSearch={setSearch} addable={!data.includes(search)} add={add}/>
            ) : (
                <Text style={text_styles.smallTitle}>{title}</Text>
            ) }
            <FlatList
                data={data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <Pressable style={item_style} onPress={() => close(item)} >
                        <Text style={text_styles.itemText}>{item}</Text>
                    </Pressable>
                }
            />
        </View>
    )
}

const PopupCheckList = ({data, preselected, close, select_type, popup_type, search, setSearch, setNew}) => {
// displays a checklist of the provided array of data
    const [selected_items, setSelectedItems] = useState(preselected)

    // if new option is created, add it and close the popup
    const add = (new_item) => {
        setNew(new_item)
        close(selected_items.concat(new_item))
    }

    return (
        <View style={popup_style.style}>
            <View style={{maxHeight: "65%"}}>
                { popup_type.includes("Searchable") ? (
                    <SearchBar search={search} setSearch={setSearch} addable={!data.includes(search)} add={add} />
                ) : null }
                <CheckList
                    data={data}
                    type={select_type}
                    selected_items={selected_items}
                    setSelectedItems={setSelectedItems}
                />
            </View>
            <View style={styles.bottom} >
            <Pressable style={[popup_style.selectButton]} onPress={() => close(selected_items)}>
                <Text style={[add_button, popup_style.buttonText]}>Select</Text>
            </Pressable>
            </View>
        </View>
    )
}

function PopupModal({popup, popup_type="Sort", data, closePopup, preselected=[], select_type="store", search, setSearch, setNew}) {
// the popup modal itself, which hides the background and pulls up a white tab with data
// displays a checklist or a flatlist depending on the popup options passed
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
                    { popup_type.includes("Select") ? (
                            <PopupCheckList
                                data={data}
                                preselected={preselected}
                                close={closePopup}
                                select_type={select_type}
                                popup_type={popup_type}
                                search={search}
                                setSearch={setSearch}
                                setNew={setNew}
                            />
                        ) : (
                            <PopupList
                                data={data}
                                type={popup_type}
                                close={closePopup}
                                search={search}
                                setSearch={setSearch}
                                setNew={setNew}
                            />
                    )}
                </View>
            </Modal>
        </View>
    )
}

export default PopupModal;