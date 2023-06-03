import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable} from 'react-native';
const {width: WC} = Dimensions.get('screen');
const Book_Animation = ({ownerSrc}: any) => {
  const transX = useSharedValue(0);
  const flipX = useSharedValue(0);
  const [click, setClick] = useState(false);

  const transBookStyle_Front = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: -15},
        {rotateY: `${interpolate(flipX.value, [0, 1], [-30, 540])}deg`},
        {translateX: 15},
      ],
      width: `${interpolate(flipX.value, [0, 1], [100, 50])}%`,
      opacity: interpolate(flipX.value, [0, 1], [1, 0]),
    };
  });
  const transBookStyle_Back = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${interpolate(flipX.value, [0, 1], [0, 360])}deg`},
      ],
      width: `${interpolate(flipX.value, [0, 1], [100, 50])}%`,
      opacity: flipX.value,
    };
  });
  const transView = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(flipX.value, [0, 1], [0, WC / 2 - 120])},
      ],
      width: interpolate(flipX.value, [0, 1], [70, 200]),
      height: interpolate(flipX.value, [0, 1], [70, 150]),
    };
  });
  const backStyle = useAnimatedStyle(() => {
    return {
      opacity: flipX.value,
    };
  });
  const bookPress = () => {
    flipX.value = withTiming(flipX.value === 1 ? 0 : 1, {duration: 1000});
  };
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <AnimatedPressable
      onPress={bookPress}
      style={[
        {
          position: 'absolute',
          bottom: 10,
          left: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 5,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 12,
          },
          shadowOpacity: 0,
          shadowRadius: 16.0,

          elevation: 24,
        },
        transView,
      ]}>
      <Animated.View
        style={[
          {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backfaceVisibility: 'hidden',
            backgroundColor: 'white',
            zIndex: 999,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRightColor: 'gray',
            borderLeftColor: 'gray',
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 12,
            },
            shadowOpacity: 0,
            shadowRadius: 16.0,

            elevation: 24,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
          transBookStyle_Front,
        ]}>
        <Image
          source={{uri: ownerSrc}}
          style={{width: 35, height: 35, borderRadius: 100}}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            height: '100%',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            left: 10,
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: -1,
          },
          transBookStyle_Back,
        ]}>
        <Image
          source={{uri: ownerSrc}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 100,
          }}
        />
        <Text style={{fontSize: 18, color: 'black', fontWeight: '800'}}>
          Golden
        </Text>
        <Text style={{fontSize: 14, color: 'black'}}>Chủ nhà siêu cấp</Text>
      </Animated.View>
      <Animated.View
        style={[
          {backgroundColor: 'white', position: 'absolute', right: 5},
          backStyle,
        ]}>
        <View />
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
    </AnimatedPressable>
  );
};

export default Book_Animation;
