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
import {CRYPTO_NEWS} from '../../../utils/ApiConstants';
import axios from 'axios';
import Images from '../../../utils/Images';
import Colors from '../../../assests/styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {push} from '../../../utils/RootNavigation';
import {newsItemStyle} from '../../../assests/styles/NewsItemStyle';

export const News = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCryptoNews();
  }, []);

  function getCryptoNews() {
    setLoading(true);
    let url = Utils.getUrl(CRYPTO_NEWS);
    axios
      .get(url)
      .then(response => {
        if (response) {
          setLoading(false);
          setData(response.data.news);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('error cryptoNews====>', error);
        setLoading(false);
      });
  }

  const renderNewsItem = ({item}: {item: any}) => {
    console.log('item.image-====>', item.imgURL);
    console.log('item.image-====>', typeof item.imgURL);
    let imageUrl =
      item.imgURL && !item.imgURL.includes('undefined')
        ? {uri: item.imgURL}
        : Images.ic_image_placeholder;
    let imageUrlResizeMode =
      item.imgURL && !item.imgURL.includes('undefined') ? 'cover' : 'contain';
    return (
      <TouchableOpacity
        style={newsItemStyle.newsItemView}
        onPress={() => {
          push('NewsDetails', {news_id: item.id});
        }}>
        <Image
          resizeMode={imageUrlResizeMode}
          style={newsItemStyle.newsImage}
          source={imageUrl}
        />
        <Text style={newsItemStyle.newsTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <View style={newsItemStyle.newsRowView}>
          <Text style={newsItemStyle.newsSubtitle} numberOfLines={1}>
            {item.source}
          </Text>
          <Text style={newsItemStyle.newsSubtitle} numberOfLines={1}>
            {Utils.getDate(item.feedDate, 'DD MMM YYYY', true)}
          </Text>
        </View>

        <View style={newsItemStyle.lineView} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={myStyles.mainView}>
      {loading ? (
        <View style={myStyles.loadingView}>
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
  loadingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});
