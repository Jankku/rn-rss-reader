import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function RegionMenuButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={'funnel'} size={24} color={'#FFFFFF'} />
    </Pressable>
  );
}

export default RegionMenuButton;