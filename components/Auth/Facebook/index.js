import React from 'react-native';
import FBLogin from 'react-native-facebook-login';
import { FBLoginManager } from 'NativeModules';
import ref from '../../FireBase';

class Login extends React.Component {
  componentDidMount(){
    console.log(FBLoginManager);
  }
  checkUser(fbInfo, authData) {
    const context = this;
    context.setState({fbAuthData: authData, fbInfo});
    ref.authWithOAuthToken('facebook', authData.credentials.token, function(error, authData) {
      debugger;
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });

    /*
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', fbInfo.email);
    query.find({
      success: function(user) {
        if(user.length > 0) {
          if(!Parse.FacebookUtils.isLinked(user[0])) {
            context.setState({fbLoading: false});
            Alert.displayIOS('Hey!', 'There is already an account with your ' +
            'same email address. Please login using your credentials to link them.', false);
          } else {
            context.fbLogin(false);
          }
        } else {
          context.fbLogin(true);
        }
      }
    });
    */

  }
  render() {
    const _this = this;
    return (
      <FBLogin
          loginBehavior={FBLoginManager.LoginBehaviors.SystemAccount}
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
            fetch('https://graph.facebook.com/me?access_token=' + data.credentials.token)
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

export default Login
