import { useTheme } from '@react-navigation/native';
import { Text } from 'react-native';

function ListEmptyComponent({ text }) {
  const { colors } = useTheme();

  return (
    <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700', textAlign: 'center' }}>
      {text}
    </Text>
  );
}

export default ListEmptyComponent;
