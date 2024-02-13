import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Vibration } from "react-native";
import CameraKit, { Camera, CameraType, CameraApi } from "react-native-camera-kit";
import { useNavigation } from "@react-navigation/native";
import TestScanInput from "./TestScanInput";

const ScanBarCode = ()=>{

    const [barcode, setBarcode] = useState("");
    const navigation = useNavigation();

    useEffect(()=>{
        const time = setTimeout(()=>{
            setBarcode("");
        }, 2000);
        return () =>{
            clearTimeout(time);
        }
    }, [barcode]);

    const handleBarcodeScanned = (event)=>{
        Vibration.vibrate(100);
        setBarcode(event.nativeEvent.codeStringValue);
        navigation.navigate("ScanInput", {Scannedbarcode: barcode});
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
        </View>
    )
};

const styles = StyleSheet.create({
    cameraContainer: {
        justifyContent: "center",

        flex: 1
    }
})

export default ScanBarCode;