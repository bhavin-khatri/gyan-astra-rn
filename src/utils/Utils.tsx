import {BASE_URL2, USER_SAVED} from './ApiConstants';
import {Component} from 'react';
import moment from 'moment';
import {Alert, AsyncStorage, ToastAndroid} from 'react-native';

export class Utils extends Component {
  static getConvertAmount(amount, decimalPoint) {
    let roundedNum = Math.round(amount * 100) / 100;
    return roundedNum.toFixed(decimalPoint);
  }

  static getUrl(endpoint: string) {
    let url = BASE_URL2 + endpoint;
    return url;
  }

  static setUserInLocal(userMail: string) {
    AsyncStorage.setItem(USER_SAVED.USER, userMail).then(async ar => {});
  }

  static getUserFromLocal = async () => {
    let data = await AsyncStorage.getItem(USER_SAVED.USER);
    console.log('data::::', data);
    return data;
  };

  static createAlert = (onOk: () => void) =>
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => onOk()},
    ]);

  static getDate(
    timeStamp: any,
    dateFormat = 'DD-MM-YYYY HH:MM',
    milis = false,
  ) {
    let date = !milis ? timeStamp * 1000 : timeStamp;
    return moment(date).format(dateFormat);
  }

  static getPriceChange(price, price_perc, isNegative) {
    let changeInPrice = (price * price_perc) / 100;
    let finalPrice = price + changeInPrice;
    console.log('changeInPrice:::', changeInPrice);
    console.log('finalPrice:::', finalPrice);
  }

  static showToast(message: string) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50,
    );
  }
}
