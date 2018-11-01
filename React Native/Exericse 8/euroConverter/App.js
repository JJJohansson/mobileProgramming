import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Button, TextInput, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeRates: [],
      currency: '',
      amount: '',
      result: 0
    };
  }

  componentWillMount() {
    const key = '0998077a77abeac64bb6d7c6d1b038ed';
    fetch(`http://www.apilayer.net/api/live?access_key=${key}&format=1`)
    .then((response) => response.json())
    .then((responseJson) => this.setState({exchangeRates:responseJson.quotes}))
    .catch((error) => {
      Alert.alert(error);
    });
  }

  convert = () => {
    let currency = this.state.exchangeRates[this.state.currency];
    let amount = this.state.amount;
    let result = amount * currency;
    this.setState({
      result: result.toFixed(2)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 30 }} >{`${this.state.result} $`}</Text>
        <View style={{flexDirection: 'row', height:50}}>
          <TextInput keyboardType="numeric" onChangeText={(amount) => this.setState({amount})} value={this.state.amount} style={{width: 70}}></TextInput>
          <Picker
            selectedValue={this.state.currency}
            style={{ height: 50, width: 120 }}
            onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
            {Object.keys(this.state.exchangeRates).map((item, index) => {
              return (<Picker.Item label={item.slice(3, 6)} value={item} key={index} />)
            })}
          </Picker>
        </View>
        <Button title="CONVERT" onPress={this.convert}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
