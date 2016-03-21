/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, { AppRegistry, Navigator } from 'react-native';
import Splash from './components/Splash';

class SalsApp extends React.Component {
  _renderScene(route, navigator) {
    const Component = route.component
    return (
      <Component
          {...route.props}
          navigator={navigator}
          route={route}
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
