import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import TestProgress from '../../components/TestProgress';

class TestResultView extends Component {
  render() {
    return <View style={styles.root}>
      <TestProgress
        correctCount={this.props.correctCount}
        incorrectCount={this.props.incorrectCount}
        wordsLeft={0}
      />

      <TouchableWithoutFeedback onPress={this._handlePressRepeatTest.bind(this)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Repetir Test</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={this._handlePressNewTest.bind(this)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Nuevo Test</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  }

  _handlePressRepeatTest () {
    Actions.testView({initWord: this.props.initWord, finalWord: this.props.finalWord})
  }

  _handlePressNewTest () {
    Actions.selectorView({initWord: this.props.initWord, finalWord: this.props.finalWord});
  }
}

const styles = StyleSheet.create({
  root: {
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
  },
})

export default TestResultView;