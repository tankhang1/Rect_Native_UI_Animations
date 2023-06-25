import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Emotions from './Emotions';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const EMOTIONS = [
  require('./Assets/heart.png'),
  require('./Assets/like.png'),
  require('./Assets/smiley.png'),
  require('./Assets/crying.png'),
  require('./Assets/angry.png'),
];
export const DATA = [
  {
    name: 'Alex',
    nameImg:
      'https://i.pinimg.com/564x/0e/ff/e8/0effe817959671e3f63c784354a789f8.jpg',
    image: [],
    message: 'Hello, how are you today?',
    time: new Date('2003-06-21'),
    emotion: null,
  },

  {
    name: 'Alex',
    nameImg:
      'https://i.pinimg.com/564x/0e/ff/e8/0effe817959671e3f63c784354a789f8.jpg',
    image: [
      'https://i.pinimg.com/564x/b2/66/9c/b2669c401526413cec436236c7b7707e.jpg',
    ],
    message: 'What are you doing now?',
    time: new Date('2003-06-23'),
    emotion: null,
  },
  {
    name: 'Sim',
    nameImg:
      'https://i.pinimg.com/564x/81/9e/55/819e55eb2ac8634fd418a3f5c104f98e.jpg',
    image: [
      'https://i.pinimg.com/564x/60/94/4f/60944ffcd811fd9e6b9a039557e5ccf8.jpg',
      'https://i.pinimg.com/564x/b2/66/9c/b2669c401526413cec436236c7b7707e.jpg',
      'https://i.pinimg.com/564x/b2/66/9c/b2669c401526413cec436236c7b7707e.jpg',
    ],
    message: "I'm good",
    time: new Date('2003-06-22'),
    emotion: null,
  },
  {
    name: 'Sim',
    nameImg:
      'https://i.pinimg.com/564x/81/9e/55/819e55eb2ac8634fd418a3f5c104f98e.jpg',
    image: [
      'https://i.pinimg.com/564x/b2/66/9c/b2669c401526413cec436236c7b7707e.jpg',
    ],
    message: "I'm just go home, so I'm take a rest",
    time: new Date('2003-06-26'),
    emotion: null,
  },
  {
    name: 'Alex',
    nameImg:
      'https://i.pinimg.com/564x/0e/ff/e8/0effe817959671e3f63c784354a789f8.jpg',
    image: [],
    message: 'Hello, how are you today?',
    time: new Date('2003-06-27'),
    emotion: null,
  },

  {
    name: 'Alex',
    nameImg:
      'https://i.pinimg.com/564x/0e/ff/e8/0effe817959671e3f63c784354a789f8.jpg',
    image: [],
    message: 'Hello, how are you today?',
    time: new Date('2003-06-28'),
    emotion: null,
  },
];
export interface message {
  name: string;
  nameImg: string;
  image: string[];
  message: string;
  time: Date;
  emotion: any;
}
const TextInputAnimated = Animated.createAnimatedComponent(TextInput);
const Blur_Animation = () => {
  const [emotionTab, setEmotionTab] = useState({x: 0, y: 0});
  const [openEmotion, setOpenEmotion] = useState(false);
  const [data, setData] = useState<message[]>(DATA);
  const [emotion, setEmotion] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const widthSearchValue = useSharedValue(0);
  const searchAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(widthSearchValue.value, [0, 1], [40, 80])}%`,
    };
  });
  const renderMessage = ({item, index}: {item: message; index: number}) => {
    return (
      <Pressable
        onLongPress={e => {
          setEmotionTab({x: e.nativeEvent.pageX, y: e.nativeEvent.pageY});
          setOpenEmotion(true);
          setEmotion(index);
        }}
        key={index}
        style={{
          alignSelf: item.name === 'Alex' ? 'flex-end' : 'flex-start',
          marginVertical: 10,
        }}>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: item.name === 'Alex' ? 'flex-end' : 'flex-start',
            marginBottom: 10,
            maxWidth: 220,
          }}>
          {item.image.map((image: string, index: number) => {
            return (
              <Image
                key={index}
                source={{
                  uri: image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  marginHorizontal: 2,
                  borderRadius: 5,
                  marginVertical: 2,
                }}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item.name !== 'Alex' && (
            <Image
              source={{
                uri: item.nameImg,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
            />
          )}
          <View
            style={{
              backgroundColor: 'hsl(0,0%,95%)',
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 100,
              marginLeft: item.name === 'Alex' ? 0 : 10,
              marginRight: item.name !== 'Alex' ? 0 : 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              {item.message}
            </Text>
            {item.emotion !== null && (
              <Pressable
                style={[
                  {
                    width: 30,
                    height: 20,
                    paddingHorizontal: 10,
                    backgroundColor: 'hsl(0,0%,80%)',
                    paddingVertical: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    position: 'absolute',
                    bottom: -15,
                  },
                  item.name === 'Alex' ? {left: 10} : {right: 10},
                ]}>
                <Image
                  source={EMOTIONS[item.emotion]}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </Pressable>
            )}
          </View>
          {item.name === 'Alex' && (
            <Image
              source={{
                uri: item.nameImg,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
            />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/564x/58/19/98/5819980ec03f42d6cf01cdac92f3b206.jpg',
      }}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
          }}>
          <Pressable>
            <Entypo name="chevron-thin-left" size={20} color={'#246bfd'} />
          </Pressable>
          <Text
            style={{
              fontSize: 14,
              color: '#246bfd',
              fontWeight: '600',
            }}>
            Animations
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: '600',
          }}>
          Messages
        </Text>
      </View>

      <FlatList
        data={data.sort((m1, m2) => m1.time.getTime() - m2.time.getTime())}
        renderItem={renderMessage}
        style={{
          paddingHorizontal: 10,

          flex: 1,
        }}
        onScroll={() => {
          if (openEmotion === true) {
            setOpenEmotion(false);
            setEmotionTab({x: 0, y: 0});
            setEmotion(0);
          }
        }}
      />
      {openEmotion && (
        <Animated.View
          style={{
            position: 'absolute',
            top: emotionTab.y - 120,
            left: emotionTab.x - 250 < 0 ? 50 : emotionTab.x - 250,
            zIndex: 999,
          }}>
          <Emotions
            setData={setData}
            data={data}
            emotionIndex={emotion}
            setOpenEmotion={setOpenEmotion}
          />
        </Animated.View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        {!searchFocus ? (
          <>
            <MaterialCommunityIcons
              name="dots-grid"
              color={'hsl(235,90%,75%)'}
              size={30}
            />
            <MaterialCommunityIcons
              name="camera-outline"
              color={'hsl(235,90%,75%)'}
              size={30}
            />
            <AntDesign name="picture" color={'hsl(235,90%,75%)'} size={30} />
            <MaterialCommunityIcons
              name="microphone"
              color={'hsl(235,90%,75%)'}
              size={30}
            />
          </>
        ) : (
          <MaterialCommunityIcons
            name="chevron-left"
            size={36}
            color={'hsl(235,90%,75%)'}
          />
        )}
        <TextInputAnimated
          defaultValue={search}
          onChangeText={setSearch}
          placeholder="message"
          style={[
            searchAnimatedStyle,
            {
              backgroundColor: 'white',
              color: 'black',
              borderRadius: 100,
              paddingHorizontal: 10,
            },
          ]}
          onFocus={() => {
            widthSearchValue.value = withTiming(1);
            setSearchFocus(true);
          }}
          onBlur={() => {
            widthSearchValue.value = withTiming(0);
            setSearchFocus(false);
          }}
          placeholderTextColor={'gray'}
        />
        <AntDesign name="like1" color={'hsl(235,90%,75%)'} size={30} />
      </View>
      {openEmotion && (
        <Animated.View
          entering={SlideInDown.duration(300)}
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: 100,
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="reply" size={30} color={'black'} />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              Reply
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="content-copy"
              size={30}
              color={'black'}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              Copy
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="bookmark-multiple"
              size={30}
              color={'black'}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              Reply
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color={'black'}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              Reply
            </Text>
          </View>
        </Animated.View>
      )}
    </ImageBackground>
  );
};

export default Blur_Animation;
