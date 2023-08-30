import {View, Text, Image} from 'react-native';
import React from 'react';
import {User} from '../interface/user';
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Share} from 'react-native';
type Props = {
  item: User;
  scrollX: SharedValue<number>;
  index: number;
  setIsScroll: React.Dispatch<React.SetStateAction<boolean>>;
  arrowDownValue: SharedValue<number>;
  isPanY: SharedValue<number>;
  setIsFlip: React.Dispatch<React.SetStateAction<boolean>>;
};
const CarouselItem = ({
  item,
  scrollX,
  index,
  setIsScroll,
  arrowDownValue,
  isPanY,
  setIsFlip,
}: Props) => {
  const panY = useSharedValue(0);
  const offetY = useSharedValue(0);
  const styleItem = useAnimatedStyle(() => {
    const x = scrollX.value / 100;

    return {
      transform: [
        {
          scale: interpolate(x, [index - 1, index, index + 1], [0.75, 1, 0.75]),
        },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onStart(e => {
      'worklet';
      offetY.value = panY.value;
      arrowDownValue.value = withTiming(0);
      isPanY.value = panY.value;
      runOnJS(setIsScroll)(false);
    })
    .onChange(e => {
      'worklet';
      panY.value = offetY.value + e.translationY;
      if (panY.value > isPanY.value) {
        isPanY.value = panY.value;
      } else {
        if (isPanY.value - panY.value > 20) {
          runOnJS(setIsFlip)(true);
        }
      }
    })
    .onEnd(e => {
      panY.value = withTiming(0, {easing: Easing.sin});
      arrowDownValue.value = withTiming(1);
    })
    .onFinalize(e => {
      'worklet';
      runOnJS(setIsScroll)(true);
      runOnJS(setIsFlip)(false);
    });
  const panAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(panY.value, [0, 300], [0, 300]),
        },
      ],
    };
  });
  const spaceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleX: interpolate(panY.value, [0, 300], [1, 300])}],
    };
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styleItem, panAnimatedStyle, {width: 100, zIndex: 999}]}>
          <Image
            source={{uri: item.img}}
            style={{width: 100, height: 100, borderRadius: 100}}
            resizeMode="cover"
          />
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              textAlign: 'center',
              marginVertical: 10,
            }}>
            {item.name}
          </Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default CarouselItem;
