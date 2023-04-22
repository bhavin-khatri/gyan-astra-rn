//https://finnhub.io/api/v1/news?category=general&token=cddvlr2ad3i4an25vli0cddvlr2ad3i4an25vlig

import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Utils} from '../../../../utils/Utils';
import {
  CRYPTO_NEWS,
  OTHER_ASTRAS,
  STOCK_MARKET,
} from '../../../../utils/ApiConstants';
import axios from 'axios';
import Images from '../../../../utils/Images';
import Colors from '../../../../utils/Colors';
import Fonts from '../../../../utils/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {push} from '../../../../utils/RootNavigation';
import {MainContainer} from '../../../../utils/MainContainer';
import {strings} from '../../../../utils/Strings';

export class StockNewsList extends Component {
  componentDidMount() {
    console.log('---Stock NEWS---');
    this.getStockNewsList();
  }

  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      visible: false,
    };
  }

  // componentDidUpdate() {
  //   this.getCryptoNews();
  // }

  getStockNewsList() {
    this.setState({loading: true});
    let url =
      STOCK_MARKET.STOCK_BASE_URL +
      STOCK_MARKET.STOCK_NEWS_ENDPOINT +
      STOCK_MARKET.STOCK_AUTH_KEY;
    console.log('urlStock:::', url);
    axios.get(url).then(response => {
      console.log('response==>', response.data);
      if (response !== null) {
        this.setState(
          {
            data: response.data,
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

  renderNewsItem = ({item}) => {
    console.log('item::', item.headline);

    return (
      <TouchableOpacity
        style={myStyles.ParentView}
        onPress={() => {
          push('StockNewsDetails', {news_id: item.id});
        }}>
        <View style={myStyles.BodyView2}>
          <View style={myStyles.ViewColumn}>
            <Text style={myStyles.Title} numberOfLines={3}>
              {item.headline}
            </Text>
            <View style={{...myStyles.RowView, marginVertical: 10}}>
              <Text style={myStyles.SourceText} numberOfLines={1}>
                {item.source}
              </Text>
              <Text style={myStyles.DateText} numberOfLines={1}>
                {Utils.getDate(item.datetime, 'DD MMM YYYY', true)}
              </Text>
            </View>
          </View>
          <ImageBackground
            style={myStyles.Image}
            source={Images.ic_image_placeholder}
            resizeMode={'center'}>
            <Image style={myStyles.Image} source={{uri: item.image}} />
          </ImageBackground>
        </View>

        <View style={myStyles.LineView} />
      </TouchableOpacity>
    );
  };

  render() {
    let loading = this.state.loading ? this.state.loading : false;
    return (
      <View style={myStyles.SParentView}>
        <MainContainer
          leftIcon={Images.ic_image_back}
          title={strings.newsTitle}
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
              renderItem={item => this.renderNewsItem(item)}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}
const myStyles = StyleSheet.create({
  ParentView: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  BodyView2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TopImage: {
    height: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    width: 20,
  },
  Image: {
    height: 55,
    alignSelf: 'center',
    borderRadius: 10,
    width: 55,
  },
  Title: {
    width: 250,
    fontSize: Fonts.size._14px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: Colors.black,
  },
  SourceText: {
    fontSize: Fonts.size._12px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: Colors.red,
  },
  DateText: {
    fontSize: Fonts.size._12px,
    fontFamily: Fonts.name.medium,
    alignSelf: 'flex-start',
    color: Colors.grey,
  },
  Description: {
    width: 280,
    fontSize: Fonts.size._12px,
    fontFamily: Fonts.name.bold,
    fontWeight: '200',
    color: Colors.grey,
  },
  Symbol: {
    fontSize: Fonts.size._14px,
    fontFamily: Fonts.name.regular,
    color: Colors.grey,
  },
  ViewColumn: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  ViewRow: {
    flexDirection: 'row',
  },
  SParentView: {
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
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 10,
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
  BodyView: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 50,
  },
  Name: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  TopLineView: {
    height: 5,
    backgroundColor: Colors.lightGrey,
  },
});
