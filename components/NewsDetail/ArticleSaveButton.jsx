import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ArticleSaveButton({ icon, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={icon} size={24} color={'#FFFFFF'} />
    </Pressable>
  );
}

export default ArticleSaveButton;
