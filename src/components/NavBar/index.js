import React, { Component, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux'
const Icon = require('react-native-vector-icons/FontAwesome');

class NavBar extends Component {
  constructor() {
    super();
  }
  render(){
    return (
      <View style={styles.fixedSection}>
        <Icon
            name={'bars'}
            onPress={() => {Actions.menu()}}
            style={styles.fixedSectionText}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  fixedSection: {
    height: 50,
    position:'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginLeft: 2,
    marginTop: 8,
    marginRight: 0,
  },
  fixedSectionText: {
    padding: 15,
    color: 'white',
    fontSize: 26,
  },
})

export default NavBar;
