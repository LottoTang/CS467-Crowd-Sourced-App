import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../components/Header.js';

import HomeScreen from '../pages/HomeScreen.js';
import AddItems from '../pages/AddItems.js';
import SelectBrand from '../pages/SelectBrand.js';
import ViewItem from '../pages/ViewItem.js';

// Intermediate pages to test functionality until you create the actual view
import TestingPage from '../pages/TestPages/TestingPage.js';
import { AddItemForm } from '../pages/TestPages/TestAddItem.js';
import { TestViewProduct } from '../pages/TestPages/TestViewProduct.js';
import { BrandSelector } from '../pages/TestPages/TestSelectBrand.js';
import { TestStoreRec } from '../pages/TestPages/TestStoreRec.js';


const Stack = createNativeStackNavigator();

const ShoppingTab = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Your Shopping List'}}
            />
            <Stack.Screen
              name="Add Items"
              component={AddItems}
              options={{title: ''}}
            />
            <Stack.Screen
              name="Select Brand"
              component={SelectBrand}
              options={{title: ''}}
            />
            <Stack.Screen
              name="View Item"
              component={ViewItem}
              options={{title: ''}}
            />

            <Stack.Screen name="Testing"
              component={TestingPage}
              options={{title: 'Testing Page'}}
            />
            <Stack.Screen name="TestAddItem"
              component={AddItemForm}
              options={{title: "Test Add Item"}}
            />
            <Stack.Screen name="TestBrandSelect"
              component={BrandSelector}
              options={{title: "Test Select Brand"}}
            />
            <Stack.Screen name="TestViewProduct"
              component={TestViewProduct}
              options={{title: "Test View Item"}}
            />
            <Stack.Screen name="TestStoreRec"
              component={TestStoreRec}
              options={{title: "Test Store Rec"}}
            />
        </Stack.Navigator>
    )
};

export default ShoppingTab;