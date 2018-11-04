import React, { Component } from 'react';
import { KeyboardAvoidingView, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text,
  Icon, Body, Title, List, ListItem, Left, Right, Subtitle, H1 } from 'native-base';
import { SQLite } from 'expo';

const key = 'AIzaSyB5LPlTnHClwSE8rXgznk6nuGxxBnAfu1M';
const db = SQLite.openDatabase('placeList.db');

export default class Places extends Component {
  static navigationOptions = {title: 'My Places',};

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      places: [],
      place: '',
      address: '',
      latitude: null,
      longitude: null
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, place text, address text, latitude real, longitude real);');
    });
    this.updateList();
  }

  getAddress = () => {
    if (this.state.address.length < 1) { Alert.alert("Please type an address!"); return false }
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == 'OK') {
        this.setState({
          address: responseJson.results[0].formatted_address,
          latitude: responseJson.results[0].geometry.location.lat,
          longitude: responseJson.results[0].geometry.location.lng,
        })
      }
      else
      Alert.alert('Invalid address!');
    }
  )
  .then(this.addPlace)
  .catch((error) => {
    Alert.alert(error);
  });
}

  addPlace = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO places (place, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [this.state.place, this.state.address, this.state.latitude, this.state.longitude]);
    }, null, this.updateList);
  };

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM places', [], (_, {rows}) =>
        this.setState({places: rows._array})
      );
    });
    this.setState({address: '', place: ''})
  };

  onLongPressButton = (place) => {
    Alert.alert(
      `Delete address`,
      `Delete address ${place.address}?`,
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () =>  this.deleteItem(place) }
      ],
      { cancelable: false }
    );
  }

  deleteItem = (place) => {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM places WHERE id = ?;`, [place.id]);
      }, null, this.updateList
    )
  };

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Content>
          <Form style={{marginTop: 5}}>
            <Item stackedLabel>
              <Label>Type in address</Label>
              <Input value={this.state.address}
                  onChangeText={(address) => this.setState({address})} />
            </Item>
            <Item stackedLabel>
              <Label>Name your place</Label>
              <Input value={this.state.place}
                  onChangeText={(place) => this.setState({place})} />
            </Item>
            <Button block onPress={this.getAddress}>
              <Icon name="star"></Icon>
              <Text>SAVE</Text>
            </Button>
          </Form>
          <Text>{this.state.address} {this.state.place}</Text>
          <List dataArray={this.state.places}
            style={{ marginTop: 25 }}
            renderRow={(place) =>
              <ListItem>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5 }} onPress={() => navigate('Map', {place: place})} onLongPress={() => this.onLongPressButton(place)} underlayColor="white">
                  <Body>
                    <Text>{place.place}</Text>
                    <Text note >{place.address}</Text>
                  </Body>
                  <Right>
                    <Text note >show on map.</Text>
                  </Right>
                </TouchableOpacity>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
