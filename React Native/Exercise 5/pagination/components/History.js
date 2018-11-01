import React from 'react';
import { Text, StyleSheet, View, Button, FlatList } from 'react-native';

class History extends React.Component {
  static navigationOptions = {title: 'History',};

  render() {
    const { params } = this.props.navigation.state;
    var history = params.history;
    return (
      <View style={styles.container}>
      <Text>History</Text>
      <FlatList data={history} renderItem={({item}) => <Text>{item.key}</Text>}>
      </FlatList>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default History;
