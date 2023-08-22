import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {GRADIENT_BOX_HEIGHT} from '..';
import {BlurView} from '@react-native-community/blur';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ViewStyle} from 'react-native';

const GradientBox = ({
  children,
  pickerOpen,
  currentOffset,
  index,
}: {
  children: React.ReactNode;
  pickerOpen: SharedValue<number>;
  currentOffset: SharedValue<number>;
  style?: ViewStyle;
  index: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(
      currentOffset.value - index * GRADIENT_BOX_HEIGHT,
    );
    const isSelected = distance < GRADIENT_BOX_HEIGHT / 2;
    const highlight = interpolateColor(
      currentOffset.value - index * GRADIENT_BOX_HEIGHT,
      [-GRADIENT_BOX_HEIGHT, 0, GRADIENT_BOX_HEIGHT],
      ['#ffffff00', '#ffffffaa', '#ffffff00'],
    );
    const falloffOpacity = 1 - distance / 500;
    return {
      //   backgroundColor: interpolateColor(
      //     pickerOpen.value,
      //     [0, 1, 1.7, 2],
      //     ['#ffffff00', highlight, highlight, '#fffff00'],
      //   ),
      zIndex: pickerOpen.value < 1 ? -Math.round(distance * 10) : 0,
      transform: [
        {
          translateY: interpolate(
            pickerOpen.value,
            [0, 1],
            [0, currentOffset.value - index * GRADIENT_BOX_HEIGHT],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            pickerOpen.value,
            [0, 1],
            [1, 1.3 / Math.log10(distance / 2 + 25)],
            Extrapolate.EXTEND,
          ),
        },
      ],
      opacity: isSelected
        ? 1
        : interpolate(
            pickerOpen.value,
            [0, 1],
            [0, falloffOpacity],
            Extrapolate.CLAMP,
          ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: GRADIENT_BOX_HEIGHT,

          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        },
        animatedStyle,
      ]}>
      <BlurView
        blurType="light"
        overlayColor="transparent"
        blurAmount={50}
        style={[
          {
            padding: 10,
            height: '100%',
            width: '85%',
            borderColor: '#e5e7eb55',
            borderWidth: 10,
            overflow: 'hidden',
            position: 'absolute',

            borderRadius: 100,
          },
        ]}
      />
      {children}
    </Animated.View>
  );
};

export default GradientBox;
