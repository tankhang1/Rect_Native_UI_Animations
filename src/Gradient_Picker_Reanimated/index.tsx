import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {gradients} from './assets/res/listGradient';
import GradientBox from './components/GradientBox';
import {
  Easing,
  runOnJS,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import GradientLabel from './components/GradientLabel';
import Background from './components/Background';
export const GRADIENT_BOX_HEIGHT = 66;
const Gradient_Picker_Reanimated = () => {
  const [gradientIdx, setGradientIdx] = useState(0);

  const pickerOpen = useSharedValue(0);
  const currentOffset = useSharedValue(0);
  const initialOffset = useSharedValue(0);
  const gesture = Gesture.Pan()
    .shouldCancelWhenOutside(false)
    .onBegin(() => {
      pickerOpen.value = withTiming(1);
      initialOffset.value = gradientIdx * GRADIENT_BOX_HEIGHT;
    })
    .onChange(e => {
      currentOffset.value = Math.max(
        0,
        Math.min(
          initialOffset.value + e.translationY,
          GRADIENT_BOX_HEIGHT * (gradients.length - 1),
        ),
      );
    })
    .onFinalize(e => {
      pickerOpen.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    });

  useFrameCallback(() => {
    'worklet';
    const computedIndex = Math.round(currentOffset.value / GRADIENT_BOX_HEIGHT);
    if (computedIndex !== gradientIdx) {
      runOnJS(setGradientIdx)(computedIndex);
    }
  });
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Background gradientIdx={gradientIdx} />
      <GestureHandlerRootView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <GestureDetector gesture={gesture}>
          <View
            style={{
              height: GRADIENT_BOX_HEIGHT,
              width: '100%',
              zIndex: 10000,
            }}
          />
        </GestureDetector>

        {gradients.map((gradient, index) => {
          return (
            <GradientBox
              key={gradient.name}
              pickerOpen={pickerOpen}
              currentOffset={currentOffset}
              index={index}>
              <GradientLabel gradient={gradient} />
            </GradientBox>
          );
        })}
      </GestureHandlerRootView>
    </View>
  );
};

export default Gradient_Picker_Reanimated;
