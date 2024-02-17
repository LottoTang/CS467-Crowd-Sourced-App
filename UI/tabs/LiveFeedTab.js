import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../components/Header.js';

// Temporarily importing HomeScreen until real component is created
//import HomeScreen from '../pages/HomeScreen.js';

// Testing a live feed page
import { TestLiveFeeds } from '../pages/TestPages/TestLiveFeeds.js';
import TestPostLiveFeed from '../pages/TestPages/TestPostLiveFeed.js';


const Stack = createNativeStackNavigator();

const LiveFeedTab = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="LiveFeed"
              component={TestLiveFeeds}
              options={{title: 'Live Feed'}}
            />
            <Stack.Screen 
                name="MakePost"
                component={TestPostLiveFeed}
                options={{title: 'Make Post'}}
            />
        </Stack.Navigator>
    )
};

export default LiveFeedTab;