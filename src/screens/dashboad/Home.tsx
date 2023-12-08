import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../utils/Images';
import Colors from '../../assests/styles/Colors';
import Fonts from '../../assests/styles/Fonts';
import LottieView from 'lottie-react-native';
import {navigate, reset} from '../../utils/RootNavigation';
import {HOME_SCREEN, OTHER_ASTRAS} from '../../utils/ApiConstants';
import {Utils} from '../../utils/Utils';
import auth from '@react-native-firebase/auth';
import {ResponsivePixels} from '../../assests/styles/ResponsivePixels';
import {HeaderView} from '../../components/HeaderView';
import {CategoryTabNavigator} from '../../navigation/CategoryTabNavigator';

interface IState {
  otherAstras: Array<any>;
}
interface IProps {}
export class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount = async () => {};

  renderAstraItem({item}: {item: any}) {
    return (
      <TouchableOpacity
        onPress={() => item.onClick()}
        style={myStyles.astraMainView}>
        <LottieView
          style={[myStyles.ImageSize50, {marginBottom: ResponsivePixels.size2}]}
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
      .then((_response: any) => {
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

  render() {
    return (
      <View style={myStyles.ParentView}>
        <HeaderView />
        <CategoryTabNavigator />
        {/*<ScrollView style={myStyles.BodyView}>*/}
        {/*  <Text style={myStyles.ReferEarnLabel}>*/}
        {/*    {HOME_SCREEN.modernEraAstraS}*/}
        {/*  </Text>*/}
        {/*  <FlatList*/}
        {/*    numColumns={4}*/}
        {/*    data={this.state.otherAstras}*/}
        {/*    renderItem={item => this.renderAstraItem(item)}*/}
        {/*  />*/}
        {/*</ScrollView>*/}
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

  astraMainView: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: ResponsivePixels.size10,
    marginVertical: ResponsivePixels.size10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BodyView: {
    flex: 1,
    flexDirection: 'column',
  },
  ReferEarnLabel: {
    fontSize: Fonts.size._16px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: ResponsivePixels.size10,
    marginHorizontal: ResponsivePixels.size10,
    color: Colors.black,
  },
  FontSize14: {
    fontSize: Fonts.size._14px,
    color: Colors.black,
    fontFamily: Fonts.name.bold,
  },
  ImageSize50: {
    height: ResponsivePixels.size50,
    width: ResponsivePixels.size50,
    borderRadius: ResponsivePixels.size25,
  },
});
