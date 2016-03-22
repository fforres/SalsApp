/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { PropTypes } from 'react-native';
import Facebook from '../../components/Auth/Facebook';
import Home from '../Home';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../components/Redux/modules/account';
const {
  StyleSheet,
  Text,
  View,
  Image,
} = React;

const mapStateToProps = ({account}) => {
  return {
    loggedIn: account.loggedIn,
    userData: account.userData,
  };
};

class Splash extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    store: PropTypes.object.isRequired,
  };
  componentDidMount(){}
  render(){
    const { loggedIn } = this.props;
    console.log(loggedIn)
    // TODO: Change for a middle-splash-screen that on componentDidMount checks for x, y, or z and shows login or application.
    if (loggedIn) {
      return (
        <Home
            {...this.props}
            locales={[{name:'2'},{name:'3'},{name:'34'}]}
        />
      )
    } else {
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
              <Facebook store={this.props.store} />
            </View>
          </Image>
        </View>
      )
    }
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

export default connect(mapStateToProps, accountActions)(Splash)
