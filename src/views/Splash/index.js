/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../utils/Redux/modules/account';
// import ref from '../../utils/FireBase';
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
    loggedIn: PropTypes.bool.isRequired,
  };
  componentDidMount(){
    /*
    const newRef = ref.child('schedules').push();
    const newRef2 = ref.child('schedules').push();
    newRef.set({
      day: 'jueves',
      startTime: '19:30',
      endTime: '20:30',
      name: 'salsa cubana',
      code: '',
    }).then(()=>{
      console.log('created')
    })
    newRef2.set({
      day: 'jueves',
      startTime: '20:45',
      endTime: '21:45',
      name: 'bachata',
      code: '',
    }).then(()=>{
      console.log('created')
    })
    ref.child('venues_schedules/-KDZkzkEUCWP7KVwFgrB/' + newRef.key()).set(true);
    ref.child('venues_schedules/-KDZkzkEUCWP7KVwFgrB/' + newRef2.key()).set(true);
    */

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

export default connect(mapStateToProps, accountActions)(Splash);
