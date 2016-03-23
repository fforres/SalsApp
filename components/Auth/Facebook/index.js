import React from 'react-native';
import FBLogin from 'react-native-facebook-login';
import { FBLoginManager } from 'NativeModules';
import ref from '../../FireBase';

import { connect } from 'react-redux';
import { actions as accountActions } from '../../Redux/modules/account';
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.account.loggedIn,
    userData: state.account.userData,
  };
};

class Login extends React.Component {
  componentDidMount(){
  }
  checkUser(fbInfo, fbAuthData) {
    const props = { ...this.props };
    ref.authWithOAuthToken('facebook', fbAuthData.credentials.token, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        // Creating a new user
        const newRef = ref.child('userData').push();
        // Obtaining user new key
        const key = newRef.key();
        // Saving user data
        newRef.set({
          fbAuthData,
          fbInfo,
          authData,
        }).then(()=>{
          // logging in user locally
          props.logIn({
            fbAuthData,
            fbInfo,
            authData,
            Id:key,
          });
          Actions.pop();
        })
        console.log('Authenticated in FireBase successfully with payload:', authData);
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
            _this.setState({ user : data.credentials, fbLoading: true });
            fetch(`https://graph.facebook.com/me?access_token=${data.credentials.token}`)
              .then(response => response.json())
              .then(json => _this.checkUser(json, data))
              .catch(error => console.log(error));
          }}
          onLoginFound={function(data){
            _this.setState({ user : data.credentials, fbLoading: true });
            fetch(`https://graph.facebook.com/me?access_token=${data.credentials.token}`)
              .then(response => response.json())
              .then(json => _this.checkUser(json, data))
              .catch(error => console.log(error));
          }}
          onLoginNotFound={function(){
            console.log('No user logged in.')
            props.logOut();
            _this.setState({ user : null })
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
