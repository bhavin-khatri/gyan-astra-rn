import React, {Component} from 'react';
import {BLOCK_DAEMON_NFT_APIS, NFT_APIS} from '../../utils/ApiConstants';
import axios from 'axios';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {strings} from '../../utils/Strings';
import Colors from '../../assests/styles/Colors';
import Fonts from '../../assests/styles/Fonts';

export class NFTList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    // this.getNFTList();
    this.getNFTCollectionList();
  }

  getNFTList() {
    this.setState({loading: true});
    let url =
      NFT_APIS.NFT_BASE_URL + NFT_APIS.NFT_AUTH_KEY + '/' + NFT_APIS.GET_NFTS;
    console.log('urll::', url);
    axios.get(url).then(response => {
      if (response !== null) {
        this.setState(
          {
            loading: false,
            data: response.data.ownedNfts,
          },
          () => {
            console.log('dataNFT:::', this.state.data);
            console.log('dataNFT.title:::', response.data.ownedNfts.title);
          },
        );
      } else {
        this.setState({loading: false});
      }
    });
  }

  getNFTAssetList(conTractAddress: string) {
    console.log('conTractAddress:::', conTractAddress);
    let url =
      BLOCK_DAEMON_NFT_APIS.NFT_BASE_URL + BLOCK_DAEMON_NFT_APIS.NFT_ASSETS;
    console.log('url:::', url);
    const headers = {
      Authorization: `Bearer ${BLOCK_DAEMON_NFT_APIS.NFT_AUTH_KEY}`,
    };
    const params = {
      contract_address: conTractAddress,
    };
    axios
      .get(url, {headers: headers, params: params})
      .then(response => {
        if (response !== null) {
          this.setState(
            {
              loading: false,
            },
            () => {
              console.log('dataNFTAssets:::', response.data);
            },
          );
        } else {
          this.setState({loading: false});
        }
      })
      .catch(error => {
        console.log('error::', error);
      });
  }

  getNFTCollectionList() {
    let url =
      BLOCK_DAEMON_NFT_APIS.NFT_BASE_URL +
      BLOCK_DAEMON_NFT_APIS.NFT_COLLECTIONS;
    console.log('url:::', url);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${BLOCK_DAEMON_NFT_APIS.NFT_AUTH_KEY}`,
        },
      })
      .then(response => {
        if (response !== null) {
          this.setState(
            {
              loading: false,
            },
            () => {
              console.log('dataNFT:::', response.data);
              console.log(
                'dataNFT:::',
                response.data.data.map(item => {
                  console.log('dataNFTItem:::', item);
                  console.log('dataNFTContracts:::', item.contracts);
                  console.log('dataNFTContracts:::', item.contracts[0]);
                  // item.map(contract => {
                  //   console.log('contract:::', contract);
                  // });
                  this.getNFTAssetList(item.contracts[0]);
                }),
              );
            },
          );
        } else {
          this.setState({loading: false});
        }
      })
      .catch(error => {
        console.log('error::', error);
      });
  }

  renderNftItem = ({item}) => {
    // console.log('itemNFT:::', item);
    // console.log('contractMetadata:::', item.contractMetadata);
    // console.log('name:::', item.contractMetadata.name);
    // console.log('name:::', item.contractMetadata.symbol);
    // console.log('media:::', item.media);
    // console.log('media:::', item.tokenUri);
    // console.log('media:::', item.tokenUri.gateway);
    // console.log('media:::', item.tokenUri.raw);
    return (
      <View style={myStyles.ParentView}>
        <View style={myStyles.BodyView2}>
          <View style={{flexDirection: 'row'}}>
            <View style={myStyles.ImageBg}>
              <Image
                onError={error => {
                  console.log('error:::', error);
                }}
                style={myStyles.Image}
                source={{uri: item.tokenUri.gateway}}
              />
            </View>
            <View style={myStyles.ViewColumn}>
              <Text style={myStyles.Coin_Name}>{item.metadata.name}</Text>
              <Text style={myStyles.Symbol}>
                {item.contractMetadata.symbol}
              </Text>
            </View>
          </View>
          {/*<View style={{flexDirection: 'column', alignItems: 'flex-end'}}>*/}
          {/*  <View style={myStyles.ViewRow}>*/}
          {/*    <Text style={myStyles.currencyText}>{strings.currencyINR}</Text>*/}
          {/*    <Text style={myStyles.PriceTxt}>*/}
          {/*      {Utils.getConvertAmount(item.price, 2)}*/}
          {/*    </Text>*/}
          {/*  </View>*/}

          {/*  {price_change_color ? (*/}
          {/*    <View style={{flexDirection: 'row'}}>*/}
          {/*      <Text style={myStyles.PriceChangeNegative}>*/}
          {/*        {Utils.getConvertAmount(item.priceChange1h, 3)}*/}
          {/*      </Text>*/}
          {/*      <Text style={{...myStyles.currencyTextMini, color: Colors.red}}>*/}
          {/*        {strings.percentage}*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*  ) : (*/}
          {/*    <View style={{flexDirection: 'row'}}>*/}
          {/*      <Text style={myStyles.PriceChangePositive}>+</Text>*/}
          {/*      <Text style={myStyles.PriceChangePositive}>*/}
          {/*        {Utils.getConvertAmount(item.priceChange1h, 3)}*/}
          {/*      </Text>*/}
          {/*      <Text*/}
          {/*        style={{*/}
          {/*          ...myStyles.currencyTextMini,*/}
          {/*          color: Colors.darkGreen,*/}
          {/*        }}>*/}
          {/*        {strings.percentage}*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*</View>*/}
        </View>
      </View>
    );
  };

  render() {
    let loading = this.state.loading ? this.state.loading : false;
    return (
      <View style={myStyles.MParentView}>
        <View style={myStyles.HeaderView}>
          <Text style={myStyles.Name}>{strings.priceTitle}</Text>
        </View>
        <View style={myStyles.TopLineView} />
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
            {/*<FlatList*/}
            {/*  data={this.state.data}*/}
            {/*  renderItem={item => this.renderNftItem(item)}*/}
            {/*/>*/}
          </ScrollView>
        )}

        {/*<BottomSheet*/}
        {/*  visible={this.state.visible}*/}
        {/*  onBackButtonPress={() => {*/}
        {/*    this.toggle();*/}
        {/*  }}*/}
        {/*  onBackdropPress={() => {*/}
        {/*    this.toggle();*/}
        {/*  }}>*/}
        {/*  <View style={myStyles.card}>*/}
        {/*    <TouchableOpacity*/}
        {/*      onPress={() => {*/}
        {/*        this.toggle();*/}
        {/*      }}>*/}
        {/*      <Image*/}
        {/*        style={{*/}
        {/*          ...myStyles.TopImage,*/}
        {/*          alignSelf: 'flex-end',*/}
        {/*          marginBottom: 0,*/}
        {/*        }}*/}
        {/*        source={Images.ic_image_cancel}*/}
        {/*      />*/}
        {/*    </TouchableOpacity>*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        flexDirection: 'row',*/}
        {/*        justifyContent: 'space-between',*/}
        {/*        alignItems: 'center',*/}
        {/*      }}>*/}
        {/*      <View style={myStyles.rowViewCard}>*/}
        {/*        <View style={myStyles.ImageBg}>*/}
        {/*          <Image style={myStyles.Image} source={{uri: coinIcon}} />*/}
        {/*        </View>*/}
        {/*        <Text*/}
        {/*          style={*/}
        {/*            myStyles.nameCard*/}
        {/*          }>{`${coinName} (${coinSymbol})`}</Text>*/}
        {/*      </View>*/}
        {/*      <Text*/}
        {/*        style={*/}
        {/*          myStyles.rankCard*/}
        {/*        }>{`${strings.coinRank} ${coinRank}`}</Text>*/}
        {/*    </View>*/}
        {/*    <View style={myStyles.TopLineView} />*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        flexDirection: 'row',*/}
        {/*        justifyContent: 'center',*/}
        {/*        alignItems: 'center',*/}
        {/*      }}>*/}
        {/*      <Text style={{...myStyles.currencyText, marginBottom: 8}}>*/}
        {/*        {strings.currencyINR}*/}
        {/*      </Text>*/}
        {/*      <Text style={myStyles.priceCard}>*/}
        {/*        {Utils.getConvertAmount(coinPrice, 2)}*/}
        {/*      </Text>*/}
        {/*    </View>*/}
        {/*    <Text*/}
        {/*      style={{*/}
        {/*        marginHorizontal: 10,*/}
        {/*        fontSize: Fonts.size._16px,*/}
        {/*        color: Colors.black,*/}
        {/*        fontWeight: '700',*/}
        {/*        fontFamily: Fonts.name.bold,*/}
        {/*      }}>*/}
        {/*      {strings.coinPerformance}*/}
        {/*    </Text>*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        ...myStyles.RowView,*/}
        {/*        marginHorizontal: 10,*/}
        {/*        marginVertical: 10,*/}
        {/*      }}>*/}
        {/*      <Text style={myStyles.priceChangeLabelCard}>*/}
        {/*        {strings.priceChange1Hour}*/}
        {/*      </Text>*/}
        {/*      {coinPrice1h_color ? (*/}
        {/*        <View style={{flexDirection: 'row'}}>*/}
        {/*          <Text style={myStyles.PriceChangeNegative}>*/}
        {/*            {Utils.getConvertAmount(coinPrice1h, 3)}*/}
        {/*          </Text>*/}
        {/*          <Text*/}
        {/*            style={{...myStyles.currencyTextMini, color: Colors.red}}>*/}
        {/*            {strings.percentage}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      ) : (*/}
        {/*        <View style={{flexDirection: 'row'}}>*/}
        {/*          <Text style={myStyles.PriceChangePositive}>+</Text>*/}
        {/*          <Text style={myStyles.PriceChangePositive}>*/}
        {/*            {Utils.getConvertAmount(coinPrice1h, 3)}*/}
        {/*          </Text>*/}
        {/*          <Text*/}
        {/*            style={{*/}
        {/*              ...myStyles.currencyTextMini,*/}
        {/*              color: Colors.darkGreen,*/}
        {/*            }}>*/}
        {/*            {strings.percentage}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      )}*/}
        {/*    </View>*/}
        {/*    <View style={{...myStyles.LineView, marginHorizontal: 10}} />*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        ...myStyles.RowView,*/}
        {/*        marginHorizontal: 10,*/}
        {/*        marginVertical: 10,*/}
        {/*      }}>*/}
        {/*      <Text style={myStyles.priceChangeLabelCard}>*/}
        {/*        {strings.priceChange1Day}*/}
        {/*      </Text>*/}
        {/*      {coinPrice1d_color ? (*/}
        {/*        <View style={{flexDirection: 'row'}}>*/}
        {/*          <Text style={myStyles.PriceChangeNegative}>*/}
        {/*            {Utils.getConvertAmount(coinPrice1d, 3)}*/}
        {/*          </Text>*/}
        {/*          <Text*/}
        {/*            style={{...myStyles.currencyTextMini, color: Colors.red}}>*/}
        {/*            {strings.percentage}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      ) : (*/}
        {/*        <View style={{flexDirection: 'row'}}>*/}
        {/*          <Text style={myStyles.PriceChangePositive}>+</Text>*/}
        {/*          <Text style={myStyles.PriceChangePositive}>*/}
        {/*            {Utils.getConvertAmount(coinPrice1d, 3)}*/}
        {/*          </Text>*/}
        {/*          <Text*/}
        {/*            style={{*/}
        {/*              ...myStyles.currencyTextMini,*/}
        {/*              color: Colors.darkGreen,*/}
        {/*            }}>*/}
        {/*            {strings.percentage}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      )}*/}
        {/*    </View>*/}
        {/*    <View style={{...myStyles.LineView, marginHorizontal: 10}} />*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        ...myStyles.RowView,*/}
        {/*        marginHorizontal: 10,*/}
        {/*        marginVertical: 10,*/}
        {/*      }}>*/}
        {/*      <Text style={myStyles.priceChangeLabelCard}>*/}
        {/*        {strings.priceChange1Week}*/}
        {/*      </Text>*/}
        {/*      {coinPrice1w_color ? (*/}
        {/*        <View style={{flexDirection: 'row'}}>*/}
        {/*          <Text style={myStyles.PriceChangeNegative}>*/}
        {/*            {Utils.getConvertAmount(coinPrice1w, 3)}*/}
        {/*          </Text>*/}
        {/*          <Text*/}
        {/*            style={{...myStyles.currencyTextMini, color: Colors.red}}>*/}
        {/*            {strings.percentage}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      ) : (*/}
        {/*        <View style={{flexDirection: 'row'}}>*/}
        {/*          <Text style={myStyles.PriceChangePositive}>+</Text>*/}
        {/*          <Text style={myStyles.PriceChangePositive}>*/}
        {/*            {Utils.getConvertAmount(coinPrice1w, 3)}*/}
        {/*          </Text>*/}
        {/*          <Text*/}
        {/*            style={{*/}
        {/*              ...myStyles.currencyTextMini,*/}
        {/*              color: Colors.darkGreen,*/}
        {/*            }}>*/}
        {/*            {strings.percentage}*/}
        {/*          </Text>*/}
        {/*        </View>*/}
        {/*      )}*/}
        {/*    </View>*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        flexDirection: 'row',*/}
        {/*        justifyContent: 'space-around',*/}
        {/*        alignItems: 'center',*/}
        {/*      }}>*/}
        {/*      <TouchableOpacity*/}
        {/*        style={myStyles.viewButton}*/}
        {/*        onPress={() => Linking.openURL(coinWebsite)}>*/}
        {/*        <Image*/}
        {/*          style={{height: 20, width: 20, marginEnd: 5}}*/}
        {/*          source={Images.ic_image_website}*/}
        {/*        />*/}
        {/*        <Text style={{color: Colors.black, fontWeight: '700'}}>*/}
        {/*          Website*/}
        {/*        </Text>*/}
        {/*      </TouchableOpacity>*/}
        {/*      <TouchableOpacity*/}
        {/*        style={myStyles.viewButton}*/}
        {/*        onPress={() => Linking.openURL(coinTwitter)}>*/}
        {/*        <Image*/}
        {/*          style={{height: 20, width: 20, marginEnd: 5}}*/}
        {/*          source={Images.ic_image_twitter}*/}
        {/*        />*/}
        {/*        <Text style={{color: Colors.black, fontWeight: '700'}}>*/}
        {/*          Twitter*/}
        {/*        </Text>*/}
        {/*      </TouchableOpacity>*/}
        {/*    </View>*/}
        {/*    <View style={{flexDirection: 'row'}}>*/}
        {/*      <TouchableOpacity*/}
        {/*        style={{...myStyles.BuySellView, backgroundColor: Colors.red}}*/}
        {/*        onPress={() => Utils.showToast('Coming Soon')}>*/}
        {/*        <Text*/}
        {/*          style={{*/}
        {/*            color: Colors.white,*/}
        {/*            fontWeight: '700',*/}
        {/*            fontSize: Fonts.size._18px,*/}
        {/*          }}>*/}
        {/*          Buy*/}
        {/*        </Text>*/}
        {/*      </TouchableOpacity>*/}
        {/*      <TouchableOpacity*/}
        {/*        style={{*/}
        {/*          ...myStyles.BuySellView,*/}
        {/*          backgroundColor: Colors.green,*/}
        {/*        }}*/}
        {/*        onPress={() => Utils.showToast('Coming Soon')}>*/}
        {/*        <Text*/}
        {/*          style={{*/}
        {/*            color: Colors.white,*/}
        {/*            fontWeight: '700',*/}
        {/*            fontSize: Fonts.size._18px,*/}
        {/*          }}>*/}
        {/*          Sell*/}
        {/*        </Text>*/}
        {/*      </TouchableOpacity>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</BottomSheet>*/}
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
