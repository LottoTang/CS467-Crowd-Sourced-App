import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import headerFunc from '../../components/Header.js';

import LiveFeed from '../../pages/LiveFeed.js';
import PostPage from '../../pages/PostPage.js';


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
        </Stack.Navigator>
    )
};

export default LiveFeedTab;