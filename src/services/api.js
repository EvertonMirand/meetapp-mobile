import axios from 'axios';
import { Platform } from 'react-native';

const baseURL =
  Platform.OS === 'android'
    ? 'http://10.0.0.100:3333'
    : 'http://localhost:3333';

const api = axios.create({
  baseURL,
});

export default api;
