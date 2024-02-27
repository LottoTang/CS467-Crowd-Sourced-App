// react imports
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from "react-native-camera-kit";

//import TestImageFile from "./testImageFile";

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';


const ScanBarCode = ()=>{

    const [barcode, setBarcode] = useState("");
    const navigation = useNavigation();

    const handleBarcodeScanned = (event)=>{
        Vibration.vibrate(30);

        // This will be activated once we have the app on the phone, for testing purposes we use the below
        setBarcode(event.nativeEvent.codeStringValue);
        navigation.navigate("Add Tags", {barcode: barcode});
    }

    const handlePictureTake = ()=>{
        setBarcode("1224121221212");
        navigation.navigate("Add Tags", {barcode: barcode});
    }


    return (
        <SafeAreaView style={styles.app}>
                <ScrollView
                    contentOffset={{y: 500}}
                    scrollEnabled={false}>

                    <Camera style={{height: 650}}
                        ref={(ref) => (this.camera = ref)}
                        cameraType={CameraType.Back} // front/back(default)
                        flashMode='auto'
                        scanBarcode={true}
                        onReadCode={(event) => handleBarcodeScanned(event)}
                        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
                        laserColor={styles.secondaryItemBackground.color} // (default red) optional, color of laser in scanner frame
                        frameColor='white'
                    />
                    <Pressable style={camera_style.button_border} onPress={()=> handlePictureTake()}>
                        <View style={camera_style.button} />
                    </Pressable>
                </ScrollView>
        </SafeAreaView>
    )
};

const camera_style = StyleSheet.create({
    button: {
        height: 65,
        width: 65,

        borderRadius: 50,

        position: "absolute",
        bottom: 8,

        alignSelf: "center",

        backgroundColor: styles.secondaryItemBackground.color,
    },
    button_border: {
        height: 90,
        width: 90,

        borderWidth: 5,
        borderRadius: 50,
        borderColor: "white",

        position: "absolute",
        bottom: 40,

        alignSelf: "center",

        backgroundColor: "#00000000",
    },
});

export default ScanBarCode;