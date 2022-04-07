import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

function AppbarButton({ icon, onPress, style }) {
  const { colors } = useTheme();

  return (
    <Pressable style={style} onPress={onPress} testID="AppbarButton">
      <Ionicons name={icon} size={24} color={colors.headerText} />
    </Pressable>
  );
}

export default AppbarButton;
