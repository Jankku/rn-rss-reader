import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function RegionMenuButton({ onPress, color }) {
  return (
    <Pressable onPress={onPress} testID="RegionMenuButton">
      <Ionicons name={'funnel'} size={24} color={color} />
    </Pressable>
  );
}

export default RegionMenuButton;
