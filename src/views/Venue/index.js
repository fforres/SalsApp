import React, { Component, StyleSheet, PropTypes, View } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
import { actions as venuesActions } from '../../utils/Redux/modules/venues';
import Carousel from '../../components/Venue/Carousel';
const mapStateToProps = (state) => {
  console.log('venue');
  console.log(state);
  return {
    currentVenue : state.venues.current,
    venues : state.venues.venues,
  };
}

class Home extends Component {
  static propTypes = {
    currentVenue : PropTypes.object.isRequired,
  };

  render(){
    return (
      <View style={styles.container}>
        <Carousel
            {...this.props.currentVenue}
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
