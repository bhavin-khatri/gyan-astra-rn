import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../assests/styles/Colors';
import Fonts from '../../../assests/styles/Fonts';
import {Utils} from '../../../utils/Utils';
import {CRYPTO_PRICES} from '../../../utils/ApiConstants';
import axios from 'axios';
import {goBack} from '../../../utils/RootNavigation';
import Images from '../../../utils/Images';

export class CoinDetails extends Component {
  constructor() {
    super();
    this.state = {
      coins_item: [],
      coin_id: '',
      coin_name: '',
      coin_icon: '',
      coin_symbol: '',
      coin_rank: '',
      coin_price: 0.0,
      coin_volume: 0.0,
      coin_price_change1h: 0.0,
      coin_price_change1d: 0.0,
      coin_price_change1w: 0.0,
      canShowContent: false,
    };
  }

  componentDidMount() {
    console.log('id');
    this.setState({coin_id: this.props.route.params.coin_id}, () => {
      console.log('coin_id:::', this.state.coin_id);
      this.getCryptoData();
    });
  }
  getCryptoData() {
    let url = Utils.getUrl(CRYPTO_PRICES);
    axios.get(url).then(response => {
      this.setState(
        {
          coins_item: response.data.coins,
        },
        () => {
          this.getOnlyCoinDetailForId();
        },
      );
    });
  }

  getOnlyCoinDetailForId() {
    let itemCoins = [];
    this.state.coins_item.map(item => {
      if (item.id === this.state.coin_id) {
        itemCoins.push(item);
        this.setState({coins_item: itemCoins}, () => {
          this.state.coins_item.map(item => {
            this.setState(
              {
                coin_id: item.id,
                coin_name: item.name,
                coin_icon: item.icon,
                coin_symbol: item.symbol,
                coin_rank: item.rank,
                coin_price: item.price,
                coin_volume: item.volume,
                coin_price_change1h: item.priceChange1h,
                coin_price_change1d: item.priceChange1d,
                coin_price_change1w: item.priceChange1w,
                canShowContent: true,
              },
              () => {
                console.log('------------------------------');
                console.log('coin_name:', this.state.coin_name);
                console.log('coin_symbol:', this.state.coin_symbol);
                console.log('coin_rank:', this.state.coin_rank);
                console.log('coin_price:', this.state.coin_price);
                console.log('coin_volume:', this.state.coin_volume);
                console.log('coin_icon:', this.state.coin_icon);
                console.log(
                  'coin_price_change1h:',
                  this.state.coin_price_change1h,
                );
                console.log(
                  'coin_price_change1d:',
                  this.state.coin_price_change1d,
                );
                console.log(
                  'coin_price_change1w:',
                  this.state.coin_price_change1w,
                );
                console.log('------------------------------');
                Utils.getPriceChange(
                  this.state.coin_price,
                  this.state.coin_price_change1h,
                  false,
                );
              },
            );
          });
        });
      }
    });
  }

  render() {
    let coinName = this.state.coin_name ? this.state.coin_name : '';
    let coinIcon = this.state.coin_icon ? this.state.coin_icon : '';
    let coinSymbol = this.state.coin_symbol ? this.state.coin_symbol : '';
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

    return (
      <View style={myStyles.MainParentView}>
        <View style={myStyles.HeaderView}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}>
            <Image style={myStyles.BackImage} source={Images.ic_image_back} />
          </TouchableOpacity>
          <Text style={myStyles.Title}>Coin Details</Text>
          <Image
            style={{...myStyles.BackImage, opacity: 0}}
            source={Images.ic_image_back}
          />
        </View>
        <View style={myStyles.LineView} />
        {this.state.coins_item && this.state.coins_item !== null ? (
          <View>
            <View style={myStyles.BoxView}>
              <View style={myStyles.RowView}>
                <ImageBackground
                  style={myStyles.Image}
                  source={Images.ic_image_placeholder}
                  resizeMode={'center'}>
                  <Image
                    style={myStyles.Image}
                    source={{uri: coinIcon}}
                    resizeMode={'contain'}
                  />
                </ImageBackground>
                <Text style={myStyles.coinName}>{coinName}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={myStyles.Image}
              resizeMode={'center'}
              source={Images.ic_image_placeholder}
            />
            <Text>Details Not Found</Text>
          </View>
        )}
      </View>
    );
  }
}
const myStyles = StyleSheet.create({
  MainParentView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  HeaderView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BoxView: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    elevation: 10,
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.primaryColor,
  },
  Image: {
    height: 80,
    width: 80,
  },
  BackImage: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  Title: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'center',
    color: Colors.black,
    marginHorizontal: 10,
  },
  coinName: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'center',
    color: Colors.black,
    marginHorizontal: 10,
  },
});
