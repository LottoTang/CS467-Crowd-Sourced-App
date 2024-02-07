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

// style imports
import styles, {item_style, text_styles, popup_style} from '../style.js';

function PopupModal({popup, popup_type="Sort", popup_vals, closePopup}) {
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
                    <View style={popup_style.style}>
                        <Text style={text_styles.smallTitle}>{popup_type} by:</Text>
                        <FlatList
                            data={popup_vals}
                            keyExtractor={(item, index)=> index.toString()}
                            renderItem = { ({item: {label, value}}) =>
                                <Pressable style={item_style} onPress={() => closePopup({value})} >
                                    <Text style={text_styles.itemText}>{label}</Text>
                                </Pressable>
                            }
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default PopupModal;