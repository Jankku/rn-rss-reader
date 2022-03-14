import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';

function SettingsSectionItem({ onPress, children }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
    },
    icon: {
      paddingEnd: 16,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    value: {
      color: colors.text,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {children}
    </Pressable>
  );
}

export default SettingsSectionItem;
