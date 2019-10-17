import { Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
  const configure =
    Platform.OS === 'android'
      ? {
          host: '172.18.108.40',
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
