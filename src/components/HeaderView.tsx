import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {strings} from '../utils/Strings';
import Images from '../utils/Images';
import Fonts from '../assests/styles/Fonts';
import Colors from '../assests/styles/Colors';
import {ResponsivePixels} from '../assests/styles/ResponsivePixels';

interface HeaderProps {
  backgroundColor?: any;
  headerIconColor?: any;
}
export const HeaderView = (props: HeaderProps) => {
  const {backgroundColor} = props;
  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor || Colors.white}
        barStyle={'dark-content'}
      />
      <View style={myStyles.mainView}>
        <Text style={myStyles.appTitle}>{strings.appName}</Text>
        <TouchableOpacity>
          <Image style={[myStyles.topImage]} source={Images.ic_image_logout} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export const myStyles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ResponsivePixels.size10,
  },
  appTitle: {
    fontSize: ResponsivePixels.size22,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    color: Colors.black,
  },
  topImage: {
    height: ResponsivePixels.size30,
    width: ResponsivePixels.size30,
    borderRadius: ResponsivePixels.size50,
    backgroundColor: Colors.lightGrey,
  },
  topLineView: {
    height: ResponsivePixels.size5,
    backgroundColor: Colors.lightGrey,
  },
});
