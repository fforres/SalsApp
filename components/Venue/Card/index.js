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
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
})



export default Home;
