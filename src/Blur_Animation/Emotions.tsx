import {View, Text, Image} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import {message} from './Blur_Animation';
const EMOTIONS = [
  require('./Assets/heart.png'),
  require('./Assets/like.png'),
  require('./Assets/smiley.png'),
  require('./Assets/crying.png'),
  require('./Assets/angry.png'),
];
type Props = {
  emotionIndex: number;
  setData: Function;
  data: message[];
  setOpenEmotion: Function;
};
const Emotions = ({emotionIndex, setData, data, setOpenEmotion}: Props) => {
  const onEmotion = (index: number) => {
    console.log(index);
    let tmp = data;
    tmp[emotionIndex].emotion = index;
    setData(tmp);
    setOpenEmotion(false);
  };
  return (
    <View
      style={{
        width: 250,
        height: 50,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'hsl(0,0%,95%)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
      }}>
      {EMOTIONS.map((emotion, index) => {
        return (
          <Pressable onPress={() => onEmotion(index)} key={index}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
              source={emotion}></Image>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Emotions;
