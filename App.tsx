/**
 * Crowd-Sourced Shopping App
 * OSU Course: CS467
 * Authors: drososk@oregonstate.edu, giacobbj@oregonstate.edu, tanglon@oregonstate.edu, harders@oregonstate.edu
 * https://github.com/LottoTang/CS467-Crowd-Sourced-App
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux/store/store.js';
import { Provider } from 'react-redux';

import appSetup from './UI/app_setup.js'

import {useAuth0, Auth0Provider} from 'react-native-auth0';
import config from './auth0-configuration';


function App(): React.JSX.Element {
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <Provider store={store}>
      <NavigationContainer>
          {appSetup()}
      </NavigationContainer>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
