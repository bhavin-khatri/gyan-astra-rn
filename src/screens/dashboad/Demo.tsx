import React, {Component} from 'react';
import {View} from 'react-native';
import axios from 'axios';

export class Demo extends Component {
  componentDidMount() {
    // this.getLaravelApi();
  }

  getLaravelApi() {
    axios.get('http://127.0.0.1:8000/testing-api').then(response => {
      console.log('response::', response);
    });
  }
  render() {
    return <View />;
  }
}
