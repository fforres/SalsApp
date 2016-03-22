import React, { Component, View, ListView, Text } from 'react-native';

class Home extends Component {
  render(){
    return (
      <View>
        <ListView dataSource={this.state.dataSource} renderRow={_renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(data) {
    return (
      <View>
        <Text>{data.name}</Text>
      </View>
    );
  }
}
