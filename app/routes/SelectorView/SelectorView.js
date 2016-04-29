import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';


class SelectorView extends Component {
  componentWillMount () {
    if (this.props.initWord) {
      this.setState({
        initWord: this.props.initWord.toString(),
        finalWord: this.props.finalWord.toString()
      });
    } else {
      this.setState({initWord: '1', finalWord: '2'});
    }
  }

  render () {
    let goToTest = this._goToTest.bind(this);

    return <View style={styles.root}>
      <Text>N° Palabra Inicial</Text>

      <TextInput
        value={this.state.initWord}
        onChangeText={(text) => {
          this.setState({
            initWord: text
          })
        }}
      />

      <Text>N° Palabra Final</Text>
      <TextInput
        value={this.state.finalWord}
        onChangeText={(text) => {
          this.setState({
            finalWord: text
          })
        }}
      />

      <TouchableWithoutFeedback onPress={goToTest}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Test</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  }

  _goToTest () {
    let initWord = parseInt(this.state.initWord);
    let finalWord = parseInt(this.state.finalWord);
    
    Actions.testView({initWord: initWord, finalWord: finalWord});
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 25,
    marginTop: 30
  },

  button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#2196F3'
  },

  buttonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  }
});

export default SelectorView;