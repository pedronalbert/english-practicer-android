import React, {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';
import wordsDB from '../../wordsDB';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

import TestProgress from '../../components/TestProgress';

class TestView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordsLeft: [],
      correctCount: 0,
      incorrectCount: 0
    }
  }

  componentWillMount() {
    this._initTest();
  }

  render() {
    let word = this.state.wordsLeft[0];
    let answerState = this.state.answerState;
    let calificateButton;
    let hiddenWordInformation;

    if (answerState == 'waiting') {
      calificateButton = <TouchableWithoutFeedback onPress={this._handlePressCalificate.bind(this)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Calificar</Text>
        </View>
      </TouchableWithoutFeedback>
    } else {
      calificateButton = <TouchableWithoutFeedback onPress={this._handlePressNextWord.bind(this)}>
        <View style={[styles.button, styles.redBackground, this.state.correctAnswer && styles.greenBackground]}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </View>
      </TouchableWithoutFeedback>
    }

    if (answerState != 'waiting') {
      hiddenWordInformation = <View>
        <View style={styles.burble}>
          <Text style={styles.titleText}>Ingles:</Text>
          <Text style={styles.wordText}>{word.english}</Text>
        </View>
        <View style={styles.burble}>
          <Text style={styles.titleText}>Ipa:</Text>
          <Text style={styles.wordText}>{word.ipa}</Text>
        </View>
      </View>
    }

    return <View style={styles.root}>
      <View style={styles.burble}>
        <Text style={styles.titleText}>Español:</Text>
        <Text style={styles.wordText}>{word.spanish}</Text>
      </View>

      {hiddenWordInformation}

      <TextInput
        value={this.state.response}
        onChangeText={this._handleChangeTextResponse.bind(this)}
      />

      {calificateButton}

      <TestProgress
        correctCount={this.state.correctCount}
        incorrectCount={this.state.incorrectCount}
        wordsLeft={this.state.wordsLeft.length}
      />

    </View>
  }

  _initTest() {
    let initWord = this.props.initWord;
    let finalWord = this.props.finalWord;

    let words = _.shuffle(_.slice(wordsDB, initWord - 1, finalWord));

    this.setState({
      wordsLeft: words,
      answerState: 'waiting',
      response: '',
      correctCount: 0,
      incorrectCount: 0
    })
  }

  _handlePressCalificate () {
    let word = this.state.wordsLeft[0];
    let response = this.state.response.trim().toLowerCase();

    if(word.english == response) {
      this.setState({
        answerState: 'answered',
        correctAnswer: true,
        correctCount: this.state.correctCount + 1
      });

    } else {  
      this.setState({
        answerState: 'answered',
        correctAnswer: false,
        incorrectCount: this.state.incorrectCount + 1
      });
    }
  }

  _handleChangeTextResponse (text) {
    this.setState({response: text})
  }

  _handlePressNextWord () {
    let wordsLeft = this.state.wordsLeft;

    if(wordsLeft.length > 1) {
      wordsLeft.shift();

      this.setState({
        wordsLeft: wordsLeft,
        answerState: 'waiting',
        response: ''
      });
    } else {
      Actions.testResultsView({
        correctCount: this.state.correctCount,
        incorrectCount: this.state.incorrectCount,
        initWord: this.props.initWord,
        finalWord: this.props.finalWord
      })
    }
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 25,
    marginTop: 30
  },

  burble: {
    flexDirection: 'row',
    margin: 5
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 15
  },

  wordText: {
    fontSize: 15
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

  boldText: {
    fontWeight: 'bold'
  },

  greenBackground: {
    backgroundColor: '#4CAF50'
  },

  redBackground: {
    backgroundColor: '#D50000'
  }
});

export default TestView;
