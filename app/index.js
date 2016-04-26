import React, {
  Component,
  Text,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';

class App extends Component {
  render () {
    return <TouchableWithoutFeedback onPress={this._onPressButton.bind(this)}>
      <Text>
        Hola mundo
      </Text>
    </TouchableWithoutFeedback>
  }

  _onPressButton (event) {
    ToastAndroid.show('Cual es el peo menor', ToastAndroid.SHORT);
  }
}

export default App;
