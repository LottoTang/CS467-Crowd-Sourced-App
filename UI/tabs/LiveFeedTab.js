import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../components/Header.js';

// Temporarily importing HomeScreen until real component is created
//import HomeScreen from '../pages/HomeScreen.js';

import LiveFeed from '../pages/LiveFeed.js';
import PostPage from '../pages/PostPage.js';

// Testing a live feed page
import { TestLiveFeeds } from '../pages/TestPages/TestLiveFeeds.js';
import TestPostLiveFeed from '../pages/TestPages/TestPostLiveFeed.js';


const Stack = createNativeStackNavigator();

const LiveFeedTab = () => {
    return (
        <Stack.Navigator screenOptions={{header: headerFunc}}>
            <Stack.Screen
              name="LiveFeed"
              component={LiveFeed}
              options={{title: 'Live Feed'}}
            />
            <Stack.Screen
              name="Post Page"
              component={PostPage}
              options={{title: 'Post an Update', animation: "slide_from_right"}}
            />

            <Stack.Screen
              name="TestLiveFeed"
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