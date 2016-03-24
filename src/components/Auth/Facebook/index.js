import React, { Component, PropTypes } from 'react-native';
import FBLogin from 'react-native-facebook-login';
import { FBLoginManager } from 'NativeModules';
import ref from '../../../utils/FireBase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { actions as accountActions } from '../../../utils/Redux/modules/account';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.account.loggedIn,
    userData: state.account.userData,
  };
};

class Login extends Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.loginUser = this.loginUser.bind(this);
  }
  componentDidMount(){}
  loginUser(fbInfo, fbAuthData, authData, key){
    this.props.logIn({
      fbAuthData,
      fbInfo,
      authData,
      Id:key,
    });
    Actions.home();
  }
  createUser(fbInfo, fbAuthData, authData){
    const { loginUser } = this;
    // Creating a new user
    const newRef = ref.child('userData').push();
    // Obtaining user new key
    const key = newRef.key();
    // Saving user data
    newRef.set({
      fbId: fbInfo.id,
      email: authData.facebook.email,
      facebookData : {
        fbAuthData,
        fbInfo,
        authData,
      },
    }).then(()=>{
      loginUser(fbInfo, fbAuthData, authData, key);
    })
  }
  checkUser(fbInfo, fbAuthData) {
    const { createUser, loginUser } = this;
    ref.authWithOAuthToken('facebook', fbAuthData.credentials.token, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        // Find if user exists
        ref.child('userData')
          .orderByChild('fbId')
          .equalTo(authData[authData.auth.provider].id)
          .once('value', function (dataSnapshot) {
            if (dataSnapshot.val()) {
              loginUser(fbInfo, fbAuthData, authData, Object.keys(dataSnapshot.val())[0]);
            } else {
              createUser(fbInfo, fbAuthData, authData);
            }
          }, function (error) {
            console.log(error);
          });
      }
    });
  }
  render() {
    const _this = this;
    const props = { ...this.props };
    return (
      <FBLogin
          loginBehavior={FBLoginManager.LoginBehaviors.Web}
          onCancel={function(){
            console.log('User cancelled.')
          }}
          onError={function(data){
            console.log('ERROR')
            console.log(data)
          }}
          onLogin={function(data){
            console.log('Logged in!')
            console.log(data)
            // _this.setState({ user : data.credentials, fbLoading: true });
            fetch(`https://graph.facebook.com/me?access_token=${data.credentials.token}`)
              .then(response => response.json())
              .then(json => _this.checkUser(json, data))
              .catch(error => console.log(error));
          }}
          onLoginFound={function(data){
            // _this.setState({ user : data.credentials, fbLoading: true });
            fetch(`https://graph.facebook.com/me?access_token=${data.credentials.token}`)
              .then(response => response.json())
              .then(json => _this.checkUser(json, data))
              .catch(error => console.log(error));
          }}
          onLoginNotFound={function(){
            console.log('No user logged in.')
            props.logOut();
            // _this.setState({ user : null })
          }}
          onLogout={function(){
            console.log('Logged out.')
            props.logOut();
          }}
          onPermissionsMissing={function(data){
            console.log('Check permissions!')
            console.log(data)
          }}
          permissions={['email', 'public_profile', 'user_friends']}
          style={{ marginBottom: 10 }}
      />
    )
  }
}

export default connect(mapStateToProps, accountActions)(Login)
