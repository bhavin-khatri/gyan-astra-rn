import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Images from '../../utils/Images';
import {reset} from '../../utils/RootNavigation';
import LottieView from 'lottie-react-native';
import Colors from '../../assests/styles/Colors';
import {Utils} from '../../utils/Utils';

export const Splash = () => {
  let userData: string | null = '';
  const getUser = async () => {
    userData = await Utils.getUserFromLocal();
    if (userData !== '' && userData !== null) {
      reset('Home');
    } else {
      reset('Login');
    }
    console.log('userData::::', userData);
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 2000);
  }, []);

  return (
    <View style={myStyles.ParentView}>
      <View />
      <View>
        <View style={myStyles.titleView}>
          <Text style={myStyles.fontBig}>G</Text>
          <Text style={myStyles.fontSmall}>yan </Text>
          <Text style={myStyles.fontBig}>A</Text>
          <Text style={myStyles.fontSmall}>stra</Text>
        </View>
        <View
          style={{
            height: 180,
            width: 180,
            borderRadius: 200,
            padding: 2,
            backgroundColor: Colors.lightGrey,
            overflow: 'hidden',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            style={{
              height: 150,
              width: 150,
            }}
            source={Images.lottie_splash}
            loop
            resizeMode={'contain'}
            autoPlay={true}
          />
        </View>
      </View>
      <View style={{...myStyles.titleView}}>
        <Text style={myStyles.fontMedium}>F</Text>
        <Text style={myStyles.fontExtraSmall}>{'irst '} </Text>
        <Text style={myStyles.fontMedium}>L</Text>
        <Text style={myStyles.fontExtraSmall}>{'earn  '}</Text>
        <Text style={myStyles.fontMedium}>T</Text>
        <Text style={myStyles.fontExtraSmall}>{'hen '}</Text>
        <Text style={myStyles.fontMedium}>E</Text>
        <Text style={myStyles.fontExtraSmall}>arn</Text>
      </View>
    </View>
  );
};

export const myStyles = StyleSheet.create({
  ParentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  fontBig: {fontSize: 35, color: Colors.primaryColor, fontWeight: '700'},
  fontSmall: {fontSize: 30, color: Colors.black},
  fontMedium: {fontSize: 22, color: Colors.primaryColor},
  fontExtraSmall: {fontSize: 20, color: Colors.black},
});
