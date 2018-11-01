import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      answer: 0,
      guess: 0,
      guesses: 0,
      output: '',
      highscore: 0
    });
  }

  componentDidMount() {
    this.rng();
    this.getHighScore();
  }

  rng = () => {
    this.setState(() => {
      return {answer: Math.floor(Math.random() * 100 + 1)}
    });
  }

  guess = () => {
    this.setState((prevState) => {
      return {guesses: prevState.guesses + 1}
    });

    if (parseInt(this.state.guess) == this.state.answer) {
      this.setState({ output: `You guessed the number in ${this.state.guesses +1} guesses!!` })
      this.newHighScore();
    }
    else if (parseInt(this.state.guess) < this.state.answer) {
      this.setState({ output: `Your guess ${this.state.guess} is too low` })
    }
    else if (parseInt(this.state.guess) > this.state.answer) {
      this.setState({ output: `Your guess ${this.state.guess} is too high` })
    }
    this.clear();
  }

  newHighScore = async () => {
    if (this.state.guesses < this.state.highscore || this.state.highscore == 0) {
      this.setState({highscore: this.state.guesses+1});
      const temp = this.state.highscore;
      try {
        await AsyncStorage.setItem('highscore', temp.toString());
      } catch (error) {
        Alert.alert(error.toString());
      } finally {
        this.setState({guesses: 0});
        this.rng();
      }
    }
  }

  getHighScore = async () => {
    try {
      let temp = await AsyncStorage.getItem('highscore');
      this.setState({highscore: parseInt(temp)})
    } catch (error) {
      Alert.alert('Error reading data');
    }
  }

  reset = async () => {
    try {
      const score = 0;
      await AsyncStorage.setItem('highscore', score.toString());
    } catch (error) {
      Alert.alert(error.toString());
    } finally {
      this.setState({guesses: 0, output: ''});
      this.rng();
      this.getHighScore();
    }
  }

  clear = () => {
    this.textInputRef.clear();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.containerItem, styles.text}>{this.state.output}</Text>
        <Text style={styles.containerItem, styles.text}>Guess a number between 1-100</Text>
        <TextInput ref={ref => this.textInputRef = ref} keyboardType={"phone-pad"}
          style={styles.containerItem, styles.guess}
          onChangeText={(guess) => this.setState({guess})} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: 150 }}>
          <Button style={styles.containerItem} title='MAKE GUESS' onPress={this.guess}></Button>
          <Button title='RESET' onPress={this.reset}></Button>
        </View>
        <Text style={styles.containerItem, styles.text}>Highscore: {this.state.highscore} guesses</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 250,
    marginTop: 250
  },
  containerItem: {
    height: 50
  },
  text: {
    fontSize: 20
  },
  guess: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 50,
    textAlign: 'center'
  }
});
