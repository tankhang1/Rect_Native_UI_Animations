import {View, Text} from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type ThumbProps = {
  isLeft?: boolean;
  marginRight?: number;
  thumbValue: SharedValue<number>;
  trackTrans: SharedValue<number>;
  thumbOtherValue: SharedValue<number>;
};
const Thumb = ({
  isLeft = true,
  thumbValue,
  thumbOtherValue,
  trackTrans,
}: ThumbProps) => {
  const offset = useSharedValue(0);
  const pan = Gesture.Pan()
    .onBegin(e => {
      offset.value = thumbValue.value;
    })
    .onUpdate(e => {
      const tmpValue = offset.value + e.translationX;
      if (isLeft) {
        if (tmpValue > 0 - trackTrans.value) {
          if (tmpValue <= thumbOtherValue.value) thumbValue.value = tmpValue;
        } else thumbValue.value = -trackTrans.value;
      } else {
        if (tmpValue < 290 - trackTrans.value) {
          if (tmpValue >= thumbOtherValue.value) thumbValue.value = tmpValue;
        } else thumbValue.value = 290 - trackTrans.value;
      }
    });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: thumbValue.value + trackTrans.value}],
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            backgroundColor: '#CEDFFE',
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            zIndex: 999,
            position: 'absolute',
          },
          thumbAnimatedStyle,
        ]}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: 'white',
            borderRadius: 100,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Thumb;
