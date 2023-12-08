import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ResponsivePixels} from '../../assests/styles/ResponsivePixels';
import {News} from './News/News';
import {Crypto} from './Information/Crypto';
import {CoinList} from './Prices/CoinList';

interface IProps {}
interface IState {}
const tabs = [
  {key: 'Crypto', title: 'Information'},
  {key: 'Prices', title: 'Crypto Prices'},
  {key: 'News', title: 'Crypto News', id: 3},
];
export class CryptoDashboard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    console.log('Screen Dashboard');
  }

  renderTab = ({item}: {item: any}) => {
    const renderComponent = (id: number) => {
      switch (id) {
        case 1:
          return <Crypto />;
        case 2:
          return <CoinList />;
        case 3:
          return <News />;
      }
    };
    return (
      <TouchableOpacity
        style={[myStyles.tabBarItem]}
        onPress={() => this.setState({selectedTab: item.key})}>
        <Text
          style={{
            letterSpacing: 0.5,
          }}>
          {item.title}
        </Text>
        <View style={{flex: 1}}>{renderComponent(item.id)}</View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={myStyles.ParentView}>
        <FlatList
          data={tabs}
          renderItem={this.renderTab}
          keyExtractor={item => item.key}
          showsHorizontalScrollIndicator={false}
          style={myStyles.tabList}
        />
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  ParentView: {
    flex: 1,
    flexDirection: 'column',
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginEnd: ResponsivePixels.size30,
    paddingVertical: ResponsivePixels.size10,
  },
  tabList: {
    flex: 1,
    // flexGrow: 0,
    // marginHorizontal: ResponsivePixels.size10,
  },
});
