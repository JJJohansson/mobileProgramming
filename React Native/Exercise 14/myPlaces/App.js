import React from 'react';
import Places from './components/places';
import Map from './components/map';
import { createStackNavigator } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const MyApp = createStackNavigator(
  {
    Home: {screen: Places},
    Map: {screen: Map}
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName == 'Places') {
          return <Ionicons name='md-home' size={25} color={tintColor} />;
        } else if (routeName == 'Map') {
          return <MaterialIcons name='history' size={25} color={tintColor} />;
        }
      }
    })
  }
);

export default class App extends React.Component {
  render() {
    return <MyApp />
  }
}
