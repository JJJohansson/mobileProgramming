import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      shopItem: '',
      shoppingList: []
    };
  }

  add = () => {
    this.setState({ shoppingList: [...this.state.shoppingList, {key: this.state.shopItem}],
                    shopItem: ''})
  }

  clear = () => {
    this.setState({shoppingList: []})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <TextInput
            style={{textAlign: 'center', width: 200, borderColor: 'black', borderWidth: 1}}
            onChangeText={(shopItem) => this.setState({shopItem})}
            value={this.state.shopItem}>
          </TextInput>
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.add} title='ADD'></Button>
          <Button onPress={this.clear} title='CLEAR'></Button>
        </View>
        <View style={styles.shoppingList}>
          <Text style={{color: 'blue'}}>Shopping List</Text>
          <FlatList data={this.state.shoppingList}
            renderItem={({item}) => <Text>{item.key}</Text>}>
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    top: 150,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  text: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoppingList: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
