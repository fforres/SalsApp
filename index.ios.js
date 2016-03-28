/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { AppRegistry } from 'react-native';
import configureStore from './src/utils/Redux/configureStore';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Codepush from './src/utils/CodePush';

import Splash from './src/views/Splash';
import Menu from './src/views/Menu';
import Profile from './src/views/Profile';
import Entradas from './src/views/Entradas';
import Login from './src/views/Login';
import Home from './src/views/Home';
import Venue from './src/views/Venue';

Codepush();
const __DEBUG__ = true;
const store = configureStore({}, __DEBUG__);

const scenes = Actions.create(
  <Scene hideNavBar key="root" >
    <Scene component={Splash} initial key="splash" store={store} title="Splash" />
    <Scene component={Login} key="login" store={store} title="Login" type="replace"/>
    <Scene component={Home} direction="horizontal" key="home" store={store} title="Locales" type="replace"/>
    <Scene component={Venue} direction="horizontal" key="venue" store={store} />
    <Scene component={Entradas} direction="vertical" key="entradas" store={store} />
    <Scene component={Menu} direction="vertical" key="menu" store={store} />
    <Scene component={Profile} direction="vertical" key="profile" store={store} />
  </Scene>
);
///

class SalsApp extends React.Component {
  componentWillMount(){
  }
  render(){
    return <Router hideNavBar scenes={scenes}/>
  }
}

AppRegistry.registerComponent('SalsApp', () => SalsApp);
