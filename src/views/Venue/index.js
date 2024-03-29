import React, { Component, StyleSheet, PropTypes, View } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
import { actions as venuesActions } from '../../utils/Redux/modules/venues';
import { actions as notificationActions } from '../../utils/Redux/modules/notifications';
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
    notificationAdd: PropTypes.func.isRequired,
    venueCurrentScheduleSet: PropTypes.func.isRequired,
    venueCurrentScheduleUnset: PropTypes.func.isRequired,
  };
  componentDidMount(){
    const {venueCurrentScheduleUnset, venueCurrentScheduleSet, currentVenue} = this.props;
    venueCurrentScheduleUnset();
    const venuesScheduleRef = ref.child(`schedules/${currentVenue.id}`)
    venuesScheduleRef.orderByChild('startTime').once('value', function (data) {
      const venueSchedule = data.val();
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
            notificationAdd={this.props.notificationAdd}
            photos={[]}
            schedule={this.props.currentVenueSchedule}
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
   connect(mapStateToProps, venuesActions)(
     connect(mapStateToProps, notificationActions)(Home)
   )
 );
