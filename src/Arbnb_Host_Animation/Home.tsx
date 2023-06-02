import {View, Text, Image} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';
import {FlatList} from 'react-native';
import Book_Animation from './Book_Animation';
const IMAGE = [
  {
    ownerSrc:
      'https://e3.365dm.com/22/11/1600x900/skynews-elon-musk-twitter-space-x_5982801.jpg?20221130185151',
    imageSrc:
      'https://a0.muscache.com/im/pictures/miso/Hosting-10989371/original/46c0c87f-d9bc-443c-9b64-24d9e594b54c.jpeg?im_w=960',
    title: 'Chủ nhà Sagrario',
    describe:
      'Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.',
    rate: 4.87,
  },
  {
    ownerSrc:
      'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2022/12/14/2560451-untitled-design-2022-12-14t074836.836.jpg',

    imageSrc:
      'https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=960',
    title: 'Chủ nhà Sagrario',
    describe:
      'Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.',
    rate: 4.87,
  },
  {
    ownerSrc:
      'https://c.ndtvimg.com/2020-12/euf0smsg_mukesh-ambani-_625x300_29_December_20.jpg?im=Resize=(1230,900)',

    imageSrc:
      'https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=960',
    title: 'Chủ nhà Sagrario',
    describe:
      'Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.',
    rate: 4.87,
  },
];
interface ITEMS {
  ownerSrc: string;
  imageSrc: string;
  title: string;
  describe: string;
  rate: number;
}
type Props_IMAGE = {
  item: ITEMS;
  index: number;
};
const Home = () => {
  const renderItem = ({item, index}: Props_IMAGE) => {
    return (
      <View
        key={index}
        style={{
          marginVertical: 10,
        }}>
        <View>
          {/*Image Home */}
          <Image
            source={{uri: item.imageSrc}}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 10,
            }}
          />
          {/*Heart Press */}
          <Pressable
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}>
            <Ionicons name="ios-heart-outline" size={30} color={'white'} />
          </Pressable>
          {/*Book */}
          <Book_Animation ownerSrc={item.ownerSrc} />
        </View>
        {/*Information */}
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          {/*Title & Rating*/}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
              }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="md-star" size={18} color={'black'} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {item.rate}
              </Text>
            </View>
          </View>
          {/*describe */}
          <Text
            style={{
              color: 'hsl(0,0%,50%)',
              fontSize: 14,
            }}>
            {item.describe}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      {/*Header */}
      <View
        style={{
          borderRadius: 100,
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderColor: 'hsl(0,0%,80%)',
        }}>
        <EvilIcons name="search" size={40} color={'black'} />
        <View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
            Where to?
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 14,
            }}>
            Anywhere . Any Week . Add guests
          </Text>
        </View>
        <Pressable
          style={{
            width: 45,
            height: 45,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            borderColor: 'hsl(0,0%,80%)',
          }}>
          <Ionicons name="menu" size={25} color={'black'} />
        </Pressable>
      </View>
      {/*Body */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={IMAGE}
        renderItem={renderItem}
        renderToHardwareTextureAndroid
      />
    </View>
  );
};

export default Home;
