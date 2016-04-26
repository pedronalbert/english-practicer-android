/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/routes/TestView';

class practicer extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('practicer', () => practicer);
