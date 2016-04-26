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

class TestView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySelector: true,
      finished: false,
      initWord: '1',
      finalWord: '5',
      wordsLeft: [],
      correctCount: 0,
      incorrectCount: 0
    }
  }

  render() {
    let stadistics = <View style={styles.stadistics}>
      <View style={styles.stadisticsChild}>
        <Text style={styles.boldText}>Correctas: </Text>
        <Text>{this.state.correctCount}</Text>
      </View>

      <View style={styles.stadisticsChild}>
        <Text style={styles.boldText}>Incorrectas: </Text>
        <Text>{this.state.incorrectCount}</Text>
      </View>

      <View style={styles.stadisticsChild}>
        <Text style={styles.boldText}>Restantes: </Text>
        <Text>{this.state.wordsLeft.length}</Text>
      </View>
    </View>

    if (this.state.displaySelector) {
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

        <TouchableWithoutFeedback onPress={this._initTest.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Test</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    }

    if (!this.state.finished) {
      if (this.state.wordsLeft.length > 0) {
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

          {stadistics}
        </View>
      }
    } else {
      return <View style={styles.root}>
        {stadistics}

        <TouchableWithoutFeedback onPress={this._initTest.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Repetir Test</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => {
          this.setState({
            displaySelector: true
          })
        }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Nuevo Test</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    }

  }

  _initTest() {
    let initWord = parseInt(this.state.initWord);
    let finalWord = parseInt(this.state.finalWord);

    let words = _.shuffle(_.slice(wordsDB, initWord - 1, finalWord));

    this.setState({
      displaySelector: false,
      finished: false,
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
    wordsLeft.shift();

    if(wordsLeft.length > 0) {
      this.setState({
        wordsLeft: wordsLeft,
        answerState: 'waiting',
        response: ''
      });
    } else {
      this.setState({finished: true});
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 25
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

  stadistics: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  stadisticsChild: {
    flexDirection: 'row'
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
