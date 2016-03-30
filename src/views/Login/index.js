/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { PropTypes } from 'react-native';
import FBLogin from '../../components/Auth/Facebook';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
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
  };
};

class Splash extends React.Component {
  static propTypes = {
    isSideBarOpen: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    store: PropTypes.object.isRequired,
  };
  componentDidMount(){}
  render(){
    // TODO: Change for a middle-splash-screen that on componentDidMount checks for x, y, or z and shows login or application.
    return (
      <View style={styles.container}>
        <Image
            source={require('../../Images/background3.jpg')}
            style={styles.backgroundImage}
        >
          <View style={styles.imagesContainer}>
            <Text style={styles.welcome}>
              SalsApp
            </Text>
            <Text style={styles.instructions}>
              lorem ipsum dolor sit PARTY!
            </Text>
            <FBLogin
                userData={this.props.userData}
                logIn={this.props.logIn}
                logOut={this.props.logOut}
            />
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

export default connect(mapStateToProps, accountActions)(Splash);
