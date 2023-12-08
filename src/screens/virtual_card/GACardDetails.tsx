import React, {Component} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View,} from 'react-native';
import Colors from '../../assests/styles/Colors';
import Fonts from '../../assests/styles/Fonts';
import Images from '../../utils/Images';
import {GA_CARD, GA_CARD_DESCRIPTION,} from '../../utils/ApiConstants';
import {MainContainer} from '../../utils/MainContainer';

export class GACardDetails extends Component {
  constructor() {
    super();
    this.state = {
      benefits: [
        {
          title: GA_CARD_DESCRIPTION.benefit1,
          image: Images.ic_image_card_annual,
          onClick: () => {},
        },
        {
          title: GA_CARD_DESCRIPTION.benefit2,
          image: Images.ic_image_card_deposit,
          onClick: () => {},
        },
        {
          title: GA_CARD_DESCRIPTION.benefit3,
          image: Images.ic_image_card_withdraw,
          onClick: () => {},
        },
      ],
      usage: [
        {
          title: GA_CARD_DESCRIPTION.use1,
          image: Images.ic_image_card_online,
          onClick: () => {},
        },
        {
          title: GA_CARD_DESCRIPTION.use2,
          image: Images.ic_image_card_trading,
          onClick: () => {},
        },
      ],
    };
  }

  renderBenefitsItem({item}) {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     marginVertical: 10,
      //     flexDirection: 'column',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   }}>
      //   <View style={myStyles.usageImageBg}>
      //     <Image style={myStyles.usageImage} source={item.image} />
      //   </View>
      //   <Text style={{...myStyles.FontSize14, color: Colors.grey}}>
      //     {item.title}
      //   </Text>
      // </View>

      <View>
        <View style={myStyles.benefitView}>
          <View style={myStyles.benefitImageBg}>
            <Image style={myStyles.benefitImage} source={item.image} />
          </View>
          <Text style={myStyles.benefitText16}>{item.title}</Text>
        </View>
      </View>
    );
  }

  renderUsageItem({item}) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={myStyles.usageImageBg}>
          <Image style={myStyles.usageImage} source={item.image} />
        </View>
        <Text style={{...myStyles.FontSize14, color: Colors.grey}}>
          {item.title}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={myStyles.ParentView}>
        <MainContainer
          leftIcon={Images.ic_image_back}
          title="Gyan Astra Card"
          goHome={true}
        />
        <ScrollView style={myStyles.BodyView}>
          <View style={myStyles.CardView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...myStyles.BoldText16,
                  marginHorizontal: 10,
                  color: Colors.white,
                }}>
                Gyan Astra
              </Text>
              <Text
                style={{
                  ...myStyles.BoldText16,
                  color: Colors.white,
                  marginHorizontal: 10,
                  fontSize: Fonts.size._26px,
                }}>
                Ga
              </Text>
            </View>
            <Text
              style={{
                ...myStyles.Title,
                fontSize: Fonts.size._18px,
                marginVertical: 0,
                alignSelf: 'center',
                color: Colors.white,
              }}>
              {GA_CARD.accNumber}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <View style={{marginHorizontal: 10}}>
                  <Text
                    style={{fontSize: Fonts.size._10px, color: Colors.white}}>
                    {GA_CARD.cvv}
                  </Text>
                  <Text
                    style={{fontSize: Fonts.size._10px, color: Colors.white}}>
                    {GA_CARD.cvvNumber}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{fontSize: Fonts.size._10px, color: Colors.white}}>
                    {GA_CARD.expiry}
                  </Text>
                  <Text
                    style={{fontSize: Fonts.size._10px, color: Colors.white}}>
                    {GA_CARD.expiryDate}
                  </Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    ...myStyles.BoldText16,
                    marginVertical: 0,
                    color: Colors.white,
                    marginHorizontal: 10,
                    fontSize: Fonts.size._18px,
                  }}>
                  {GA_CARD.visa}
                </Text>
                <Text
                  style={{
                    ...myStyles.BoldText16,
                    marginVertical: 0,
                    marginTop: -5,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    color: Colors.white,
                    fontSize: Fonts.size._8px,
                  }}>
                  {GA_CARD.platinum}
                </Text>
              </View>
            </View>
          </View>
          {/* decscription view  */}
          <View style={myStyles.DescriptionView}>
            <Text
              style={{
                ...myStyles.BoldText16,
              }}>
              Overview
            </Text>
            <Text style={myStyles.NormalText16}>
              {GA_CARD_DESCRIPTION.cardDesc}
            </Text>
            <Text style={myStyles.BoldText16}>
              {GA_CARD_DESCRIPTION.usageLabel}
            </Text>
            <FlatList
              numColumns={3}
              data={this.state.usage}
              renderItem={item => this.renderUsageItem(item)}
            />
            <Text style={myStyles.BoldText16}>
              {GA_CARD_DESCRIPTION.benefitLabel}
            </Text>
            <FlatList
              //numColumns={2}
              data={this.state.benefits}
              renderItem={item => this.renderBenefitsItem(item)}
            />
          </View>
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
  DescriptionView: {
    marginHorizontal: 15,
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
    flex: 1,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: Colors.primaryColor,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  BoldText16: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    color: Colors.black,
  },
  NormalText16: {
    flex: 1,
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.regular,
    color: Colors.grey,
  },
  //For Center View
  FontSize14: {
    fontSize: Fonts.size._14px,
    color: Colors.black,
    fontFamily: Fonts.name.bold,
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
  benefitImageBg: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  benefitImage: {
    height: 20,
    width: 20,
    tintColor: Colors.primaryColor,
  },
  benefitView: {
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    marginVertical: 5,
  },
  benefitText16: {
    fontSize: Fonts.size._18px,
    fontFamily: Fonts.name.regular,
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.white,
  },
  usageImageBg: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
  },
  usageImage: {
    height: 20,
    width: 20,
    tintColor: Colors.white,
  },
});
