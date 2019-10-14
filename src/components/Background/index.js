import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/themes/Colors';

export default styled(LinearGradient).attrs({
  colors: [Colors.backgroundPrimary, Colors.backgroundSecundary],
})`
  flex: 1;
`;
