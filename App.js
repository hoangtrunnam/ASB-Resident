/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, TextInput, Platform} from 'react-native';

import {sagaMiddleware, store} from './src/redux/store';
import MainApp from './src/navigation/switch';
import rootSaga from './src/redux/sagas';
import {Provider} from 'react-redux';
import * as NavigationService from './src/navigation/navigateService';
import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  async componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={store}>
        <MainApp
          ref={nav => {
            this.navigator = nav;
            NavigationService.setNavigator(nav);
          }}
        />
      </Provider>
    );
  }
}
sagaMiddleware.run(rootSaga);
export default codePush(codePushOptions)(App);
