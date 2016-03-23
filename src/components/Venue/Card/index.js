import React, { Component, StyleSheet, PropTypes, View, Text, Image, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
const window = Dimensions.get('window');

// TODO: Add parallax
class venueCard extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  };
  componentWillMount() {
  }
  onPressCard(){
    const _this = this;
    console.log(_this);
  }
  render(){
    return (
        <View style={styles.card}>
          <View style={styles.fullSize}>
            <Image
                source={{uri: this.props.profileImage}}
                style={styles.backgroundImage}
            />
          </View>
          <View style={[styles.welcome, styles.fullSize]}>
            <View>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.address}>{this.props.address}</Text>
            </View>
            <View style={[styles.buttonRight]}>
              <TouchableHighlight
                  onPress={this.onPressCard}
                  style={[styles.flatButtonWrapper]}
                  underlayColor={'rgba(150,150,150,0.4)'}
              >
                <View style={[styles.flatButton]}>
                  <Text style={[styles.flatButtonText]}>
                    VER
                  </Text>
                </View>
              </TouchableHighlight>

            </View>
          </View>
        </View>
    );
  }
}

let styles = StyleSheet.create({
  card: {
    flex: 1,
    height:window.height/3.2,
  },
  fullSize: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 100,
  },
  welcome: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    fontSize: 15,
  },
  flatButtonWrapper: {
    width: window.width/6,
  },
  flatButton: {
    borderColor: 'rgba(141,164,175,1)',
    borderWidth: 2,
    padding: 4,
  },
  flatButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});

export default venueCard;
