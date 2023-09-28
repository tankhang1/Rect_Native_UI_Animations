import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {RES} from '../../../res/listRes';
import Animated, {
  FadeInLeft,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
type Props = {
  img: string;
  header: string;
  content: string;
  transX: SharedValue<number>;
  index: number;
  onPress: (img: string, header: string, content: string) => void;
};
const PictureItem = ({img, header, content, transX, index, onPress}: Props) => {
  const ImageAnimatedStyle = useAnimatedStyle(() => {
    const tmp = transX.value / 200;
    return {
      transform: [
        {
          rotateY: `${interpolate(
            tmp,
            [index - 1, index, index + 1],
            [50, 0, -50],
          )}deg`,
        },
        {
          scale: interpolate(tmp, [index - 1, index, index + 1], [0.8, 1, 0.8]),
        },
      ],
    };
  });

  return (
    <Pressable onPress={() => onPress(img, header, content)}>
      <Animated.Image
        sharedTransitionTag="sharedTag"
        source={{uri: img}}
        style={[{width: 200, height: 250}, ImageAnimatedStyle]}
      />
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          lineHeight: 30,
          fontWeight: '600',
        }}>
        {header}
      </Text>
    </Pressable>
  );
};

export default PictureItem;
