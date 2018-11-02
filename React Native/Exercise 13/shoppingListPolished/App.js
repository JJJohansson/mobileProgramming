import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button, Header, FormLabel, FormInput, ListItem, List } from 'react-native-elements';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('shoppinglist.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {product: '', amount: '', list: []}
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppingList (id integer primary key not null, products text, amounts text);');
    });
    this.updateList();
  }

  add = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO shoppingList (products, amounts) VALUES (?, ?)',
      [this.state.product, this.state.amount]);
    }, null, this.updateList)
    this.setState({product: '', amount: ''});
  };

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM shoppingList', [], (_, {rows}) =>
        this.setState({list: rows._array})
      );
    });
  };

  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM shoppingList WHERE id = ?;`, [id]);
      }, null, this.updateList
    )
  };

  render() {
    const listItems = this.state.list.map((item) => (
      <ListItem
        key={item.id}
        title={item.products}
        subtitle={item.amounts}
        rightTitle={'Bought'}
        onPress={() => this.deleteItem(item.id)}
        switchThumbTintColor={"green"}
        switchOnTintColor={"black"}
        switchTintColor={"white"}
        />
    ))

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Header
          style={{height: 25}}
          centerComponent={{ text: 'SHOPPING LIST', style: {color: '#fff'} }}
          />
        <View style={styles.container}>
          <FormLabel>PRODUCT</FormLabel>
          <FormInput
            style={styles.textInput}
            placeholder='Product'
            onChangeText={(product) => this.setState({product})}
            value={this.state.product} />
          <FormLabel>AMOUNT</FormLabel>
          <FormInput
            style={styles.textInput}
            placeholder='Amount'
            onChangeText={(amount) => this.setState({amount})}
            value={this.state.amount} />
          <Button style={{marginTop: 50}} title="SAVE" onPress={this.add}/>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <List>
              {listItems}
            </List>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      color: 'white',
  },
});
