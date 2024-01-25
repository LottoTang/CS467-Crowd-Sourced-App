/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './redux/store/store';

AppRegistry.registerComponent(appName, () => App);
