import {View, Text, ImageBackground, Image, Dimensions} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('screen');
type Props = {
  item: res;
};
const BackGround = ({item}: Props) => {
  return (
    <View>
      <Image
        style={{position: 'absolute', width, height}}
        source={{uri: item.img}}
        resizeMode="cover"
        blurRadius={5}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height,
          width,
        }}>
        <Image
          source={{uri: item.img}}
          style={{
            backgroundColor: 'red',
            width: 200,
            height: 200,
            alignSelf: 'center',
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            width: '60%',
            paddingVertical: 10,
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: 10,
            backgroundColor: 'white',
            elevation: 10,
            textAlign: 'center',
            fontSize: 18,
            color: 'black',
            fontWeight: '600',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            width: '60%',
            paddingVertical: 10,
            borderRadius: 10,
            alignSelf: 'center',
            backgroundColor: 'white',
            elevation: 10,
            textAlign: 'center',
            fontSize: 18,
            color: 'black',
            fontWeight: '600',
          }}>
          {item.author}
        </Text>
      </View>
    </View>
  );
};

export default BackGround;
