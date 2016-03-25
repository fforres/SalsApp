import React, { Component, StyleSheet, PropTypes, Text, View } from 'react-native';
import MapView from 'react-native-maps';

const LATITUDE_DELTA = 0.0098;
const LONGITUDE_DELTA = 0.0098;

class Gmap extends Component {
  static propTypes = {
    geo: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    const _this = this;
    setTimeout(function () {
      _this.refs.marker.showCallout();
    }, 1000);
  }
  render(){
    return (
      <MapView
          initialRegion={{
            latitude: this.props.geo.lat+0.001,
            longitude: this.props.geo.long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.map}
      >
        <MapView.Marker
            coordinate={{
              latitude: this.props.geo.lat,
              longitude: this.props.geo.long,
            }}
            ref="marker"
        >
          <MapView.Callout style={styles.callout}>
            <View>
              <Text>{this.props.name}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    )
  }
}

/*
<MapView.Marker
    coordinate={marker.latlng}
    title={marker.title}
    description={marker.description}
/>
*/


const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor: 'blue',
  },
  callout: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
  },
});
export default Gmap;
