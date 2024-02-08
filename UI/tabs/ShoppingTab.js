import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../components/Header.js';
import { useSelector } from 'react-redux';
import { capitalizeTitle } from '../ui_helpers.js'

import HomeScreen from '../pages/HomeScreen.js';
import AddItems from '../pages/AddItems.js';
import SelectBrand from '../pages/SelectBrand.js';
import ViewItem from '../pages/ViewItem.js';
import StoreRecs from '../pages/StoreRecs.js';
import ItemsAtStore from '../pages/ItemsAtStore.js';

// Intermediate pages to test functionality until you create the actual view
import TestingPage from '../pages/TestPages/TestingPage.js';
import { AddItemForm } from '../pages/TestPages/TestAddItem.js';
import { TestViewProduct } from '../pages/TestPages/TestViewProduct.js';
import { BrandSelector } from '../pages/TestPages/TestSelectBrand.js';
import { TestStoreRec } from '../pages/TestPages/TestStoreRec.js';
import { TestMissingItems } from '../pages/TestPages/TestMissingItems.js';


const Stack = createNativeStackNavigator();

const ShoppingTab = () => {
    const selected = useSelector(state=> state.selected_item);
    let item_title = ""
    if (selected) item_title = capitalizeTitle(selected);

    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Your Shopping List', animation: "slide_from_left"}}
            />
            <Stack.Screen
              name="Add Items"
              component={AddItems}
              options={{title: '', animation: "slide_from_right"}}
            />
            <Stack.Screen
              name="Select Brand"
              component={SelectBrand}
              options={{title: item_title, animation: "slide_from_right"}}
            />
            <Stack.Screen
              name="View Item"
              component={ViewItem}
              options={{title: item_title, animation: "slide_from_right"}}
            />
            <Stack.Screen
              name="View Store Recs"
              component={StoreRecs}
              options={{title: 'Your Stores', animation: "slide_from_bottom"}}
            />
            <Stack.Screen
              name="View Items at Store"
              component={ItemsAtStore}
              options={{title: '', animation: "slide_from_right"}}
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
            <Stack.Screen name="TestMissingItems"
              component={TestMissingItems}
              options={{title: "Test Missing Items"}}
            />
        </Stack.Navigator>
    )
};

export default ShoppingTab;