/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { AppRegistry } from 'react-native';
import configureStore from './src/utils/Redux/configureStore';
import { Actions, Scene, Router } from 'react-native-router-flux';

import Splash from './src/views/Splash';
import Login from './src/views/Login';
import Home from './src/views/Home';
import Venue from './src/views/Venue';

const __DEBUG__ = true;
const store = configureStore({}, __DEBUG__);

const scenes = Actions.create(
  <Scene hideNavBar key="root" >
      <Scene component={Splash} key="splash" store={store} />
      <Scene component={Login} key="login" store={store} />
      <Scene component={Home}  direction="horizontal" key="home" store={store} title="Locales" type="replace"/>
      <Scene component={Venue}  direction="horizontal" key="venue" store={store} />
  </Scene>
);
///

class SalsApp extends React.Component {
  render(){
    return <Router hideNavBar scenes={scenes}/>
  }
}

AppRegistry.registerComponent('SalsApp', () => SalsApp);
