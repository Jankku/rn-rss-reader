import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ArticleShareButton({ onPress, color, style }) {
  return (
    <Pressable style={style} onPress={onPress}>
      <Ionicons name={'share-social'} size={24} color={color} />
    </Pressable>
  );
}

export default ArticleShareButton;
