import {View, Text} from 'react-native';
import React, {useState} from 'react';
import BottomSheet from './components/bottom_sheet';
import {LIST_RES} from './res/listRes';
import BackGround from './components/backGround';

const index = () => {
  const [resPicker, setResPicker] = useState(LIST_RES[0]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <BackGround item={resPicker}></BackGround>
      </View>
      <BottomSheet setResPicker={setResPicker} />
    </View>
  );
};

export default index;
