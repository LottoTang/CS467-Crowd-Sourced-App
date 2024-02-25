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
    return(
        <View>
            <Text style={[text_styles.itemText, {paddingLeft: 8, paddingBottom: 0}]}>Search</Text>
            <View style={item_style.concat({marginBottom: 15})}>
                <TextInput
                    style={[text_styles.placeholder, {width: "79%"}]}
                    value={search}
                    onChangeText={setSearch}
                    placeholder={"Search"}
                    placeholderTextColor={text_styles.placeholder.color}
                />
                { addable ? (
                    <Text style={button} onPress={()=> add(search)}>+</Text>
                ) : null}
            </View>
        </View>
    )
}


const PopupList = ({data, type, close, search, setSearch}) => {
// displays a FlatList of the provided data (expects data in a list of names to display)
    let title;
    if (type == "Sort" || type == "Filter") title = `${type} by:`

    let addable = true
    if (data.includes(search) || !search) addable = false

    const add = (new_item) => {
        close(new_item)
    }

    return (
        <View style={popup_style.style}>
            { type.includes("Searchable") ? (
                <SearchBar search={search} setSearch={setSearch} addable={addable} add={add}/>
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

const PopupCheckList = ({data, preselected, close, select_type, popup_type, search, setSearch}) => {
// displays a checklist of the provided data (expects data in a list of names to display)
    const [selected_items, setSelectedItems] = useState(preselected)

    let addable = true
    if (data.includes(search) || !search) addable = false

    const add = (new_item) => {
        close(selected_items.concat(new_item))
    }

    return (
        <View style={popup_style.style}>
            <View style={{maxHeight: "65%"}}>
                { popup_type.includes("Searchable") ? (
                    <SearchBar search={search} setSearch={setSearch} addable={addable} add={add} />
                ) : null }
                <CheckList
                    data={data}
                    type={select_type}
                    selected_items={selected_items}
                    setSelectedItems={setSelectedItems}
                />
            </View>
            <Pressable style={[popup_style.selectButton, styles.bottom]} onPress={() => close(selected_items)}>
                <Text style={[add_button, popup_style.buttonText]}>Select</Text>
            </Pressable>
        </View>
    )
}

function PopupModal({popup, popup_type="Sort", data, closePopup, preselected=[], select_type="store", search, setSearch}) {
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
                    { popup_type.includes("Select") ? (
                            <PopupCheckList
                                data={data}
                                preselected={preselected}
                                close={closePopup}
                                select_type={select_type}
                                popup_type={popup_type}
                                search={search}
                                setSearch={setSearch}
                            />
                        ) : (
                            <PopupList
                                data={data}
                                type={popup_type}
                                close={closePopup}
                                search={search}
                                setSearch={setSearch}
                            />
                    )}
                </View>
            </Modal>
        </View>
    )
}

export default PopupModal;

const button = add_button.concat({
                                         fontSize: 21,
                                         lineHeight: 20,
                                         paddingTop: 12,
                                         height: 29,
                                     });