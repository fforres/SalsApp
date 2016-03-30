/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
const {
  StyleSheet,
  Text,
  View,
} = React;

const mapStateToProps = (state) => {
  return {
    loggedIn: state.account.loggedIn,
    userData: state.account.userData,
  };
};

class Entradas extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You can see your available tickets here
        </Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome:{
    fontSize: 24,
  }
})

export default connect(mapStateToProps, accountActions)(Entradas);
