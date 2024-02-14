import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const TestImageFile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/testImages/barcode3.png")}
        style={styles.barcodeImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeImage: {
    width: 200, // Adjust width and height as needed
    height: 100,
  },
});

export default TestImageFile;
