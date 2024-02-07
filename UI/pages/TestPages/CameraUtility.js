// Functionality for reading barcode using camera

import React, { useState } from "react";
import { RNCamera } from "react-native-camera";
import { CameraKitCamera, CameraKitCameraScreen } from "react-native-camera-kit";
import { View, Text, StyleSheet, Pressable } from "react-native";


const CameraUtility = () =>{

    const [ barcode, setBarcode ] = useState(null);

    const handleBarcodeScan = (code) =>{
        setBarcode(code[0].barcode);
    };

    return (
        <View>
            <CameraKitCameraScreen
                scanBarcode
                showFrame
                onReadCode={()=>handleBarcodeScan()}
            />
            
        </View>
    )
}

export { CameraUtility };