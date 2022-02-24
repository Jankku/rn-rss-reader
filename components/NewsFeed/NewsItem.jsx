import { useTheme } from '@react-navigation/native';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import { stringOrPlaceholder } from '../../utils/stringutils';

function NewsItem({ title, description, imageUrl, onPress }) {
  const { colors, dark } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 16,
          width: Dimensions.get('window').width,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontWeight: '700' }}>{stringOrPlaceholder(title)}</Text>
          <Text style={{ color: colors.text }}>{stringOrPlaceholder(description)}</Text>
        </View>
        <View style={{ paddingLeft: 4 }}>
          <Image
            resizeMode="cover"
            style={{
              backgroundColor: `rgba(${dark ? '255, 255, 255' : '0, 0, 0'}, 0.1)`,
              width: 100,
              height: 100,
              marginTop: 6,
              marginLeft: 4,
              borderRadius: 8,
            }}
            source={{ uri: imageUrl }}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default NewsItem;
