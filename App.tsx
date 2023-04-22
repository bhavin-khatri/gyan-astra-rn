/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from './src/components/Dashboad/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {NewsDetails} from './src/components/Dashboad/CRYPTO/News/NewsDetails';
import {navigationRef} from './src/utils/RootNavigation';
import {CoinDetails} from './src/components/Dashboad/CRYPTO/Prices/CoinDetails';
import {Stock} from './src/components/Dashboad/Stock Market/Stock';
import {PI} from './src/components/Dashboad/PI Network/PI';
import {NFT} from './src/components/Dashboad/NFT/NFT';
import {Crypto} from './src/components/Dashboad/CRYPTO/Crypto';
import {Splash} from './src/components/Splash/Splash';
import {Register} from './src/components/Authentication/Register';
import {Login} from './src/components/Authentication/Login';
import {GACardDetails} from './src/components/GA Virtual Card/GACardDetails';
import {CryptoDashboard} from './src/components/Dashboad/CRYPTO/CryptoDashboard';
import {Home} from './src/components/Dashboad/Home';
import {StockDashboard} from './src/components/Dashboad/Stock Market/StockDashboard';
import {MainContainer} from './src/utils/MainContainer';
import {NFTList} from './src/components/Dashboad/NFT/NFTList';
import {StockNewsDetails} from './src/components/Dashboad/Stock Market/StockNews/StockNewsDetails';
import {Demo} from './src/components/Dashboad/Demo';
import {firebase} from '@react-native-firebase/messaging';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
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
    </NavigationContainer>
  );
};

export default App;
