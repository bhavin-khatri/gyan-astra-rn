import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../assests/styles/Colors';
import Fonts from '../../assests/styles/Fonts';
import {strings} from '../../utils/Strings';
import Images from '../../utils/Images';

export class MyProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log('Profile screen');
  }

  render() {
    return (
      <View style={myStyles.ParentView}>
        <View style={myStyles.HeaderView}>
          <Text style={myStyles.Title}>My Investments</Text>
        </View>
        <View style={myStyles.TopLineView} />

        <View style={myStyles.RedBackGroundView}>
          <View style={myStyles.BoxView}>
            <View style={myStyles.RowView}>
              <View style={myStyles.ColumnView}>
                <Text style={myStyles.GreyLabels}>Current</Text>
                <Text
                  style={
                    myStyles.BlackLabels
                  }>{`${strings.currencyINR} 777`}</Text>
              </View>
              <View style={myStyles.ColumnView}>
                <Text style={myStyles.GreyLabels}>Invested</Text>
                <Text
                  style={
                    myStyles.BlackLabels
                  }>{`${strings.currencyINR} 77`}</Text>
              </View>
            </View>
            <View style={myStyles.RowView}>
              <View style={myStyles.ColumnView}>
                <Text style={myStyles.GreyLabels}>Returns</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    color: Colors.darkGreen,
                  }}>{`+ ${strings.currencyINR} 700`}</Text>
              </View>
              <View style={myStyles.ColumnView}>
                <Text style={myStyles.GreyLabels}>Total Returns %</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    color: Colors.darkGreen,
                  }}>{`+ ${strings.currencyINR} 100 %`}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Image
              style={myStyles.InfoImage}
              tintColor={Colors.white}
              source={Images.ic_image_info}
            />
            <Text
              style={{
                ...myStyles.GreyLabels,
                color: Colors.white,
                marginStart: 5,
              }}>
              Some investment details may be indicative
            </Text>
          </View>
        </View>
        {/*my coins*/}
        <ScrollView style={myStyles.WhiteBoxView}>
          <Text
            style={{
              ...myStyles.GreyLabels,
              marginHorizontal: 15,
              marginVertical: 15,
              marginBottom: 0,
            }}>
            Invested Coins
          </Text>
          <View style={myStyles.CoinBoxView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={myStyles.CoinImageTitle}>
                <Image
                  style={myStyles.CoinImage}
                  source={Images.ic_image_bitcoin}
                />
                <Text style={myStyles.CoinTitle}>Bitcoin</Text>
              </View>
              <Text style={{...myStyles.CoinTitle, fontWeight: '400'}}>
                0.000007 BTC
              </Text>
            </View>
            <View style={{...myStyles.TopLineView, height: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Returns</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    color: Colors.darkGreen,
                    fontSize: Fonts.size._14px,
                  }}>
                  +0.77%
                </Text>
              </View>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Current</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    fontSize: Fonts.size._14px,
                  }}>
                  {strings.currencyINR} 7.77
                </Text>
              </View>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Invested</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    fontSize: Fonts.size._14px,
                  }}>
                  {strings.currencyINR} 7.00
                </Text>
              </View>
            </View>
          </View>
          <View style={myStyles.CoinBoxView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={myStyles.CoinImageTitle}>
                <Image
                  style={myStyles.CoinImage}
                  source={Images.ic_image_bitcoin_cash}
                />
                <Text style={myStyles.CoinTitle}>Bitcoin Cash</Text>
              </View>
              <Text style={{...myStyles.CoinTitle, fontWeight: '400'}}>
                0.000007 BTC
              </Text>
            </View>
            <View style={{...myStyles.TopLineView, height: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Returns</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    color: Colors.darkGreen,
                    fontSize: Fonts.size._14px,
                  }}>
                  +0.77%
                </Text>
              </View>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Current</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    fontSize: Fonts.size._14px,
                  }}>
                  {strings.currencyINR} 7.77
                </Text>
              </View>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Invested</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    fontSize: Fonts.size._14px,
                  }}>
                  {strings.currencyINR} 7.00
                </Text>
              </View>
            </View>
          </View>
          <View style={{...myStyles.CoinBoxView, marginBottom: 70}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={myStyles.CoinImageTitle}>
                <Image
                  style={myStyles.CoinImage}
                  source={Images.ic_image_eth}
                />
                <Text style={myStyles.CoinTitle}>Ethereum</Text>
              </View>
              <Text style={{...myStyles.CoinTitle, fontWeight: '400'}}>
                0.000777 ETH
              </Text>
            </View>
            <View style={{...myStyles.TopLineView, height: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Returns</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    color: Colors.darkGreen,
                    fontSize: Fonts.size._14px,
                  }}>
                  +7.77%
                </Text>
              </View>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Current</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    fontSize: Fonts.size._14px,
                  }}>
                  {strings.currencyINR} 777.77
                </Text>
              </View>
              <View style={{flexDirection: 'column', padding: 5}}>
                <Text style={myStyles.GreyLabels}>Invested</Text>
                <Text
                  style={{
                    ...myStyles.BlackLabels,
                    fontWeight: '400',
                    fontSize: Fonts.size._14px,
                  }}>
                  {strings.currencyINR} 77.00
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  ParentView: {
    flex: 1,
    flexDirection: 'column',
  },
  RedBackGroundView: {
    flexDirection: 'column',
    backgroundColor: Colors.primaryColor,
  },
  BoxView: {
    marginHorizontal: 15,
    marginVertical: 15,
    marginBottom: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  Title: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  ColumnView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TopLineView: {
    height: 5,
    backgroundColor: Colors.lightGrey,
  },
  GreyLabels: {
    fontSize: Fonts.size._14px,
    color: Colors.grey,
  },
  BlackLabels: {
    fontSize: Fonts.size._16px,
    color: Colors.black,
  },
  InfoImage: {
    width: 25,
    height: 25,
  },
  WhiteBoxView: {
    marginTop: -5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: Colors.white,
  },
  CoinBoxView: {
    flexDirection: 'column',
    marginHorizontal: 15,
    marginVertical: 15,
    marginBottom: 0,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  CoinImageTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  CoinImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  CoinTitle: {
    fontSize: Fonts.size._16px,
    fontWeight: '700',
    color: Colors.black,
    marginStart: 5,
  },
});
