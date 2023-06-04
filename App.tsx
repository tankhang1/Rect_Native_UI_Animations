import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Navigation from './src/Navigation/Navigation';
import Event_Creation from './src/Event_Creation/Event_Creation';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      {/* <Navigation /> */}
      <Event_Creation />
    </View>
  );
};

export default App;
