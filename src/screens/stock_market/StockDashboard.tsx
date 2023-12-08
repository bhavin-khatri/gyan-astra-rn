import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../../assests/styles/Colors';
import {Image, StyleSheet, View} from 'react-native';
import Images from '../../utils/Images';
import Fonts from '../../assests/styles/Fonts';
import {Stock} from './Stock';
import {StockNewsList} from './StockNews/StockNewsList';

export class StockDashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('Screen Dashboard');
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
          name="Stock"
          component={Stock}
          options={{
            tabBarLabel: 'Information',
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      style={myStyles.ImageStyleActive}
                      source={Images.ic_bottom_info_active}
                    />
                  ) : (
                    <Image
                      style={myStyles.ImageStyleInactive}
                      source={Images.ic_bottom_info_inactive}
                    />
                  )}
                </View>
              );
            },
          }}
        />
        {/*<Tabs.Screen*/}
        {/*  name="Prices"*/}
        {/*  component={CoinList}*/}
        {/*  options={{*/}
        {/*    tabBarLabel: 'Prices',*/}
        {/*    tabBarIcon: ({focused}) => {*/}
        {/*      return (*/}
        {/*        <View>*/}
        {/*          {focused ? (*/}
        {/*            <Image*/}
        {/*              style={myStyles.ImageStyleActive}*/}
        {/*              source={Images.ic_bottom_prices_active}*/}
        {/*            />*/}
        {/*          ) : (*/}
        {/*            <Image*/}
        {/*              style={myStyles.ImageStyleInactive}*/}
        {/*              source={Images.ic_bottom_prices_inactive}*/}
        {/*            />*/}
        {/*          )}*/}
        {/*        </View>*/}
        {/*      );*/}
        {/*    },*/}
        {/*  }}*/}
        {/*/>*/}
        <Tabs.Screen
          name="News"
          component={StockNewsList}
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
