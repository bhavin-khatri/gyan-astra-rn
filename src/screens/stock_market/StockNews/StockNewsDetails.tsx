import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Utils} from '../../../utils/Utils';
import {STOCK_MARKET} from '../../../utils/ApiConstants';
import axios from 'axios';
import Fonts from '../../../assests/styles/Fonts';
import Colors from '../../../assests/styles/Colors';
import Images from '../../../utils/Images';
import {goBack} from '../../../utils/RootNavigation';

export class StockNewsDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      news_item: [],
      news_desc: '',
      news_image: '',
      news_title: '',
      news_date: '',
      news_source: '',
      news_link: '',
      canShowContent: false,
    };
  }
  componentDidMount() {
    this.setState({id: this.props.route.params.news_id}, () => {
      this.getStockNews();
      console.log('news_id::::', this.state.id);
    });
  }

  getStockNews() {
    this.setState({loading: true});
    let url =
      STOCK_MARKET.STOCK_BASE_URL +
      STOCK_MARKET.STOCK_NEWS_ENDPOINT +
      STOCK_MARKET.STOCK_AUTH_KEY;
    console.log('urlStock:::', url);
    axios.get(url).then(response => {
      console.log('response==>', response.data);
      if (response !== null) {
        this.setState({news_item: response.data}, () => {
          this.getOnlyNewsForId();
        });
      } else {
        this.setState({loading: false});
      }
    });
  }

  getOnlyNewsForId() {
    let itemNews = [];
    this.state.news_item.map(item => {
      if (item.id === this.state.id) {
        itemNews.push(item);
        this.setState({news_item: itemNews}, () => {
          this.state.news_item.map(item => {
            this.setState(
              {
                news_desc: item.summary,
                news_image: item.image,
                news_title: item.headline,
                news_date: item.datetime,
                news_source: item.source,
                news_link: item.url,
                canShowContent: true,
              },
              () => {
                console.log('------------------------------');
                console.log('news_title:', this.state.news_title);
                console.log('news_desc:', this.state.news_desc);
                console.log('news_image:', this.state.news_image);
                console.log('news_date:', this.state.news_date);
                console.log('news_source:', this.state.news_source);
                console.log('news_link:', this.state.news_link);
                console.log('------------------------------');
              },
            );
          });
        });
      }
    });
  }

  render() {
    let dot = '\u25CF';
    //other dots :--2B24, 25CF, 26AB
    console.log('dot==', dot);
    let title = this.state.news_title ? this.state.news_title : '';
    let description = this.state.news_desc ? this.state.news_desc : '';
    // to remove unnecessary symbols from description
    description = description.replace(/[^a-zA-Z ]/g, '');
    let image = this.state.news_image ? this.state.news_image : '';
    let date = this.state.news_date ? this.state.news_date : '';
    let source = this.state.news_source ? this.state.news_source : '';
    let link = this.state.news_link ? this.state.news_link : '';
    return (
      <View style={myStyles.MainParentView}>
        <View style={myStyles.HeaderView}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}>
            <Image style={myStyles.BackImage} source={Images.ic_image_back} />
          </TouchableOpacity>
          <Text style={myStyles.Title}>News Details</Text>
          <Image
            style={{...myStyles.BackImage, opacity: 0}}
            source={Images.ic_image_back}
          />
        </View>
        <View style={myStyles.LineView} />
        {this.state.canShowContent && this.state.canShowContent === true ? (
          <View>
            <ImageBackground
              style={myStyles.Image}
              source={Images.ic_image_placeholder}
              resizeMode={'center'}>
              <Image style={myStyles.Image} source={{uri: image}} />
            </ImageBackground>

            <View style={myStyles.BoxView}>
              <Text style={myStyles.NewsTitle}>{title}</Text>
              <View style={myStyles.RowView}>
                <Text style={myStyles.SourceText}>{source}</Text>
                <Text style={myStyles.DateText}>
                  {Utils.getDate(date, 'DD MMM YYYY', false)}
                </Text>
              </View>
            </View>
            <View style={myStyles.DescriptionView}>
              <Text style={myStyles.Description}>{description}</Text>
              {description !== undefined &&
              description !== null &&
              description !== '' ? (
                <Text
                  style={myStyles.LinkBlueText}
                  onPress={() => Linking.openURL(link)}>
                  Read more
                </Text>
              ) : (
                <Text
                  style={myStyles.LinkBlueText}
                  onPress={() => Linking.openURL(link)}>
                  Click to Read Description
                </Text>
              )}
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
  RowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  DescriptionView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  LinkBlueText: {
    color: Colors.blue,
    fontWeight: '500',
    marginHorizontal: 10,
    fontSize: Fonts.size._16px,
  },
  LinkBlackText: {
    color: Colors.black,
    fontSize: Fonts.size._14px,
    marginStart: 4,
  },
  LineView: {
    height: 5,
    backgroundColor: Colors.lightGrey,
  },
  ParentView: {
    marginVertical: 10,
  },
  ParentTitle: {
    fontSize: Fonts.size._14px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'center',
    color: Colors.black,
  },
  Image: {
    height: 200,
    alignSelf: 'center',
    width: '100%',
  },
  BackImage: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },

  BoxView: {
    marginHorizontal: 15,
    marginTop: -25,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: Colors.red,
    padding: 10,
    paddingBottom: 0,
  },

  Title: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'center',
    color: Colors.black,
    marginHorizontal: 10,
  },

  NewsTitle: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: Colors.black,
    marginHorizontal: 10,
  },
  SourceText: {
    fontSize: Fonts.size._12px,
    fontFamily: Fonts.name.bold,
    alignSelf: 'flex-start',
    color: Colors.grey,
  },
  DateText: {
    fontSize: Fonts.size._12px,
    fontFamily: Fonts.name.medium,
    marginStart: 10,
    color: Colors.grey,
  },
  Description: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.regular,
    fontWeight: '200',
    color: Colors.black,
    marginHorizontal: 10,
  },
  Link: {
    fontSize: Fonts.size._10px,
    fontFamily: Fonts.name.regular,
    fontWeight: '200',
    color: Colors.black,
    marginHorizontal: 10,
  },
});
