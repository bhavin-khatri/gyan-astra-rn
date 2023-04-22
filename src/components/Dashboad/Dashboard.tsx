import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  AnimatedTabBarNavigator,
  DotSize,
} from 'react-native-animated-nav-tab-bar';

import {CoinList} from './CRYPTO/Prices/CoinList';
import {Home} from './Home';
import {News} from './CRYPTO/News/News';
import {Prediction} from './Prediction';
import Colors from '../../utils/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fonts from '../../utils/Fonts';
import Images from '../../utils/Images';
import {MyProfile} from './MyProfile';
import {Stock} from './Stock Market/Stock';
import {firebase} from '@react-native-firebase/messaging';

export class Dashboard extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    console.log('Screen Dashboard');
    const fcmToken = async () => firebase.messaging().getToken();
    console.log('fcmToken====>', await fcmToken());
  }

  render() {
    //const Tabs = AnimatedTabBarNavigator();
    const Tabs = createBottomTabNavigator();
    let isFocused = false;
    return (
      <Tabs.Navigator
        // default configuration from React Navigation
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
          tabBarStyle: {...myStyles.TabView},
          tabBarLabelStyle: {...myStyles.LabelStyle},
        }}>
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      style={myStyles.ImageStyleActive}
                      source={Images.ic_bottom_home_active}
                    />
                  ) : (
                    <Image
                      style={myStyles.ImageStyleInactive}
                      source={Images.ic_bottom_home_inactive}
                    />
                  )}
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="Prices"
          component={CoinList}
          options={{
            tabBarLabel: 'Prices',
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      style={myStyles.ImageStyleActive}
                      source={Images.ic_bottom_prices_active}
                    />
                  ) : (
                    <Image
                      style={myStyles.ImageStyleInactive}
                      source={Images.ic_bottom_prices_inactive}
                    />
                  )}
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="News"
          component={News}
          options={{
            tabBarLabel: 'News',
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      style={myStyles.ImageStyleActive}
                      source={Images.ic_bottom_news_active}
                    />
                  ) : (
                    <Image
                      style={myStyles.ImageStyleInactive}
                      source={Images.ic_bottom_news_inactive}
                    />
                  )}
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      style={myStyles.ImageStyleActive}
                      source={Images.ic_bottom_user_active}
                    />
                  ) : (
                    <Image
                      style={myStyles.ImageStyleInactive}
                      source={Images.ic_bottom_user_inactive}
                    />
                  )}
                </View>
              );
            },
          }}
        />
      </Tabs.Navigator>
    );
  }
}

const myStyles = StyleSheet.create({
  ParentView: {
    flex: 1,
    flexDirection: 'column',
  },
  TabView: {
    backgroundColor: Colors.white,
    position: 'absolute',
    shadow: false,
    borderRadius: 5,
    padding: 5,
    zIndex: 100, //
    bottom: 0,
  },
  LabelStyle: {
    fontSize: Fonts.size._12px,
    fontWeight: '500',
  },
  ImageStyleInactive: {
    height: 20,
    width: 20,
    tintColor: Colors.grey,
  },
  ImageStyleActive: {
    height: 25,
    width: 25,
    tintColor: Colors.primaryColor,
  },
});
