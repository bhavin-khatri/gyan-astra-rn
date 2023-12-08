import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Crypto} from '../screens/crypto/Information/Crypto';
import {News} from '../screens/crypto/News/News';
import {MyProfile} from '../screens/dashboad/MyProfile';
import Colors from '../assests/styles/Colors';
import {ResponsivePixels} from '../assests/styles/ResponsivePixels';
import {StockNewsList} from '../screens/stock_market/StockNews/StockNewsList';
import Images from '../utils/Images';
import LottieView from 'lottie-react-native';

const tabs = [
  {
    key: 'Crypto',
    title: 'Crypto',
    component: News,
    image: Images.lottie_crypto2,
  },
  {
    key: 'Stock',
    title: 'Stock Market',
    component: StockNewsList,
    image: Images.lottie_sip,
  },
  {key: 'News', title: 'NFT', component: News, image: Images.lottie_nft},
  {
    key: 'Profile',
    title: 'PI Network',
    component: MyProfile,
    image: Images.lottie_pi,
  },
];

export class CategoryTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: tabs[0].key,
    };
  }

  renderContent() {
    const {selectedTab} = this.state;
    const selectedComponent = tabs.find(
      tab => tab.key === selectedTab,
    )?.component;
    return selectedComponent ? React.createElement(selectedComponent) : null;
  }

  renderTab = ({item}) => {
    const {selectedTab} = this.state;
    return (
      <TouchableOpacity
        style={[
          myStyles.tabBarItem,
          {
            borderBottomColor:
              selectedTab === item.key ? Colors.black : Colors.white,
            borderBottomWidth:
              selectedTab === item.key ? ResponsivePixels.size4 : 0,
          },
        ]}
        onPress={() => this.setState({selectedTab: item.key})}>
        <View>
          <LottieView
            style={[
              myStyles.ImageSize50,
              {marginBottom: ResponsivePixels.size2},
            ]}
            source={item.image}
            loop
            resizeMode={'contain'}
            autoPlay={true}
          />
        </View>
        <Text
          style={{
            color: selectedTab === item.key ? Colors.black : Colors.grey,
            letterSpacing: 0.5,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {/* Custom Tab Bar using FlatList */}

        <FlatList
          data={tabs}
          renderItem={this.renderTab}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={myStyles.tabList}
        />

        {/* Render Content Based on Selected Tab */}
        <View style={{flex: 1}}>{this.renderContent()}</View>
      </View>
    );
  }
}

const myStyles = {
  tabBar: {},
  tabList: {
    flexGrow: 0,
    marginHorizontal: ResponsivePixels.size10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginEnd: ResponsivePixels.size30,
    paddingVertical: ResponsivePixels.size10,
  },
  ImageSize50: {
    height: ResponsivePixels.size20,
    width: ResponsivePixels.size20,
    borderRadius: ResponsivePixels.size10,
  },
};
