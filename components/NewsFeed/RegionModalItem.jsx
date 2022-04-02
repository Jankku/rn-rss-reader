import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, Pressable, StyleSheet } from 'react-native';
import { stringOrPlaceholder } from '../../utils/stringutils';

function RegionModalItem({ name, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Pressable android_ripple={styles.pressable} onPress={onPress}>
      <Text style={styles.text}>{stringOrPlaceholder(name)}</Text>
    </Pressable>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    pressable: { color: colors.border },
    text: {
      color: colors.text,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
  });

export default memo(RegionModalItem);
