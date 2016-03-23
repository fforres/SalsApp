import React, { Component, StyleSheet, PropTypes, View, Text, Image} from 'react-native';

// TODO: Add parallax
class venueCard extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  };
  componentWillMount() {
  }
  render(){
    return (
      <View style={styles.card}>
        <Image
            source={{uri: this.props.profileImage}}
            style={styles.backgroundImage}
        >
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.address}>{this.props.address}</Text>
        </Image>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height:170
  },
  backgroundImage: {
    flex: 1,
    height: 170,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center',
  },
  name:{
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 25,
  },
  address: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 15,
  },
})



export default venueCard;
