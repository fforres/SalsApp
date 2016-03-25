import React, { Component, StyleSheet, PropTypes, View } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
import { actions as venuesActions } from '../../utils/Redux/modules/venues';
import Carousel from '../../components/Venue/Carousel';
import ref from '../../utils/FireBase';
const mapStateToProps = (state) => {
  return {
    currentVenue : state.venues.current,
    currentVenueSchedule: state.venues.currentSchedule,
    venues : state.venues.venues,
  };
}

class Home extends Component {
  static propTypes = {
    currentVenue : PropTypes.object.isRequired,
    currentVenueSchedule : PropTypes.object.isRequired,
  };
  componentDidMount(){
    const {venueCurrentScheduleUnset, venueCurrentScheduleSet, currentVenue} = this.props;
    venueCurrentScheduleUnset();
    const venuesScheduleRef = ref.child('venues_schedules/' + currentVenue.id )
    venuesScheduleRef.once('value', function (data) {
      const venueSchedule = data.val();
      var schedulesRef = ref.child('schedules');
      Object.keys(venueSchedule).map(function(el){
        schedulesRef = schedulesRef.equalTo(el)
      })
      debugger;
      schedulesRef.once('value', function(newData){
        console.log(newData)
        debugger;
      })
      venueCurrentScheduleSet(venueSchedule);
    }, function (err) {
      console.log(err);
    })


  }
  render(){
    return (
      <View style={styles.container}>
        <Carousel
            {...this.props.currentVenue}
            {...this.props.currentVenueSchedule}
            photos={[]}
        />
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})


export default connect(mapStateToProps, accountActions)(
   connect(mapStateToProps, venuesActions)(Home)
 );
