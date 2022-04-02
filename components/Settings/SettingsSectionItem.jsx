import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';

function SettingsSectionItem({ onPress, children }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {children}
    </Pressable>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 16,
    },
  });

export default SettingsSectionItem;
