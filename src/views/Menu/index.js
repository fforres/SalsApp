/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { Component,  StyleSheet, View, PropTypes, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
import UserProfile from '../../components/User/Profile';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.account.loggedIn,
    userData: state.account.userData,
  };
};

class Menu extends Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
  };
  render(){
    if (this.props.loggedIn) {
      return (
        <View style={styles.container}>
          <UserProfile
              logIn={this.props.logIn}
              logOut={this.props.logOut}
              userData={this.props.userData}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Desconectando tu cuenta...</Text>
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
})

export default connect(mapStateToProps, accountActions)(Menu);
