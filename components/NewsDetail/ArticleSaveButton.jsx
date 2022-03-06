import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ArticleSaveButton({ isSaved, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={isSaved ? 'star' : 'star-outline'} size={24} color={'#FFFFFF'} />
    </Pressable>
  );
}

export default ArticleSaveButton;
