import { Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
  const configure =
    Platform.OS === 'android'
      ? {
          host: '10.0.0.100',
        }
      : undefined;
  const tron = Reactotron.configure(configure)
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
