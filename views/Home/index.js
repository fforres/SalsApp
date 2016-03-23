import React, { Component, StyleSheet, PropTypes, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../components/Redux/modules/account';
import { actions as venuesActions } from '../../components/Redux/modules/venues';
import VenueCard from '../../components/Venue/Card';

const mapStateToProps = (store) => {
  return {
    venues : store.venues.venues
  };
}

const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 != r2});

class Home extends Component {
  static propTypes = {
    venues: PropTypes.arrayOf(PropTypes.object),
  };

  componentWillMount() {
    // AQUI VA LA LLAMADA A FIREBASE
    // LUEGO LE PASAS LA PROMISE AL ACTION CREATOR
  }

  _renderRow(data) {
    return (
      <VenueCard
          {...data}
      />
    );
  }
  render(){
    return (
      <View style={styles.container}>
        <ListView
            dataSource={ds.cloneWithRows(this.props.venues)}
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
  card: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
})



export default connect(mapStateToProps, accountActions)(
   connect(mapStateToProps, venuesActions)(Home)
 );
