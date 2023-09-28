import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  SlideInDown,
  SlideInLeft,
  SlideOutDown,
} from 'react-native-reanimated';

const DetailScreen = ({route}) => {
  const {img, header, content} = route.params;
  console.log(route.params);
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight,
      }}>
      <Animated.Image
        sharedTransitionTag="sharedTag"
        entering={FadeInDown.duration(500)}
        source={{uri: img}}
        style={{width: '100%', height: 300}}
      />
      <Animated.Text
        entering={FadeInLeft.delay(300)}
        style={{
          color: 'black',
          fontSize: 24,
          fontWeight: '600',
          textAlign: 'center',
          marginVertical: 15,
        }}>
        {header}
      </Animated.Text>
      <Animated.Text
        entering={FadeInRight.delay(400)}
        style={{
          color: 'black',
          fontSize: 16,
        }}>
        {content}
      </Animated.Text>
    </View>
  );
};

export default DetailScreen;
