import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../assests/styles/Colors';
import Fonts from '../assests/styles/Fonts';
import {goBack, reset} from './RootNavigation';

export class MainContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      leftIcon: '',
      rightIcon: '',
      title: '',
      backPress: false,
      goHome: false,
    };
  }

  componentDidMount() {
    console.log('props::', this.props);
    console.log('props::', this.props.route);
    console.log('props::', this.props.leftIcon);
    this.setState({
      leftIcon: this.props.leftIcon ? this.props.leftIcon : '',
      rightIcon: this.props.rightIcon ? this.props.rightIcon : '',
      title: this.props.title ? this.props.title : '',
      backPress: this.props.backPress ? this.props.backPress : false,
      goHome: this.props.goHome ? this.props.goHome : false,
    });
  }

  onBackPress = () => {
    if (this.state.backPress === true) {
      goBack();
    } else if (this.state.goHome === true) {
      reset('Home');
    }
  };

  render() {
    const {leftIcon, rightIcon, title} = this.state;
    return (
      <View>
        <View style={myStyles.HeaderView}>
          {leftIcon ? (
            <TouchableOpacity onPress={() => this.onBackPress()}>
              <Image
                style={{...myStyles.TopImage, marginEnd: 10}}
                source={leftIcon}
              />
            </TouchableOpacity>
          ) : null}
          <Text style={myStyles.Title}>{title}</Text>

          {rightIcon ? (
            <Image
              style={{...myStyles.TopImage, marginEnd: 10}}
              source={rightIcon}
            />
          ) : (
            <Image
              style={{...myStyles.TopImage, marginEnd: 10}}
              source={rightIcon}
            />
          )}
        </View>
        <View style={myStyles.TopLineView} />
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
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    fontSize: Fonts.size._22px,
    fontFamily: Fonts.name.bold,
    fontWeight: '700',
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.black,
  },
  TopImage: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginStart: 10,
  },
  TopLineView: {
    height: 5,
    backgroundColor: Colors.lightGrey,
  },
});
