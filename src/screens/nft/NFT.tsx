import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../utils/Images';
import Colors from '../../assests/styles/Colors';
import Fonts from '../../assests/styles/Fonts';
import {DESCRIPTION, NFT_SITE, OTHER_ASTRAS} from '../../utils/ApiConstants';
import {goBack} from '../../utils/RootNavigation';

export class NFT extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      Apps: [
        {
          title: 'GoArt',
          image: Images.ic_image_goart,
        },
        {
          title: 'Bored ape creator',
          image: Images.ic_image_boredape,
        },
        {
          title: 'UniPixel',
          image: Images.ic_image_unipixel,
        },
      ],
    };
  }

  renderStockMarketApps({item}) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 10,
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50, marginBottom: 5}}
          source={item.image}
        />
        <Text
          style={{
            fontSize: Fonts.size._14px,
            color: Colors.black,
            fontWeight: '700',
          }}>
          {item.title}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={myStyles.ParentView}>
        <View style={myStyles.HeaderView}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image style={myStyles.TopImage} source={Images.ic_image_back} />
          </TouchableOpacity>
          <Text style={myStyles.Title}>{OTHER_ASTRAS.NFT_ASTRA}</Text>
          <Image style={myStyles.TopImage} />
        </View>
        <View style={myStyles.TopLineView} />
        <ScrollView style={myStyles.BodyView}>
          <Text style={myStyles.BoldTxt16}>{DESCRIPTION.WHAT_IS_NFT}</Text>
          <Text style={myStyles.SimpleTxt14}>{DESCRIPTION.NFT_DESC}</Text>

          <Text style={myStyles.BoldTxt16}>{DESCRIPTION.KEY_LABEL}</Text>
          <Text style={myStyles.SimpleTxt14}>{DESCRIPTION.KEY_NFT_1}</Text>
          <Text style={myStyles.SimpleTxt14}>{DESCRIPTION.KEY_NFT_2}</Text>
          <Text style={myStyles.SimpleTxt14}>{DESCRIPTION.KEY_NFT_3}</Text>

          <Text style={myStyles.BoldTxt16}>Top NFT Creators app</Text>
          <FlatList
            numColumns={3}
            data={this.state.Apps}
            renderItem={item => this.renderStockMarketApps(item)}
          />
          <Text style={myStyles.BoldTxt16}>Official Website</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              backgroundColor: Colors.primaryColor,
              height: 40,
              marginHorizontal: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => Linking.openURL(NFT_SITE)}>
            <Text
              style={{
                fontSize: Fonts.size._16px,
                color: Colors.white,
                fontWeight: '700',
              }}>
              Head to the official website
            </Text>
          </TouchableOpacity>
          <View style={{marginBottom: 50}} />
        </ScrollView>
      </View>
    );
  }
}

export const myStyles = StyleSheet.create({
  ParentView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  TopImage: {
    height: 20,
    width: 20,
    marginVertical: 10,
    marginStart: 10,
  },
  TopLineView: {
    height: 5,
    backgroundColor: Colors.lightGrey,
  },
  BodyView: {
    flex: 1,
    flexDirection: 'column',
  },
  CardView: {
    flexDirection: 'column',
    borderRadius: 15,
    elevation: 5,
    padding: 10,
    backgroundColor: Colors.primaryColor,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  ReferView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
    height: 100,
    backgroundColor: Colors.lightPurple,
    marginHorizontal: 15,
  },
  ReferEarnTxt: {
    flex: 1,
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.white,
  },
  ReferEarnLabel: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  //For Center View
  FontSize14: {
    fontSize: Fonts.size._14px,
    color: Colors.black,
    fontFamily: Fonts.name.bold,
  },
  BoldTxt16: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  SimpleTxt14: {
    fontSize: Fonts.size._14px,
    fontFamily: Fonts.name.bold,
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.grey,
  },
  ImageSize50: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  ViewColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  CouponView: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,
    elevation: 5,
    marginBottom: 70,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 15,
  },
});
