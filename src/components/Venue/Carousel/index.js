import React, { Component, StyleSheet, PropTypes, Image, Text, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Dimensions from 'Dimensions';
const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 50;
// TODO: Add parallax
class RNCarousel extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  };
  componentWillMount(){
  }
  render() {
    // const { photos, profileImage } = this.props;
    return (
      <ParallaxScrollView
          backgroundSpeed={50}
          headerBackgroundColor={'transparent'}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          ref={'ParallaxView'}
          renderBackground={() => {
            return (
              <View style={styles.background}>
                <Image source={{uri: this.props.profileImage,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT}}
                />

                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: 'rgba(0,0,0,.4)',
                              height: PARALLAX_HEADER_HEIGHT}}
                />
              </View>
            )
          }}
          renderForeground={() => (
            <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.address}>{this.props.address}</Text>
            </View>
          )}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
      >
        <View style={{ height: 500 }}>
          <Text>Scroll me</Text>
        </View>
      </ParallaxScrollView>
    );
  }
}
let styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.4)',
  },

  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  name:{
    backgroundColor: 'transparent',
    // fontFamily: 'Bebas Neue',
    color: 'white',
    fontSize: 25,
  },
  address: {
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 3,
    marginLeft: 4,
    fontSize: 12,
  },


});

export default RNCarousel;
