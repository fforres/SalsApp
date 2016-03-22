import React, { Component, View, ListView, Text } from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {

  let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 != r2});
  componentWillMount() {
    // AQUI VA LA LLAMADA A FIREBASE
    // LUEGO LE PASAS LA PROMISE AL ACTION CREATOR
  }

  constructor(props) {
    super(props);

  }

  render(){
    return (
      <View>
        <ListView dataSource={ds.cloneWithRows(this.props.locales)} renderRow={_renderRow.bind(this)} />
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

function mapStateToProps({locales}){
  return { locales };
}

export default connect(mapStateToProps)(Home);
