import {View, Text, FlatList, Dimensions, ScrollView} from 'react-native';
import React, {useMemo} from 'react';

interface Props {
  tableHead: string[];
  tableData: string[][];
}

const TableComponent = ({
  data,
  flexArr = [],
  widthArr = [],
}: {
  data: Props;
  flexArr?: number[];
  widthArr?: number[];
}) => {
  const widthDimension = useMemo(
    () =>
      widthArr.length > 0
        ? widthArr.reduce((preValue, curValue, index) => preValue + curValue, 0)
        : Dimensions.get('window').width,
    [data],
  );
  const renderColumn = ({item, index}: {item: string[]; index: number}) => {
    return (
      <View
        key={index}
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: widthDimension,
            gap: 1,
            backgroundColor: 'hsl(0,0%,73%)',
          },
          index !== data.tableData.length - 1 && {paddingBottom: 1},
        ]}>
        {item.map((itemData, indexData) => {
          return (
            <View
              key={indexData}
              style={[
                flexArr.length > 0
                  ? {flex: flexArr[indexData]}
                  : {width: widthArr[indexData]},

                {
                  backgroundColor: index % 2 === 0 ? '#F7F6E7' : '#C1C0B9',

                  flexWrap: 'wrap',
                  paddingBottom: 2,
                },
              ]}>
              <Text
                adjustsFontSizeToFit
                style={{
                  color: 'black',
                  width: '100%',
                  padding: 5,
                }}>
                {itemData}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <ScrollView
      horizontal
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginTop: 20,
      }}>
      {/*Example 1 */}
      <View
        style={{
          marginVertical: 10,
        }}>
        <View
          style={{
            width: widthDimension,
            paddingVertical: 1,
            paddingHorizontal: 1,
            backgroundColor: 'hsl(0,0%,73%)',
          }}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: widthDimension,
                gap: 1,
                backgroundColor: 'hsl(0,0%,73%)',
              },
            ]}>
            {data.tableHead.map((itemData, indexData) => {
              return (
                <View
                  key={indexData}
                  style={[
                    flexArr.length > 0
                      ? {flex: flexArr[indexData]}
                      : {width: widthArr[indexData]},

                    {
                      backgroundColor: '#557893',
                      flexWrap: 'wrap',
                      paddingBottom: 2,
                    },
                  ]}>
                  <Text
                    adjustsFontSizeToFit
                    style={{
                      color: 'black',
                      width: '100%',
                      padding: 5,
                    }}>
                    {itemData}
                  </Text>
                </View>
              );
            })}
          </View>
          <FlatList
            horizontal={false}
            style={{
              height: 500,
            }}
            data={data.tableData}
            renderItem={renderColumn}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TableComponent;
