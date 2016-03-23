import React, { Component, StyleSheet, PropTypes, View, Text } from 'react-native';

class Home extends Component {
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red',
  },

})



export default Home;
