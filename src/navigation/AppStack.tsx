import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Splash} from '../screens/Splash/Splash';
import {Login} from '../screens/auth/Login';
import {Register} from '../screens/auth/Register';
import {Home} from '../screens/dashboad/Home';
import {Dashboard} from '../screens/dashboad/Dashboard';
import {CryptoDashboard} from '../screens/crypto/CryptoDashboard';
import {StockDashboard} from '../screens/stock_market/StockDashboard';
import {MainContainer} from '../utils/MainContainer';
import {NewsDetails} from '../screens/crypto/News/NewsDetails';
import {StockNewsDetails} from '../screens/stock_market/StockNews/StockNewsDetails';
import {CoinDetails} from '../screens/crypto/Prices/CoinDetails';
import {GACardDetails} from '../screens/virtual_card/GACardDetails';
import {Stock} from '../screens/stock_market/Stock';
import {PI} from '../screens/pi_network/PI';
import {NFT} from '../screens/nft/NFT';
import {NFTList} from '../screens/nft/NFTList';
import {Crypto} from '../screens/crypto/Information/Crypto';
import {Demo} from '../screens/dashboad/Demo';

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Dashboard">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CryptoDashboard" component={CryptoDashboard} />
      <Stack.Screen name="StockDashboard" component={StockDashboard} />
      <Stack.Screen name="MainContainer" component={MainContainer} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen name="StockNewsDetails" component={StockNewsDetails} />
      <Stack.Screen name="CoinDetails" component={CoinDetails} />
      <Stack.Screen name="GACardDetails" component={GACardDetails} />
      <Stack.Screen name="Stock" component={Stock} />
      <Stack.Screen name="PI" component={PI} />
      <Stack.Screen name="NFT" component={NFT} />
      <Stack.Screen name="NFTList" component={NFTList} />
      <Stack.Screen name="Crypto" component={Crypto} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Demo" component={Demo} />
    </Stack.Navigator>
  );
};
