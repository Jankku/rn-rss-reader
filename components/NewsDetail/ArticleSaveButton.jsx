import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ArticleSaveButton({ isSaved, onPress, color }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={24} color={color} />
    </Pressable>
  );
}

export default ArticleSaveButton;
