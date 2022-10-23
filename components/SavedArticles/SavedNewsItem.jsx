import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import { stringOrPlaceholder } from '../../utils/stringutils';
import { RFC2822ToDateTime } from '../../utils/dateutils';

function SavedNewsItem({ title, description, imageUrl, pubDate, onPress }) {
  const { colors, dark } = useTheme();
  const styles = makeStyles(colors, dark);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.background : colors.card,
      })}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{stringOrPlaceholder(title)}</Text>
          <Text style={styles.description}>{stringOrPlaceholder(description)}</Text>
          <Text style={styles.date}>{stringOrPlaceholder(RFC2822ToDateTime(pubDate))}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image resizeMode="cover" style={styles.image} source={{ uri: imageUrl }} />
        </View>
      </View>
    </Pressable>
  );
}

const makeStyles = (colors, dark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 16,
      width: Dimensions.get('window').width,
    },
    date: { color: colors.text, fontSize: 12 },
    description: { color: colors.text, paddingBottom: 6 },
    image: {
      backgroundColor: `rgba(${dark ? '255, 255, 255' : '0, 0, 0'}, 0.1)`,
      borderRadius: 8,
      height: 100,
      marginLeft: 4,
      marginTop: 6,
      width: 100,
    },
    imageContainer: { paddingLeft: 4 },
    textContainer: { flex: 1 },
    title: { color: colors.text, fontWeight: '700', paddingBottom: 4 },
  });

export default memo(SavedNewsItem);
