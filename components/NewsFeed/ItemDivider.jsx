import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

function ItemDivider() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return <View style={styles.divider}></View>;
}

const makeStyles = (colors) =>
  StyleSheet.create({
    divider: {
      backgroundColor: colors.border,
      height: 1,
    },
  });

export default memo(ItemDivider);
