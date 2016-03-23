/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { actions as accountActions } from '../../utils/Redux/modules/account';
import { actions as sideBarActions } from '../../utils/Redux/modules/sidebar';
const {
  StyleSheet,
  Text,
  View,
  Image,
} = React;

const mapStateToProps = (state) => {
  return {
    loggedIn: state.account.loggedIn,
    userData: state.account.userData,
    isSideBarOpen: state.sidebar.isOpen,
  };
};

class Splash extends React.Component {
  static propTypes = {
    isSideBarOpen: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };
  componentDidMount(){
    this.checkLogged(this.props.loggedIn);
  }
  checkLogged(status){
    if (status) {
      Actions.home();
    } else {
      Actions.login();
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Image
            source={require('../../Images/background3.jpg')}
            style={styles.backgroundImage}
        >
          <View style={styles.imagesContainer}>
            <Text style={styles.welcome}>
              SalsApp!
            </Text>
            <Text style={styles.instructions}>
              Loading!...
            </Text>
          </View>
        </Image>
      </View>
    )
  }
}

Splash.propTypes = {
  instructions: PropTypes.string,
}

Splash.defaultProps = {
  instructions: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default
connect(mapStateToProps, accountActions)(connect(mapStateToProps, sideBarActions)(Splash))
