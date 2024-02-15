import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Vibration, Image, Pressable } from "react-native";
import CameraKit, { Camera, CameraType, CameraApi } from "react-native-camera-kit";
import { useNavigation } from "@react-navigation/native";
//import TestImageFile from "./testImageFile";

const ScanBarCode = ()=>{

    const [barcode, setBarcode] = useState("");
    const navigation = useNavigation();

    const handleBarcodeScanned = (event)=>{
        Vibration.vibrate(100);

        // This will be activated once we have the app on the phone, for testing purposes we use the below
        //setBarcode(event.nativeEvent.codeStringValue);
    }

    const handlePictureTake = ()=>{
        setBarcode("1224121221212");
        navigation.navigate("ScanInput", {barcode: barcode});
    }


    return (
        <View style={styles.cameraContainer}>
            <Camera style={styles.cameraContainer}
                ref={(ref) => (this.camera = ref)}
                cameraType={CameraType.Back} // front/back(default)
                flashMode='auto'
                scanBarcode={true}
                onReadCode={(event) => handleBarcodeScanned(event)}
                showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
                laserColor='red' // (default red) optional, color of laser in scanner frame
                frameColor='white'
            />
            <Pressable style={styles.button} onPress={()=> handlePictureTake()}>
                <View style={styles.circle}></View>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    cameraContainer: {
        justifyContent: "center",
        flex: 1,
    },
    button: {
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        marginTop: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'red',
        justifyContent: "center"
    },
});

export default ScanBarCode;