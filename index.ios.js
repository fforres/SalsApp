/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { AppRegistry, View } from 'react-native';
import configureStore from './src/utils/Redux/configureStore';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Codepush from './src/utils/CodePush';

import Splash from './src/views/Splash';
import Menu from './src/views/Menu';
import Tickets from './src/views/Tickets';
import Login from './src/views/Login';
import Home from './src/views/Home';
import Venue from './src/views/Venue';
import Notifications from './src/utils/Notifications';

Codepush();
const __DEBUG__ = true;
const store = configureStore({}, __DEBUG__);
const scenes = Actions.create(
  <Scene hideNavBar key="root" >
    <Scene component={Splash} initial key="splash" store={store} title="Splash" />
    <Scene component={Login} key="login" store={store} title="Login" type="replace"/>
    <Scene component={Home} direction="horizontal" key="home" store={store} title="Locales" type="replace"/>
    <Scene component={Venue} direction="horizontal" key="venue" store={store} />
    <Scene component={Tickets} direction="vertical" key="tickets" store={store} />
    <Scene component={Menu} direction="vertical" key="menu" store={store} />
  </Scene>
);
///

class SalsApp extends React.Component {
  componentWillMount(){
  }
  render(){
    return (
      <View
          style={{
            top:0,
            left:0,
            right:0,
            bottom:0,
            position: 'absolute',
          }}
      >
        <Router hideNavBar scenes={scenes}/>
        <Notifications store={store}/>
      </View>
    )
  }
}

AppRegistry.registerComponent('SalsApp', () => SalsApp);
