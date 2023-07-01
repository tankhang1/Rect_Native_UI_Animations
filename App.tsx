import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Navigation from './src/Navigation/Navigation';
import Event_Creation from './src/Event_Creation/Event_Creation';
import TableComponent from './src/Table_Component/TableComponent';
import Draggable_Flatlist from './src/Draggable_FlatList/Draggable_Flatlist';
import Blur_Animation from './src/Blur_Animation/Blur_Animation';

const App = () => {
  const data = {
    tableHead: [
      'Head',
      'Head 2',
      'Head 3',
      'Head 4',
      'Header 5',
      'Header 6',
      'Header 7',
    ],
    tableData: [
      ['1', '2', '3', 'a4', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', '1231231312312', 'd', 'Header 5', 'Header 6', 'Header 7'],
      ['1', '2', '3', 'asdaasdadasdasdds', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],
      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],

      ['a', 'b', 'c', 'd', 'Header 5', 'Header 6', 'Header 7'],
    ],
  };
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

      <Draggable_Flatlist />
    </View>
  );
};

export default App;
