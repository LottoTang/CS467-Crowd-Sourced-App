import * as React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ShoppingTab from './tabs/ShoppingTab.js';
import ScanTab from './tabs/ScanTab.js';
import LiveFeedTab from './tabs/LiveFeedTab.js';

import styles from './style.js';

const Tab = createBottomTabNavigator();

function pageSetup() {
    return (
        <Tab.Navigator screenOptions={nav_options}>
            <Tab.Screen
                name="Shopping List"
                component={ShoppingTab}
                />
            <Tab.Screen
                name="Scan Barcode"
                component={ScanTab}
            />
            <Tab.Screen
                name="Live Feed"
                component={LiveFeedTab}
            />
        </Tab.Navigator>
    )
};

export default pageSetup;



const nav_options = {
    header: () => <View style={{height: 0}} />,
    showIcon: false,
    tabBarStyle: {
        backgroundColor: styles.footerColor.color,
        height: 45,
    },
    tabBarLabelStyle: {
        fontSize: 14,
        fontFamily: styles.fontRegular.fontFamily,
        padding: 12,
    },
    tabBarActiveTintColor: styles.secondaryTextColor.color,
    tabBarInactiveTintColor: styles.highlightText.color,
    tabBarActiveBackgroundColor: styles.headerColor.color,
    tabBarIconStyle: {display: 'none'}
}