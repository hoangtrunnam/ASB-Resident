/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import bgMessaging from './src/firebase/bgMessaging';
AppRegistry.registerComponent(appName, () => App);
// New task registration
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging,
);
