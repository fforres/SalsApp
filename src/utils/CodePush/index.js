import codePush from 'react-native-code-push';
const UpdateApp = function UpdateApp() {
/*
│ Production │ _lVOTx5BGXQlajr9ww5BMG_F4lUzVk-qXl-Ax │
├────────────┼───────────────────────────────────────┤
│ Staging    │ 7-QhqX6t20pIdygKw1rAJnPn_fETVk-qXl-Ax │
*/
/*
  codePush.checkForUpdate()
  .then((update) => {
    if (!update) {
      console.log('The app is up to date!');
    } else {
      codePush.sync({
        deploymentKey: '7-QhqX6t20pIdygKw1rAJnPn_fETVk-qXl-Ax',
        minimumBackgroundDuration: 60 * 5,
        installMode: codePush.InstallMode.ON_NEXT_RESUME,
      });
    }
  });
*/
}


export default UpdateApp;
