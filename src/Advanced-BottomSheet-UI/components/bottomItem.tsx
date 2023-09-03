import {View, Text, Image, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useFrameCallback,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
type Props = {
  item: res;
  setResPicker: React.Dispatch<React.SetStateAction<res>>;
  transY: SharedValue<number>;
};
const BottomItem = ({item, setResPicker, transY}: Props) => {
  const [isShowText, setIsShowText] = useState(false);
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(transY.value, [0, -height + 200], [80, width * 0.9]),
      height: interpolate(transY.value, [0, -height + 200], [80, 120]),
    };
  });
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: interpolate(transY.value, [0, -height + 200], [1, 1.5])},
      ],
    };
  });
  useFrameCallback(() => {
    'worklet';
    if (transY.value < -height + 300 && isShowText === false) {
      runOnJS(setIsShowText)(true);
    }

    if (transY.value > -height + 300 && isShowText === true) {
      runOnJS(setIsShowText)(false);
    }
  });
  return (
    <Pressable onPress={() => setResPicker(item)}>
      <Animated.View
        style={[
          {
            alignSelf: 'center',
            borderColor: '#BABABA',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          containerAnimatedStyle,
          isShowText && {
            borderWidth: 1,
            marginVertical: 5,
            paddingVertical: 10,
          },
        ]}>
        <Animated.Image
          source={{uri: item.img}}
          style={[
            {
              width: 60,
              height: 60,
              marginHorizontal: 10,
              borderRadius: 10,
            },

            imageAnimatedStyle,
          ]}
        />
        {isShowText && (
          <View style={{width: '60%'}}>
            <Text style={{fontSize: 16, color: 'black'}}>{item.name}</Text>
            <Text>{item.author}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default BottomItem;
