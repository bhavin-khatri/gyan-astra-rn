import axios from 'axios';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../assests/styles/Colors';
import Images from '../../../utils/Images';
import {CRYPTO_PRICES} from '../../../utils/ApiConstants';
import {Utils} from '../../../utils/Utils';
import Fonts from '../../../assests/styles/Fonts';
import {BottomSheet} from 'react-native-btr';
import {strings} from '../../../utils/Strings';
import {MainContainer} from '../../../utils/MainContainer';

export class CoinList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      coins_item: [],
      loading: false,
      visible: false,
      coin_id: '',
      coin_name: '',
      coin_icon: '',
      coin_symbol: '',
      coin_rank: '',
      coin_websiteUrl: '',
      coin_twitterUrl: '',
      coin_price: 0.0,
      coin_volume: 0.0,
      coin_price_change1h: 0.0,
      coin_price_change1d: 0.0,
      coin_price_change1w: 0.0,
    };
  }
  componentDidMount() {
    this.getCryptoData();
  }

  componentDidUpdate() {
    //this.getCryptoData();
  }

  getCryptoData() {
    this.setState({loading: true});
    let url = Utils.getUrl(CRYPTO_PRICES);
    axios.get(url).then(response => {
      if (response !== null) {
        this.setState(
          {
            data: response.data.coins,
          },
          () => {
            this.setState({loading: false});
          },
        );
      } else {
        this.setState({loading: false});
      }
    });
  }

  renderCryptoItem = ({item}) => {
    console.log('item::', item);
    let price_change_color = item.priceChange1h.toString().startsWith('-');
    console.log('price_change_color:-', price_change_color);
    return (
      <TouchableOpacity
        style={myStyles.ParentView}
        onPress={() => {
          //push('CoinDetails', {coin_id: item.id});
          this.getOnlyCoinDetailForId(item.id);
        }}>
        <View style={myStyles.BodyView2}>
          <View style={{flexDirection: 'row'}}>
            <View style={myStyles.ImageBg}>
              <Image style={myStyles.Image} source={{uri: item.icon}} />
            </View>
            <View style={myStyles.ViewColumn}>
              <Text style={myStyles.Coin_Name}>{item.name}</Text>
              <Text style={myStyles.Symbol}>{item.symbol}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <View style={myStyles.ViewRow}>
              <Text style={myStyles.currencyText}>{strings.currencyINR}</Text>
              <Text style={myStyles.PriceTxt}>
                {Utils.getConvertAmount(item.price, 2)}
              </Text>
            </View>

            {price_change_color ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={myStyles.PriceChangeNegative}>
                  {Utils.getConvertAmount(item.priceChange1h, 3)}
                </Text>
                <Text style={{...myStyles.currencyTextMini, color: Colors.red}}>
                  {strings.percentage}
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={myStyles.PriceChangePositive}>+</Text>
                <Text style={myStyles.PriceChangePositive}>
                  {Utils.getConvertAmount(item.priceChange1h, 3)}
                </Text>
                <Text
                  style={{
                    ...myStyles.currencyTextMini,
                    color: Colors.darkGreen,
                  }}>
                  {strings.percentage}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  toggle() {
    if (this.state.visible === true) {
      this.setState({visible: false});
    } else {
      this.setState({visible: true});
    }
  }

  getOnlyCoinDetailForId(coin_id) {
    this.state.data.map(item => {
      if (item.id === coin_id) {
        this.setState(
          {
            coin_id: item.id,
            coin_name: item.name,
            coin_icon: item.icon,
            coin_symbol: item.symbol,
            coin_rank: item.rank,
            coin_price: item.price,
            coin_volume: item.volume,
            coin_websiteUrl: item.websiteUrl,
            coin_twitterUrl: item.twitterUrl,
            coin_price_change1h: item.priceChange1h,
            coin_price_change1d: item.priceChange1d,
            coin_price_change1w: item.priceChange1w,
            canShowContent: true,
          },
          () => {
            this.toggle();
            console.log('------------------------------');
            console.log('coin_name:', this.state.coin_name);
            console.log('coin_symbol:', this.state.coin_symbol);
            console.log('coin_rank:', this.state.coin_rank);
            console.log('coin_price:', this.state.coin_price);
            console.log('coin_volume:', this.state.coin_volume);
            console.log('coin_twitterUrl:', this.state.coin_twitterUrl);
            console.log('coin_websiteUrl:', this.state.coin_websiteUrl);
            console.log('coin_icon:', this.state.coin_icon);
            console.log('coin_price_change1h:', this.state.coin_price_change1h);
            console.log('coin_price_change1d:', this.state.coin_price_change1d);
            console.log('coin_price_change1w:', this.state.coin_price_change1w);
            console.log('------------------------------');
            Utils.getPriceChange(
              this.state.coin_price,
              this.state.coin_price_change1h,
              false,
            );
          },
        );
      }
    });
  }

  render() {
    //for coin detail bottom sheet
    let coinName = this.state.coin_name ? this.state.coin_name : '';
    let coinIcon = this.state.coin_icon ? this.state.coin_icon : '';
    let coinSymbol = this.state.coin_symbol ? this.state.coin_symbol : '';
    let coinWebsite = this.state.coin_websiteUrl
      ? this.state.coin_websiteUrl
      : '';
    let coinTwitter = this.state.coin_twitterUrl
      ? this.state.coin_twitterUrl
      : '';
    let coinRank = this.state.coin_rank ? this.state.coin_rank : '';
    let coinPrice = this.state.coin_price ? this.state.coin_price : 0;
    let coinVolume = this.state.coin_volume ? this.state.coin_volume : 0;
    let coinPrice1h = this.state.coin_price_change1h
      ? this.state.coin_price_change1h
      : 0;
    let coinPrice1d = this.state.coin_price_change1d
      ? this.state.coin_price_change1d
      : 0;
    let coinPrice1w = this.state.coin_price_change1w
      ? this.state.coin_price_change1w
      : 0;
    let coinPrice1h_color = coinPrice1h.toString().startsWith('-');
    let coinPrice1d_color = coinPrice1d.toString().startsWith('-');
    let coinPrice1w_color = coinPrice1w.toString().startsWith('-');
    let loading = this.state.loading ? this.state.loading : false;
    console.log('coinPrice1h_color:-', coinPrice1h_color);
    console.log('coinPrice1d_color:-', coinPrice1d_color);
    console.log('coinPrice1w_color:-', coinPrice1w_color);
    return (
      <View style={myStyles.MParentView}>
        <MainContainer
          leftIcon={Images.ic_image_back}
          title={strings.priceTitle}
          goHome={true}
        />
        {loading === true ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: Colors.white,
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Colors.black} />
          </View>
        ) : (
          <ScrollView style={myStyles.BodyView}>
            <FlatList
              data={this.state.data}
              renderItem={item => this.renderCryptoItem(item)}
            />
          </ScrollView>
        )}

        <BottomSheet
          visible={this.state.visible}
          onBackButtonPress={() => {
            this.toggle();
          }}
          onBackdropPress={() => {
            this.toggle();
          }}>
          <View style={myStyles.card}>
            <TouchableOpacity
              onPress={() => {
                this.toggle();
              }}>
              <Image
                style={{
                  ...myStyles.TopImage,
                  alignSelf: 'flex-end',
                  marginBottom: 0,
                }}
                source={Images.ic_image_cancel}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={myStyles.rowViewCard}>
                <View style={myStyles.ImageBg}>
                  <Image style={myStyles.Image} source={{uri: coinIcon}} />
                </View>
                <Text
                  style={
                    myStyles.nameCard
                  }>{`${coinName} (${coinSymbol})`}</Text>
              </View>
              <Text
                style={
                  myStyles.rankCard
                }>{`${strings.coinRank} ${coinRank}`}</Text>
            </View>
            <View style={myStyles.TopLineView} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{...myStyles.currencyText, marginBottom: 8}}>
                {strings.currencyINR}
              </Text>
              <Text style={myStyles.priceCard}>
                {Utils.getConvertAmount(coinPrice, 2)}
              </Text>
            </View>
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: Fonts.size._16px,
                color: Colors.black,
                fontWeight: '700',
                fontFamily: Fonts.name.bold,
              }}>
              {strings.coinPerformance}
            </Text>
            <View
              style={{
                ...myStyles.RowView,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={myStyles.priceChangeLabelCard}>
                {strings.priceChange1Hour}
              </Text>
              {coinPrice1h_color ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={myStyles.PriceChangeNegative}>
                    {Utils.getConvertAmount(coinPrice1h, 3)}
                  </Text>
                  <Text
                    style={{...myStyles.currencyTextMini, color: Colors.red}}>
                    {strings.percentage}
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text style={myStyles.PriceChangePositive}>+</Text>
                  <Text style={myStyles.PriceChangePositive}>
                    {Utils.getConvertAmount(coinPrice1h, 3)}
                  </Text>
                  <Text
                    style={{
                      ...myStyles.currencyTextMini,
                      color: Colors.darkGreen,
                    }}>
                    {strings.percentage}
                  </Text>
                </View>
              )}
            </View>
            <View style={{...myStyles.LineView, marginHorizontal: 10}} />
            <View
              style={{
                ...myStyles.RowView,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={myStyles.priceChangeLabelCard}>
                {strings.priceChange1Day}
              </Text>
              {coinPrice1d_color ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={myStyles.PriceChangeNegative}>
                    {Utils.getConvertAmount(coinPrice1d, 3)}
                  </Text>
                  <Text
                    style={{...myStyles.currencyTextMini, color: Colors.red}}>
                    {strings.percentage}
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text style={myStyles.PriceChangePositive}>+</Text>
                  <Text style={myStyles.PriceChangePositive}>
                    {Utils.getConvertAmount(coinPrice1d, 3)}
                  </Text>
                  <Text
                    style={{
                      ...myStyles.currencyTextMini,
                      color: Colors.darkGreen,
                    }}>
                    {strings.percentage}
                  </Text>
                </View>
              )}
            </View>
            <View style={{...myStyles.LineView, marginHorizontal: 10}} />
            <View
              style={{
                ...myStyles.RowView,
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <Text style={myStyles.priceChangeLabelCard}>
                {strings.priceChange1Week}
              </Text>
              {coinPrice1w_color ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={myStyles.PriceChangeNegative}>
                    {Utils.getConvertAmount(coinPrice1w, 3)}
                  </Text>
                  <Text
                    style={{...myStyles.currencyTextMini, color: Colors.red}}>
                    {strings.percentage}
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text style={myStyles.PriceChangePositive}>+</Text>
                  <Text style={myStyles.PriceChangePositive}>
                    {Utils.getConvertAmount(coinPrice1w, 3)}
                  </Text>
                  <Text
                    style={{
                      ...myStyles.currencyTextMini,
                      color: Colors.darkGreen,
                    }}>
                    {strings.percentage}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={myStyles.viewButton}
                onPress={() => Linking.openURL(coinWebsite)}>
                <Image
                  style={{height: 20, width: 20, marginEnd: 5}}
                  source={Images.ic_image_website}
                />
                <Text style={{color: Colors.black, fontWeight: '700'}}>
                  Website
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={myStyles.viewButton}
                onPress={() => Linking.openURL(coinTwitter)}>
                <Image
                  style={{height: 20, width: 20, marginEnd: 5}}
                  source={Images.ic_image_twitter}
                />
                <Text style={{color: Colors.black, fontWeight: '700'}}>
                  Twitter
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{...myStyles.BuySellView, backgroundColor: Colors.red}}
                onPress={() => Utils.showToast('Coming Soon')}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: '700',
                    fontSize: Fonts.size._18px,
                  }}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...myStyles.BuySellView,
                  backgroundColor: Colors.green,
                }}
                onPress={() => Utils.showToast('Coming Soon')}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: '700',
                    fontSize: Fonts.size._18px,
                  }}>
                  Sell
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rowViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
  },
  nameCard: {
    fontSize: Fonts.size._18px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  viewButton: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    elevation: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  rankCard: {
    fontSize: Fonts.size._18px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.primaryColor,
  },
  priceChangeLabelCard: {
    fontSize: Fonts.size._12px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    color: Colors.black,
  },
  priceCard: {
    fontSize: Fonts.size._18px,
    alignSelf: 'center',
    color: Colors.black,
    marginVertical: 10,
  },
  MParentView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LineView: {
    height: 2,
    backgroundColor: Colors.lightGrey,
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderImageBg: {
    backgroundColor: Colors.Gray1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
  },
  HeaderOptionImage: {
    height: 30,
    width: 30,
  },
  TopLineView: {
    height: 5,
    backgroundColor: Colors.lightGrey,
  },
  BodyView: {
    flex: 1,
    flexDirection: 'column',
  },
  BodyView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Name: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  ParentView: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },

  ImageBg: {
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    flexDirection: 'column',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  Image: {
    height: 35,
    alignSelf: 'center',
    width: 35,
  },
  TopImage: {
    height: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    width: 20,
  },
  Coin_Name: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    color: Colors.black,
  },
  Symbol: {
    fontSize: Fonts.size._14px,
    fontFamily: Fonts.name.regular,
    color: Colors.grey,
  },
  ViewColumn: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  ViewRow: {
    flexDirection: 'row',
  },
  PriceTxt: {
    fontSize: Fonts.size._16px,
    color: Colors.black,
    fontFamily: Fonts.name.bold,
  },
  PriceChangeNegative: {
    fontSize: Fonts.size._12px,
    color: Colors.red,
    fontWeight: '700',
    fontFamily: Fonts.name.bold,
  },
  PriceChangePositive: {
    fontSize: Fonts.size._12px,
    fontWeight: '700',
    color: Colors.darkGreen,
    fontFamily: Fonts.name.bold,
  },
  currencyText: {
    fontSize: Fonts.size._14px,
    marginEnd: 2,
    marginTop: -1.5,
    color: Colors.black,
  },
  currencyTextMini: {
    fontSize: Fonts.size._12px,
    marginStart: 2,
    fontWeight: '700',
    marginTop: -2,
    color: Colors.white,
  },
  BuySellView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
