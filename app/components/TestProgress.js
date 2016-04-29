import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';

class TestProgress extends Component {
  render () {
    return <View style={styles.stadistics}>
      <View style={styles.stadisticsChild}>
        <Text style={styles.boldText}>Correctas: </Text>
        <Text>{this.props.correctCount}</Text>
      </View>

      <View style={styles.stadisticsChild}>
        <Text style={styles.boldText}>Incorrectas: </Text>
        <Text>{this.props.incorrectCount}</Text>
      </View>

      <View style={styles.stadisticsChild}>
        <Text style={styles.boldText}>Restantes: </Text>
        <Text>{this.props.wordsLeft}</Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  stadistics: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  stadisticsChild: {
    flexDirection: 'row'
  },

  boldText: {
    fontWeight: 'bold'
  }
});

export default TestProgress;
