import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  BackAndroid
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import SelectorView from './app/routes/SelectorView';
import TestView from './app/routes/TestView';
import TestResultsView from './app/routes/TestResultsView';

class practicer extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="selectorView" 
          initial={true} 
          component={SelectorView} 
          title='Seleccionar Palabras'
          type='reset'
        />

        <Scene key="testView" 
          component={TestView} 
          title='Test'
        />

        <Scene key="testResultsView" 
          component={TestResultsView} 
          title='Reultados'
          type='replace'
        />

      </Scene>
    </Router>
  }
}

BackAndroid.addEventListener('hardwareBackPress', function() {
     if(Actions.pop()) {
      return true;
     }

     return false;
});

AppRegistry.registerComponent('practicer', () => practicer);
