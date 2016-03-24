import React, { Component, StyleSheet, PropTypes, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
import { actions as venuesActions } from '../../utils/Redux/modules/venues';
import { Actions } from 'react-native-router-flux'
import StickyHeader from '../../components/NavBar';
import VenueCard from '../../components/Venue/Card';
import ref from '../../utils/FireBase';
const mapStateToProps = (state) => {
  return {
    venues : state.venues.venues,
  };
}

const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 != r2});

class Home extends Component {
  static propTypes = {
    venueCurrentSet: PropTypes.func.isRequired,
    venueCurrentUnset: PropTypes.func.isRequired,
    venueSet: PropTypes.func.isRequired,
    venues: PropTypes.objectOf(PropTypes.object),
  };
  constructor() {
    super();
    this.openProfile = this.openProfile.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  componentDidMount() {
    const venueSet = this.props.venueSet;
    const venuesRef = ref.child('venues')
    venuesRef.once('value', function (data) {
      const venues = data.val();
      venueSet(venues);
    }, function (err) {

    })
  }

  openProfile(data){
    this.props.venueCurrentSet(data);
    Actions.venue();
  }
  renderRow(data) {
    return (
      <VenueCard
          clearProfile={this.props.venueCurrentUnset}
          openProfile={this.openProfile}
          {...data}
      />
    );
  }
  render(){
    const { venues } = this.props;
    const newVenues = Object.keys(venues).map(function(el){
      return venues[el];
    })
    return (
      <View >
        <View style={styles.container}>
          <ListView
              dataSource={ds.cloneWithRows(newVenues)}
              renderRow={this.renderRow}
              style={styles.listCards}
          />
        </View>
        <StickyHeader/>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listCards: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
})

export default connect(mapStateToProps, accountActions)(
   connect(mapStateToProps, venuesActions)(Home)
 );
