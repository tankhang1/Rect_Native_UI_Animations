import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import PictureItem from './components/pictureItem';
import {LIST_RES, RES} from '../../res/listRes';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  const translationX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
    console.log('transY', translationX.value);
  });
  const onPressItem = (img: string, header: string, content: string) => {
    navigation.navigate('Detail', {img, header, content});
  };
  const Item = ({item, index}: {item: RES; index: number}) => {
    return (
      <PictureItem
        img={item.img}
        header={item.header}
        content={item.content}
        key={index}
        transX={translationX}
        index={index}
        onPress={onPressItem}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 300,
        }}>
        <Animated.FlatList
          renderItem={Item}
          horizontal
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          snapToInterval={200}
          ListHeaderComponent={() => <View style={{width: 100, height: 250}} />}
          getItemLayout={(data: any, index: number) => ({
            length: 200,
            offset: 200 * index,
            index,
          })}
          ListFooterComponent={() => <View style={{width: 100, height: 250}} />}
          data={LIST_RES}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
