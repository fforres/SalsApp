import Auth0Lock from 'react-native-lock-ios';
import { actions as accountActions } from '../Redux/modules/account';
import { Actions } from 'react-native-router-flux';

const lock = new Auth0Lock({
  clientId: 'tCUdq4hDoaSbMu2EGxS42Rp0tqICgH6H',
  domain: 'fforres.auth0.com',
  integrations: {
    facebook: {
      permissions: ['email', 'public_profile', 'user_friends', 'user_likes', 'user_events', 'user_tagged_places'],
    },
    twitter: {
      api_key: '2yjZLycXgiNC5oe3NOuWGFMpb',
      api_secret: 'NXpFq5RI4RfsX4UGA0nowN1X0zITE4UbIERHLYMVKI17fj7AkX',
    },
  },
});

const auth0 = {}
auth0.logIn = function(store) {
  lock.show({
    closable: true,
  }, (err, profile, token) => {
    if (err) {
      console.log(err);
      return;
    }

    fetch('https://graph.facebook.com/v2.5/' + profile.identities[0].userId + '?fields=cover,first_name,name&access_token='+profile.identities[0].accessToken)
      .then(response => response.json())
      .then((json) => {
        if (!json.error) {
          profile.data = json;
          fetch('https://graph.facebook.com/v2.5/' + profile.identities[0].userId + '/picture?type=large&access_token='+profile.identities[0].accessToken)
          .then((response) => {
            console.log(response);
            if (response.ok) {
              profile.image = response.url;
              store.dispatch(accountActions.logIn({
                token,
                profile,
              }));
              console.log('Logged in with Auth0!');
              Actions.home();
            }
          })
        } else {
          console.log(json.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });


  });
}
auth0.logOut = function() {
  lock.logout();
}

export default auth0;
