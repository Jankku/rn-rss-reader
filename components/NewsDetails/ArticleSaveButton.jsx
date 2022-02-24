import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ArticleSaveButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={'star-outline'} size={24} color={'#FFFFFF'} />
    </Pressable>
  );
}

export default ArticleSaveButton;
