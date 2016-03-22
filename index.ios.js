/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { AppRegistry, Navigator } from 'react-native';
import Splash from './views/Splash';
import configureStore from './components/Redux/configureStore';
const __DEBUG__ = true;
const store = configureStore({}, __DEBUG__);

class SalsApp extends React.Component {
  _renderScene(route, navigator) {
    const Component = route.component
    return (
      <Component
          {...route.props}
          navigator={navigator}
          route={route}
          store={store}
      />
    )
  }
  render() {
    return (
      <Navigator
          initialRoute={{
            component: Splash,
            type: 'right',
          }}
          renderScene={this._renderScene}
      />
    )
  }
}


AppRegistry.registerComponent('SalsApp', () => SalsApp);
