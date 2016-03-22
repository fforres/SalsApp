import React from 'react-native';
import FBLogin from 'react-native-facebook-login';
import { FBLoginManager } from 'NativeModules';
import ref from '../../FireBase';

import { connect } from 'react-redux';
import { actions as accountActions } from '../../Redux/modules/account';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedIn: state.account.loggedIn,
    userData: state.account.userData,
  };
};

class Login extends React.Component {
  componentDidMount(){
    console.log(FBLoginManager);
  }
  checkUser(fbInfo, fbAuthData) {
    const props = { ...this.props };
    ref.authWithOAuthToken('facebook', fbAuthData.credentials.token, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        const newRef = ref.child('userData').push();
        const key = newRef.key();
        newRef.set({
          fbAuthData,
          fbInfo,
          authData,
        }).then(()=>{
          props.logIn({
            fbAuthData,
            fbInfo,
            authData,
            Id:key,
          });
        })
        console.log('Authenticated in FireBase successfully with payload:', authData);
      }
    });
  }
  render() {
    const _this = this;
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
            console.log('Existing login found.')
            console.log(data)
            _this.setState({ user : data.credentials })
          }}
          onLoginNotFound={function(){
            console.log('No user logged in.')
            _this.setState({ user : null })
          }}
          onLogout={function(){
            console.log('Logged out.')
            _this.setState({ user : null })
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
