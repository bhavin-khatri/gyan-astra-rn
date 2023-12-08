//https://finnhub.io/api/v1/news?category=general&token=cddvlr2ad3i4an25vli0cddvlr2ad3i4an25vlig

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Utils} from '../../../utils/Utils';
import {STOCK_MARKET} from '../../../utils/ApiConstants';
import axios from 'axios';
import Images from '../../../utils/Images';
import Colors from '../../../assests/styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {push} from '../../../utils/RootNavigation';
import {newsItemStyle} from '../../../assests/styles/NewsItemStyle';

export const StockNewsList = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStockNewsList();
  }, []);

  function getStockNewsList() {
    setLoading(true);
    let url =
      STOCK_MARKET.STOCK_BASE_URL +
      STOCK_MARKET.STOCK_NEWS_ENDPOINT +
      STOCK_MARKET.STOCK_AUTH_KEY;
    axios
      .get(url)
      .then(response => {
        if (response) {
          setLoading(false);
          setData(response.data);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  }

  const renderNewsItem = ({item}) => {
    let imageUrl =
      item.image && !item.image.includes('undefined')
        ? {uri: item.image}
        : Images.ic_image_placeholder;
    let imageUrlResizeMode =
      item.image && !item.image.includes('undefined') ? 'cover' : 'contain';
    return (
      <TouchableOpacity
        style={newsItemStyle.newsItemView}
        onPress={() => {
          push('StockNewsDetails', {news_id: item.id});
        }}>
        <Image
          style={newsItemStyle.newsImage}
          source={imageUrl}
          resizeMode={imageUrlResizeMode}
        />
        <Text style={newsItemStyle.newsTitle} numberOfLines={3}>
          {item.headline}
        </Text>
        <View style={newsItemStyle.newsRowView}>
          <Text style={newsItemStyle.newsSubtitle} numberOfLines={1}>
            {item.source}
          </Text>
          <Text style={newsItemStyle.newsSubtitle} numberOfLines={1}>
            {Utils.getDate(item.datetime, 'DD MMM YYYY', false)}
          </Text>
        </View>

        <View style={newsItemStyle.lineView} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={myStyles.mainView}>
      {loading ? (
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
        <FlatList data={data} renderItem={item => renderNewsItem(item)} />
      )}
    </View>
  );
};
const myStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
});
