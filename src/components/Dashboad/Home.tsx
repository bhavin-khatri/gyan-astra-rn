import React, {Component} from 'react';
import {
  Button,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import LottieView from 'lottie-react-native';
import {strings} from '../../utils/Strings';
import {navigate, reset} from '../../utils/RootNavigation';
import {
  ADD_FUNDS,
  ADD_FUNDS_STRIPE,
  GA_CARD,
  haveCouponCode,
  HOME_SCREEN,
  LIVE_SECRET_KEY,
  modernEraAstraS,
  OTHER_ASTRAS,
  platinum,
  referAndEarnTitle,
  SERVICE_DATA,
  services,
  STRIPE,
  TOAST_MSG,
} from '../../utils/ApiConstants';
import {Utils} from '../../utils/Utils';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {firebase} from '@react-native-firebase/messaging';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      userData: '',
      services: [
        {
          title: SERVICE_DATA.DEPOSIT_FUND,
          image: Images.lottie_addFunds2,
          //onClick: () => Linking.openURL(ADD_FUNDS_STRIPE),
          onClick: () => Utils.showToast(TOAST_MSG.COMING_SOON),
        },
        {
          title: SERVICE_DATA.WITHDRAW_FUND,
          image: Images.lottie_withdrawFunds,
          onClick: () => Utils.showToast(TOAST_MSG.COMING_SOON),
        },
        // {
        //   title: SERVICE_DATA.ORDERS,
        //   image: Images.lottie_addOrders,
        //   onClick: () => Utils.showToast(TOAST_MSG.COMING_SOON),
        // },
        // {
        //   title: SERVICE_DATA.PRICE_ALERTS,
        //   image: Images.lottie_addPriceAlerts,
        //   onClick: () => Utils.showToast(TOAST_MSG.COMING_SOON),
        // },
        // {
        //   title: SERVICE_DATA.LEND_AND_EARN,
        //   image: Images.lottie_earn,
        //   onClick: () => Utils.showToast(TOAST_MSG.COMING_SOON),
        // },
        // {
        //   title: SERVICE_DATA.EXCHANGE_COINS,
        //   image: Images.lottie_exchange,
        //   onClick: () => Utils.showToast(TOAST_MSG.COMING_SOON),
        // },
      ],
      otherAstras: [
        {
          title: OTHER_ASTRAS.CRYPTO_ASTRA,
          image: Images.lottie_crypto2,
          onClick: () => navigate('CryptoDashboard'),
        },
        {
          title: OTHER_ASTRAS.STOCK_ASTRA,
          image: Images.lottie_sip,
          onClick: () => navigate('StockDashboard'),
        },
        {
          title: OTHER_ASTRAS.PI_ASTRA,
          image: Images.lottie_pi,
          onClick: () => navigate('PI'),
        },
        {
          title: OTHER_ASTRAS.NFT_ASTRA,
          image: Images.lottie_nft,
          onClick: () => navigate('NFT'),
        },
      ],
      paymentData: [],
      customerList: [],
      customerFromStripe: [],
      amount: 0,
      isLive: false,
    };
  }

  componentDidMount = async () => {
    const fcmToken = async () => firebase.messaging().getToken();
    console.log('fcmToken====>', await fcmToken());
    await this.getUser();
    await this.getPaymentsList();
    //await this.getCustomerList();
  };

  getPaymentsList = async () => {
    console.log('isLive::', this.state.isLive);
    const url = STRIPE.STRIPE_BASE_URL + STRIPE.LIST_ALL_PAYMENT;
    const token = this.state.isLive
      ? STRIPE.LIVE_SECRET_KEY
      : STRIPE.TEST_SECRET_KEY;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.get(url, {headers: headers}).then(response => {
      if (response !== null) {
        console.log('response.data_payment:::', response.data);
        this.setState({paymentData: response.data.data}, () => {
          console.log('paymentData:::', this.state.paymentData);
          this.getCustomerList();
        });
      }
    });
  };

  getCustomerList = async () => {
    const url = STRIPE.STRIPE_BASE_URL + STRIPE.LIST_ALL_CUSTOMER;
    const token = STRIPE.TEST_SECRET_KEY;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.get(url, {headers: headers}).then(response => {
      if (response !== null) {
        this.setState({customerList: response.data.data}, () => {
          console.log('customerList:::', this.state.customerList);
          this.getMyUserFromStripe();
        });
      } else {
        this.setState({customerList: []});
      }
    });
  };

  getMyUserFromStripe = async () => {
    if (!this.state.isLive) {
      this.state.customerList.filter((item: any) => {
        if (item.email === this.state.userData) {
          this.state.paymentData.filter(payment => {
            if (item.id === payment.customer) {
              this.setState({amount: payment.amount});
            }
          });
        }
      });
    } else {
      this.state.paymentData.filter((item: any) => {
        console.log('item::', item);
        item.charges.data.filter((details: any) => {
          console.log('details:::', details);
          console.log('details.billing_details:::', details.billing_details);
          console.log('this.state.userData:::', this.state.userData);
          if (details.billing_details.email === this.state.userData) {
            console.log('detailsAmountRefund:::', details.amount_refunded);
            console.log('details:::', details.amount);
            if (details.amount_refunded === 0) {
              this.setState({amount: details.amount}, () => {
                console.log('amount:::', this.state.amount);
              });
            } else {
              console.log('amount else:::', this.state.amount);
            }
          }
        });
      });
    }
  };

  renderServiceItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => item.onClick()}
        style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 10,
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          style={{...myStyles.ImageSize50, marginBottom: 2}}
          source={item.image}
          loop
          resizeMode={'contain'}
          autoPlay={true}
        />
        <Text style={{...myStyles.FontSize14}}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  renderAstraItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => item.onClick()}
        style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 10,
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          style={{...myStyles.ImageSize50, marginBottom: 2}}
          source={item.image}
          loop
          resizeMode={'contain'}
          autoPlay={true}
        />
        <Text style={{...myStyles.FontSize14}}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  logout = async () => {
    await auth()
      .signOut()
      .then(response => {
        Utils.setUserInLocal('');
        reset('Splash');
      })
      .catch(error => {
        if (error.code === 'auth/no-current-user') {
          Utils.setUserInLocal('');
          reset('Splash');
        }
      });
  };

  getUser = async () => {
    let userData = await Utils.getUserFromLocal();
    if (userData !== '' && userData !== null) {
      this.setState({userData: userData});
      console.log('userData::::', userData);
    }
  };

  render() {
    let myFund = this.state.amount ? this.state.amount : 0;
    myFund = myFund / 100;
    let userMail = this.state.userData ? this.state.userData : '';
    return (
      <View style={myStyles.ParentView}>
        <View style={myStyles.HeaderView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/*<Image style={myStyles.TopImage} source={Images.ic_app_icon} />*/}
            <Text style={myStyles.Title}>{strings.appName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Utils.createAlert(() => this.logout())}>
            <Image
              style={{...myStyles.TopImage, marginEnd: 10}}
              source={Images.ic_image_logout}
            />
          </TouchableOpacity>
        </View>
        <View style={myStyles.TopLineView} />
        <ScrollView style={myStyles.BodyView}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={{...myStyles.ReferEarnLabel, marginBottom: 0}}>
              {HOME_SCREEN.welcome}
            </Text>
            <Text
              style={{
                ...myStyles.ReferEarnLabel,
                color: Colors.primaryColor,
                marginHorizontal: 0,
                marginBottom: 0,
              }}>
              {userMail}
            </Text>
          </View>

          {/*<Text style={{...myStyles.ReferEarnLabel, marginVertical: 0}}>*/}
          {/*  Ga Virtual Card*/}
          {/*</Text>*/}
          <View style={myStyles.CardView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/*<View style={{alignItems: 'flex-start'}}>*/}
              {/*  <Text*/}
              {/*    style={{*/}
              {/*      ...myStyles.ReferEarnLabel,*/}
              {/*      marginBottom: 0,*/}
              {/*      color: Colors.white,*/}
              {/*      fontSize: Fonts.size._12px,*/}
              {/*    }}>*/}
              {/*    {GA_CARD.myCoins}*/}
              {/*  </Text>*/}
              {/*  <Text*/}
              {/*    style={{*/}
              {/*      ...myStyles.ReferEarnLabel,*/}
              {/*      color: Colors.white,*/}
              {/*      marginVertical: 0,*/}
              {/*      fontSize: Fonts.size._18px,*/}
              {/*    }}>*/}
              {/*    {GA_CARD.staticGaCoins}*/}
              {/*  </Text>*/}
              {/*</View>*/}
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    ...myStyles.ReferEarnLabel,
                    marginBottom: 0,
                    color: Colors.white,
                    fontSize: Fonts.size._12px,
                  }}>
                  {GA_CARD.myFunds}
                </Text>
                <Text
                  style={{
                    ...myStyles.ReferEarnLabel,
                    color: Colors.white,
                    marginVertical: 0,
                    fontSize: Fonts.size._18px,
                  }}>
                  {`₹ ${myFund}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => navigate('GACardDetails')}
                  style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    tintColor={Colors.white}
                    source={Images.ic_image_password_show}
                  />
                  <Text
                    style={{
                      ...myStyles.ReferEarnLabel,
                      marginHorizontal: 5,
                      color: Colors.white,
                    }}>
                    {GA_CARD.viewCard}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    ...myStyles.ReferEarnLabel,
                    marginVertical: 0,
                    color: Colors.white,
                    fontSize: Fonts.size._20px,
                  }}>
                  {GA_CARD.visa}
                </Text>
                <Text
                  style={{
                    ...myStyles.ReferEarnLabel,
                    marginVertical: 0,
                    marginTop: -5,
                    marginBottom: 10,
                    color: Colors.white,
                    fontSize: Fonts.size._8px,
                  }}>
                  {GA_CARD.platinum}
                </Text>
              </View>
            </View>
          </View>

          {/* Service View*/}
          <Text style={myStyles.ReferEarnLabel}>
            {HOME_SCREEN.modernEraAstraS}
          </Text>
          <FlatList
            numColumns={4}
            data={this.state.otherAstras}
            renderItem={item => this.renderAstraItem(item)}
          />
          <Text style={myStyles.ReferEarnLabel}>services</Text>
          <FlatList
            numColumns={3}
            data={this.state.services}
            renderItem={item => this.renderServiceItem(item)}
          />
          {/* Refer and Earn View*/}
          <Text style={myStyles.ReferEarnLabel}>
            {HOME_SCREEN.referAndEarnTitle}
          </Text>
          <TouchableOpacity
            onPress={() => Utils.showToast(TOAST_MSG.COMING_SOON)}
            style={myStyles.ReferView}>
            <LottieView
              style={{width: 120, height: 120}}
              source={Images.lottie_refer}
              loop
              autoPlay={true}
            />
            <Text style={myStyles.ReferEarnTxt}>
              {HOME_SCREEN.referAndEarn}
            </Text>
          </TouchableOpacity>
          {/* Coupon View */}
          <Text style={myStyles.ReferEarnLabel}>
            {HOME_SCREEN.haveCouponCode}
          </Text>
          <View style={myStyles.CouponView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Text
                style={{...myStyles.FontSize14, fontSize: Fonts.size._16px}}>
                {HOME_SCREEN.claimYourReward}
              </Text>
              <LottieView
                style={{height: 70, width: 70}}
                source={Images.lottie_coupon}
                loop
                autoPlay={true}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 0,
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  marginEnd: 10,
                  backgroundColor: Colors.white,
                  borderColor: Colors.lightGrey,
                }}
                placeholder={'Enter Code'}
              />
              <TouchableOpacity
                onPress={() => Utils.showToast(TOAST_MSG.COMING_SOON)}
                style={{
                  flexDirection: 'column',
                  backgroundColor: Colors.primaryColor,
                  height: 40,
                  width: 100,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: Fonts.size._16px,
                    color: Colors.white,
                    fontWeight: '700',
                  }}>
                  {HOME_SCREEN.apply}
                </Text>
              </TouchableOpacity>
            </View>
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
  Title: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  TopImage: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: Colors.lightGrey,
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
