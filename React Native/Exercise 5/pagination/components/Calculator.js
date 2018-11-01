import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';

class Calculator extends React.Component {
  static navigationOptions = {title: 'Home',};

  constructor() {
    super();
    this.state = {
      topValue: '',
      bottomValue: '',
      result: 0,
      history: []
    };
  }

  sum = () => {
    this.setState({ result: parseInt(this.state.topValue) + parseInt(this.state.bottomValue),
                    history: [...this.state.history, {key:`${this.state.topValue} + ${this.state.bottomValue} = ${parseInt(this.state.topValue)+parseInt(this.state.bottomValue)}`}]})
  }

  subtract = () => {
    this.setState({ result: parseInt(this.state.topValue) - parseInt(this.state.bottomValue),
                    history: [...this.state.history, {key:`${this.state.topValue} - ${this.state.bottomValue} = ${parseInt(this.state.topValue)-parseInt(this.state.bottomValue)}`}]})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{width: 200}}>
          <Text style={{textAlign: 'center'}}>Result: {this.state.result}</Text>
          <TextInput style={styles.input} keyboardType='numeric' onChangeText={(topValue) => this.setState({topValue})} value={this.state.topValue}></TextInput>
          <TextInput style={styles.input} keyboardType='numeric' onChangeText={(bottomValue) => this.setState({bottomValue})} value={this.state.bottomValue}></TextInput>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
            <Button onPress={this.sum} title='+'></Button>
            <Button onPress={this.subtract} title='-'></Button>
            <Button onPress={() => navigate('History', {history: this.state.history})} title='History' />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 100
  },
  input: {
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1
  }
});


export default Calculator;
