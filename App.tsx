import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Navigation from './src/Arbnb_Host_Animation/Navigation/Navigation';

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
      <Navigation />
    </View>
  );
};

export default App;
