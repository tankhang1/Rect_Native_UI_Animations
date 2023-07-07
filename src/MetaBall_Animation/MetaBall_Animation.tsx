import {View, Text, Dimensions} from 'react-native';
import React, {useMemo} from 'react';
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  useValue,
} from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
const RADIUS = 80;
const MetaBall_Animation = () => {
  const cx = useSharedValue(width / 2);
  const cy = useSharedValue(height / 2);
  const tmpX = useSharedValue(0);
  const tmpY = useSharedValue(0);
  const Pan = Gesture.Pan()
    .onStart(e => {
      tmpX.value = cx.value;
      tmpY.value = cy.value;
    })
    .onChange(e => {
      cx.value = tmpX.value + e.translationX;
      cy.value = tmpY.value + e.translationY;
    })
    .onEnd(e => {
      cx.value = withSpring(width / 2);
      cy.value = withSpring(height / 2);
    });
  const layer = useMemo(
    () => (
      <Paint>
        {/*Pixel Opacity > BlurredOpacity*60-30 */}
        <Blur blur={10} />
        <ColorMatrix
          matrix={[
            // R G B Anpha Offset
            1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 60, -30,
          ]}
        />
      </Paint>
    ),
    [],
  );
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <GestureDetector gesture={Pan}>
        <Canvas
          style={{
            flex: 1,
            backgroundColor: '#111',
          }}>
          <Group layer={layer}>
            <Circle cx={cx} cy={cy} r={RADIUS} color={'blue'} />
            <Circle cx={width / 2} cy={height / 2} r={RADIUS} color={'blue'} />
          </Group>
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default MetaBall_Animation;
