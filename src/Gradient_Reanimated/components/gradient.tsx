import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {listGradient} from '../res/listGradient';
import GradientBox from '../../Gradient_Picker_Reanimated/components/GradientBox';
import Gradient_Box from './gradient_box';
import {
  runOnJS,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const GRADIENT_BOX_HEIGHT = 60;
const Gradient = () => {
  const [colorPicker, setColorPicker] = React.useState(0);

  const openPicker = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .shouldCancelWhenOutside(false)
    .onBegin(e => {
      console.log('start');
      openPicker.value = withTiming(1);
      offsetY.value = colorPicker * GRADIENT_BOX_HEIGHT;
      console.log('start', offsetY.value);
    })
    .onChange(e => {
      translateY.value = Math.max(
        0,
        Math.min(
          GRADIENT_BOX_HEIGHT * listGradient.length - 6,
          offsetY.value + e.translationY,
        ),
      );
    })
    .onFinalize(() => {
      openPicker.value = withTiming(0);
    });

  useFrameCallback(() => {
    'worklet';
    const currentPicker = Math.floor(translateY.value / GRADIENT_BOX_HEIGHT);
    if (currentPicker !== colorPicker) {
      runOnJS(setColorPicker)(currentPicker);
    }
  });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={listGradient[colorPicker].image}
        style={StyleSheet.absoluteFillObject}
        resizeMode="stretch"
      />

      <GestureDetector gesture={pan}>
        <View
          style={{
            width: '100%',
            height: GRADIENT_BOX_HEIGHT,
            zIndex: 10000,
          }}
        />
      </GestureDetector>

      {listGradient.map((gradient, index) => {
        return (
          <Gradient_Box
            key={index}
            index={index}
            gradient={listGradient[index]}
            openPicker={openPicker}
            translateY={translateY}
          />
        );
      })}
    </GestureHandlerRootView>
  );
};

export default Gradient;
