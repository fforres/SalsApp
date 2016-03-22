import React, { Component, StyleSheet, PropTypes, View, ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../Redux/modules/account';

const mapStateToProps = (state) => {
  return {};
}

const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 != r2});

class Home extends Component {
  static propTypes = {
    locales: PropTypes.arrayOf(PropTypes.object),
  };
  componentWillMount() {
    // AQUI VA LA LLAMADA A FIREBASE
    // LUEGO LE PASAS LA PROMISE AL ACTION CREATOR
  }
  _renderRow(data) {
    return (
      <View>
        <Text>{data.name}</Text>
      </View>
    );
  }
  render(){
    return (
      <View style={styles.container}>
        <ListView
            dataSource={ds.cloneWithRows(this.props.locales)}
            renderRow={this._renderRow}
        />
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})



export default connect(mapStateToProps, accountActions)(Home);
