import React, { Component, StyleSheet, PropTypes, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../components/Redux/modules/account';
import VenueCard from '../../components/Venue/Card';
import SideMenu from 'react-native-side-menu';
import SideMenuContent from '../../components/SideBar/Content';

const mapStateToProps = () => {
  return {};
}

const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 != r2});

class Home extends Component {
  static propTypes = {
    locales: PropTypes.arrayOf(PropTypes.object),
    navigator: PropTypes.any
  };

  componentWillMount() {
    console.log(this.props);
    // AQUI VA LA LLAMADA A FIREBASE
    // LUEGO LE PASAS LA PROMISE AL ACTION CREATOR
  }
  onMenuItemSelected(item){
    console.log(item);
  }

  _renderRow(data) {
    return (
      <VenueCard
          {...data}
      />
    );
  }
  render(){
    const menu = ( <SideMenuContent
        navigator={this.props.navigator}
        onItemSelected={this.onMenuItemSelected} />
    );
    return (
      <SideMenu
          isOpen
          menu={menu}
      >
        <View style={styles.container}>
          <ListView
              dataSource={ds.cloneWithRows(this.props.locales)}
              renderRow={this._renderRow}
          />
        </View>
      </SideMenu>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
})



export default connect(mapStateToProps, accountActions)(Home);
