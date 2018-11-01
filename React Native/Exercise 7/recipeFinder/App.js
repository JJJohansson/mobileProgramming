import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, FlatList, KeyboardAvoidingView, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipies: [],
      ingredient: ''
    };
  }

  getRecipies = () => {
    const url = `http://www.recipepuppy.com/api/?i=${this.state.ingredient}`;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({recipies: responseJson.results});
    })
    .catch((error) => {
      Alert.alert(error);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.list}>
          <FlatList
            data={this.state.recipies}
            keyExtractor={item => item.title}
            renderItem={({item}) => <View style={styles.listItem}>
              <Text>{item.title.trim()}</Text>
              <Image source={{uri:item.thumbnail}}
                style={{height: 50, width: 50, borderWidth: 1}}
                />
            </View>}>
          </FlatList>
        </View>
        <View style={styles.search}>
          <TextInput style={{fontSize: 18, height: 50}} value={this.state.ingredient}
            onChangeText={(ingredient) => this.setState({ingredient})} />
          <Button title="Find" onPress={this.getRecipies} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  list: {
    flex: 7,
    marginTop: 30,
    width: "100%"
  },
  listItem: {
    height: 75,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: "5%"
  },
  search: {
    flex: 1,
    justifyContent: "flex-end",
    width: "50%",
    margin: 20
  }
});
