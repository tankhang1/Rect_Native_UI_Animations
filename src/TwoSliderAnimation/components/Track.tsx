import {View, Text} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
type TrackProps = {
  trackValue: SharedValue<number>;
  trackTrans: SharedValue<number>;
  thumbLeftValue: SharedValue<number>;
  thumbRightValue: SharedValue<number>;
  offset: SharedValue<number>;
};
const Track = ({
  trackValue,
  trackTrans,
  thumbLeftValue,
  thumbRightValue,
  offset,
}: TrackProps) => {
  const pan = Gesture.Pan()
    .onStart(e => {
      offset.value = trackTrans.value;
    })
    .onUpdate(e => {
      const tmpValue = offset.value + e.translationX;
      if (
        tmpValue >= -thumbLeftValue.value &&
        tmpValue <= 290 - trackValue.value - thumbLeftValue.value
      )
        trackTrans.value = tmpValue;
      else if (tmpValue < -thumbLeftValue.value)
        trackTrans.value = withTiming(0 - thumbLeftValue.value);
      else
        trackTrans.value = withTiming(
          290 - trackValue.value - thumbLeftValue.value,
        );
    });
  const trackAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: trackValue.value,
      transform: [{translateX: thumbLeftValue.value + trackTrans.value}],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {height: 32, width: 200, justifyContent: 'center'},
          trackAnimatedStyle,
        ]}>
        <View
          style={[
            {
              height: 4,
              borderRadius: 4,
              backgroundColor: '#3A7EFC',
            },
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Track;
