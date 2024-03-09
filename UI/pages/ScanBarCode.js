// react imports
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  ScrollView,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from "react-native-camera-kit";

// style imports
import styles from '../style.js';


const ScanBarCode = ()=>{
    const navigation = useNavigation();

    const handleBarcodeScanned = (event)=>{
        Vibration.vibrate(30);
        navigation.navigate("Add Tags", {barcode: event.nativeEvent.codeStringValue});
    }

    const handlePictureTake = ()=>{
        navigation.navigate("Add Tags", {barcode: "1224121221212"});
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