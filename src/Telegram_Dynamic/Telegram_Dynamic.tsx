import {View, Text, StatusBar, ScrollView, Dimensions} from 'react-native';
import React, {useMemo} from 'react';
import {
  Canvas,
  ColorMatrix,
  Group,
  Image,
  RoundedRect,
  rect,
  rrect,
  useImage,
  Paint,
  Blur,
  Path,
} from '@shopify/react-native-skia';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
const Telegram_Dynamic = () => {
  const image = useImage(
    'https://expertphotography.b-cdn.net/wp-content/uploads/2022/05/Landscape-Photography-Sophie-Turner.jpg',
  );

  const scrollY = useSharedValue(0);
  const widthImage = useSharedValue(150);
  const transImage = useSharedValue(0);
  const blurImage = useSharedValue(0);
  const heightView = useSharedValue(220);
  const transYView = useSharedValue(0);
  const Rrect = useDerivedValue(() =>
    rrect(
      rect(
        (width - widthImage.value - 20) / 2,
        transImage.value,
        widthImage.value,
        widthImage.value,
      ),
      100,
      100,
    ),
  );
  useDerivedValue(() => {
    widthImage.value = interpolate(scrollY.value, [0, 300], [150, 0]);
    transImage.value = interpolate(scrollY.value, [0, 300], [38, -200]);
    blurImage.value = interpolate(scrollY.value, [0, 300], [0, 60]);
    heightView.value = interpolate(scrollY.value, [0, 300], [220, 0]);
    transYView.value = interpolate(scrollY.value, [0, 300], [0, 300]);
  });
  const HeightAnimated = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transYView.value}],
      height: heightView.value,
    };
  });
  const layer = useMemo(
    () => (
      <Paint>
        <Blur blur={blurImage} />
        <ColorMatrix
          matrix={[
            1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 120, -60,
          ]}
        />
      </Paint>
    ),
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#d2d6e4',
        paddingHorizontal: 10,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
          },
        ]}
        onScroll={e => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}>
        <Animated.View style={HeightAnimated}>
          <Canvas style={[{height: 220}]}>
            <Group layer={layer}>
              <Group clip={Rrect}>
                <Image
                  image={image}
                  width={200}
                  height={200}
                  x={(width - 220) / 2}
                  y={0}
                />
              </Group>
              <Path
                path={`M ${
                  (width - 80) / 2
                } 0 c 20 0 20 20 20 20 q 10 20 20 0 c 0 0 0 -20 20 -20 z`}
                color={'black'}
              />
              {/* <RoundedRect
                clip={}
                x={(width - 120) / 2}
                y={0}
                height={20}
                width={100}
                r={50}
              /> */}
            </Group>
          </Canvas>
        </Animated.View>
        {[...new Array(20)].map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                height: index % 2 ? 30 : 100,
                marginVertical: 5,
                borderRadius: 15,
                backgroundColor: index % 2 ? '#999dcb' : '#6d7db6',
              }}></View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Telegram_Dynamic;
