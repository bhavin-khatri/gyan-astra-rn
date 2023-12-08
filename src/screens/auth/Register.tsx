import {Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Colors from '../../assests/styles/Colors';
import Images from '../../utils/Images';
import LottieView from 'lottie-react-native';
import {navigate, reset} from '../../utils/RootNavigation';
import {Utils} from '../../utils/Utils';

export const Register = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userCPassword, setUserCPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState(Images.ic_image_password_show);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  const [rightIconConfirm, setRightIconConfirm] = useState(
    Images.ic_image_password_show,
  );

  const handlePasswordVisibility = () => {
    if (rightIcon === Images.ic_image_password_show) {
      setRightIcon(Images.ic_image_password_hide);
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === Images.ic_image_password_hide) {
      setRightIcon(Images.ic_image_password_show);
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleConfirmPasswordVisibility = () => {
    if (rightIconConfirm === Images.ic_image_password_show) {
      setRightIconConfirm(Images.ic_image_password_hide);
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (rightIconConfirm === Images.ic_image_password_hide) {
      setRightIconConfirm(Images.ic_image_password_show);
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  const validateFields = async () => {
    if (userEmail === '' || userEmail === null) {
      Utils.showToast('Please Enter Email');
    } else if (userPassword === '' || userPassword === null) {
      Utils.showToast('Please Enter Password');
    } else if (userCPassword === '' || userCPassword === null) {
      Utils.showToast('Please Enter Confirm Password');
    } else if (userCPassword !== userPassword) {
      Utils.showToast('Confirm Password Does Not Match');
    } else {
      await createUser();
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const createUser = async () => {
    auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(async () => {
        ToastAndroid.show('Welcome To Gyan Astra', 1000);
        Utils.setUserInLocal(userEmail);
        reset('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('Email is already register please login', 1000);
        } else if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Enter Valid Email Address', 1000);
        } else if (error.code === 'auth/weak-password') {
          ToastAndroid.show('Password should be at least 6 characters', 1000);
        } else {
          ToastAndroid.show('Something Went Wrong!', 1000);
        }
      });
  };

  return (
    <View style={myStyles.parentView}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primaryColor,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <LottieView
          style={{
            height: 150,
            width: 150,
          }}
          source={Images.lottie_register2}
          loop
          resizeMode={'contain'}
          autoPlay={true}
        />
        <Text style={myStyles.ButtonLabel}>Create</Text>
        <Text style={myStyles.ButtonLabel}>Account</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: -150,
          backgroundColor: Colors.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        {/*<View style={myStyles.ImageTextInputView}>*/}
        {/*  <Image*/}
        {/*    style={myStyles.SmallImage}*/}
        {/*    tintColor={Colors.grey}*/}
        {/*    source={Images.ic_image_user_small}*/}
        {/*  />*/}
        {/*  <TextInput*/}
        {/*    style={myStyles.TextInput}*/}
        {/*    placeholderTextColor={Colors.grey}*/}
        {/*    placeholder={'Name'}*/}
        {/*    value={userName}*/}
        {/*    onChangeText={text => setUserName(text)}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={myStyles.ImageTextInputView}>
          <Image
            style={myStyles.SmallImage}
            tintColor={Colors.grey}
            source={Images.ic_image_email_small}
          />
          <TextInput
            style={myStyles.TextInput}
            placeholderTextColor={Colors.grey}
            placeholder={'Email'}
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
        </View>
        <View style={myStyles.ImageTextInputView}>
          <Image
            style={myStyles.SmallImage}
            tintColor={Colors.grey}
            source={Images.ic_image_password_small}
          />

          <TextInput
            style={myStyles.TextInput}
            placeholderTextColor={Colors.grey}
            placeholder={'Password'}
            secureTextEntry={passwordVisibility}
            value={userPassword}
            onChangeText={text => setUserPassword(text)}
          />
          {userPassword !== '' ? (
            <TouchableOpacity onPress={() => handlePasswordVisibility()}>
              <Image
                style={myStyles.SmallImage}
                tintColor={Colors.grey}
                source={rightIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={myStyles.ImageTextInputView}>
          <Image
            style={myStyles.SmallImage}
            tintColor={Colors.grey}
            source={Images.ic_image_password_small}
          />
          <TextInput
            style={myStyles.TextInput}
            placeholderTextColor={Colors.grey}
            placeholder={'Confirm Password'}
            secureTextEntry={confirmPasswordVisibility}
            value={userCPassword}
            onChangeText={text => setUserCPassword(text)}
          />
          {userCPassword !== '' ? (
            <TouchableOpacity onPress={() => handleConfirmPasswordVisibility()}>
              <Image
                style={myStyles.SmallImage}
                tintColor={Colors.grey}
                source={rightIconConfirm}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={myStyles.Button}
          onPress={() => {
            validateFields();
          }}>
          <Text style={myStyles.ButtonLabel}>Register</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{...myStyles.lineView, marginEnd: 10}} />
          <Text style={{color: Colors.grey}}>OR</Text>
          <View style={{...myStyles.lineView, marginStart: 10}} />
        </View>
        <TouchableOpacity
          style={{
            ...myStyles.Button,
            backgroundColor: Colors.white,
            borderColor: Colors.lightGrey,
            borderWidth: 2,
            elevation: 4,
          }}
          onPress={() => {
            navigate('Login');
          }}>
          <Text style={{...myStyles.ButtonLabel, color: Colors.grey}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const myStyles = StyleSheet.create({
  parentView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  TextInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: Colors.black,
  },
  SmallImage: {
    height: 20,
    width: 20,
  },
  Button: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
  },
  ButtonLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  ImageTextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderBottomColor: Colors.newLightGrey,
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderWidth: 0.5,
  },
  lineView: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: Colors.newLightGrey,
    height: 1,
  },
});
