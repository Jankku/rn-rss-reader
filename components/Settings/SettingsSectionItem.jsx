import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';

function SettingsSectionItem({ onPress, children }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 16,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {children}
    </Pressable>
  );
}

export default SettingsSectionItem;
