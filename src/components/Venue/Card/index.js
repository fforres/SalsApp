import React, { Component, StyleSheet, PropTypes, View, Text } from 'react-native';

class venueCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };
  componentWillMount() {
  }
  render(){
    return (
      <View style={styles.card}>
        <Text>{this.props.name}</Text>
        <Text>asda</Text>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red',
  },

})



export default venueCard;
