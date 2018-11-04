import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
const key = 'AIzaSyB5LPlTnHClwSE8rXgznk6nuGxxBnAfu1M';

export default class Map extends React.Component {
  static navigationOptions = {title: 'Map',};

  constructor(props) {
    super(props);
    this.state = {
      place: '',
      address: '',
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.004757,
      longitudeDelta: 0.006866,
      params: ''
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    const { params } = this.props.navigation.state;
    this.setState({
      place: params.place.place,
      address: params.place.address,
      latitude: params.place.latitude,
      longitude: params.place.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>{this.state.params.address}</Text>
        <Text>{this.state.params.latitude}</Text>
        <Text>{this.state.params.longitude}</Text>
        <MapView
          style={styles.map}
          onRegionChangeComplete={() => this.marker.showCallout()}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title = {this.state.place}
            description = {this.state.address}
            ref = {marker => (this.marker = marker)} />
        </MapView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  search: {
    flex: 0.2,
    padding: 5
  }
});
