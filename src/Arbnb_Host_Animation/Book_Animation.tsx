import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'react-native';
import {Dimensions} from 'react-native';
const {width: WC, height: HC} = Dimensions.get('screen');
const Book_Animation = ({ownerSrc}: any) => {
  const transX = useSharedValue(0);
  const flipX = useSharedValue(0);
  const [click, setClick] = useState(false);
  const bookStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${interpolate(transX.value, [0, 1], [0, -180])}deg`},
      ],
    };
  });
  const transBookStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${interpolate(transX.value, [0, 1], [0, 540])}deg`},
        {scale: interpolate(transX.value, [0, 1], [1, 2])},
      ],
    };
  });
  const transView = useAnimatedStyle(() => {
    return {
      transform: [{translateX: interpolate(transX.value, [0, 1], [0, 100])}],
    };
  });
  const backStyle = useAnimatedStyle(() => {
    return {
      opacity: flipX.value,
      transform: [
        {rotateY: `${interpolate(transX.value, [0, 1], [0, 540])}deg`},
      ],
    };
  });
  const bookPress = () => {
    // console.log(click);
    transX.value = withTiming(click ? 0 : 1, {duration: 1000}, () => {
      flipX.value = withTiming(click ? 0 : 1, {duration: 1000});
    });

    setClick(!click);
  };
  return (
    <Pressable
      onPress={bookPress}
      style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
      }}>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          },
          transView,
        ]}>
        <Animated.View
          onLayout={e => console.log(e.nativeEvent.layout.x)}
          style={[
            {
              backgroundColor: 'white',
              height: 70,
              width: 70,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{translateX: 50}],
            },
            transBookStyle,
          ]}>
          <Image
            source={{uri: ownerSrc}}
            style={{width: 35, height: 35, borderRadius: 100}}
          />
        </Animated.View>
        <Animated.View style={[{position: 'absolute', right: -100}, backStyle]}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
            }}>
            22
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'gray',
            }}>
            Bài đánh giá
          </Text>
          <View
            style={{
              width: '100%',
              height: 0.5,
              marginVertical: 5,
              backgroundColor: 'gray',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
              }}>
              4.95
            </Text>
            <Ionicons name="md-star" size={18} color={'black'} />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: 'gray',
            }}>
            Xếp hạng
          </Text>
          <View
            style={{
              width: '100%',
              height: 0.5,
              marginVertical: 5,
              backgroundColor: 'gray',
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
            }}>
            10
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: 'gray',
            }}>
            Tháng kin
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default Book_Animation;
