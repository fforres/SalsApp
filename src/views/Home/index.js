import React, { Component, StyleSheet, PropTypes, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
import { actions as venuesActions } from '../../utils/Redux/modules/venues';
import VenueCard from '../../components/Venue/Card';
import ref from '../../utils/FireBase';
const mapStateToProps = (store) => {
  return {
    venues : store.venues.venues
  };
}

const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 != r2});

class Home extends Component {
  static propTypes = {
    venueSet: PropTypes.func.isRequired,
    venues: PropTypes.arrayOf(PropTypes.object),
  };

  componentWillMount() {
    const venueSet = this.props.venueSet;
    const venuesRef = ref.child('venues')
    venuesRef.once('value', function (data) {
      const venues = data.val();
      venueSet(venues);
    }, function (err) {
      console.log(err);
    })
  }

  componentDidMount() {
    /*
    const newRef = ref.child('venues').push();
    newRef.set({
      address: 'qwerty',
      name: 'asd',
      values : {
        unique:2000,
      },
    }).then((a)=>{
      console.log('Created Venue', a);
    })
    */
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
            style={styles.listCards}
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
    backgroundColor: '#F5FCFF',
    borderWidth:1 ,
  },
  listCards: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderWidth:1,
    flexDirection: 'column',
  },
})



export default connect(mapStateToProps, accountActions)(
   connect(mapStateToProps, venuesActions)(Home)
 );
