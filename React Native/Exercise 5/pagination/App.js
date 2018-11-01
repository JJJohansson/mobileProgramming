import React from 'react';
import Calculator from './components/Calculator';
import History from './components/History';
import { createStackNavigator } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const MyApp = createStackNavigator(
  {
    Home: {screen: Calculator},
    History: {screen: History}
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName == 'Home') {
          return <Ionicons name='md-home' size={25} color={tintColor} />;
        } else if (routeName == 'History') {
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
