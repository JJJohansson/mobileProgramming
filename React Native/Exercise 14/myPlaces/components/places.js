import React, { Component } from 'react';
import { KeyboardAvoidingView, StatusBar, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, Body, Title, List, ListItem, Left, Right, Subtitle, H1 } from 'native-base';
const key = 'AIzaSyB5LPlTnHClwSE8rXgznk6nuGxxBnAfu1M';

export default class Places extends Component {
  static navigationOptions = {title: 'Places',};

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      places: [],
      address: '',
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null,
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  getAddress = () => {
    if (this.state.address.length < 1) { Alert.alert("Please type an address!"); return false }

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        places: [...this.state.places, {
          address: responseJson.results[0].formatted_address,
          latitude: responseJson.results[0].geometry.location.lat,
          longitude: responseJson.results[0].geometry.location.lng,
          latitudeDelta: 0.004757,
          longitudeDelta: 0.006866,
          markerTitle: responseJson.results[0].formatted_address }
        ]
      })
    })
    //.then(this.getRestaurants)
    .catch((error) => {
      Alert.alert(error);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Type in address</Label>
              <Input value={this.state.address}
                  onChangeText={(address) => this.setState({address})} />
            </Item>
            <Button full onPress={this.getAddress}>
              <Icon name="star"></Icon>
              <Text>SAVE</Text>
            </Button>
          </Form>
          <Text>Current search word: {this.state.address}</Text>
          <List dataArray={this.state.places}
            renderRow={(place) =>
              <ListItem  onPress={() => navigate('Map', {address: place})}>
                <Left>
                  <Text>{place.address}</Text>
                </Left>
                <Right>
                  <Subtitle>show on map</Subtitle>
                  <Icon name="arrow-forward"></Icon>
                </Right>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
