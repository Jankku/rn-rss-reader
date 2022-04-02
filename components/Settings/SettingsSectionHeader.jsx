import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

function SettingsSectionHeader({ title }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return <Text style={styles.title}>{title}</Text>;
}

const makeStyles = (colors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: '700',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
  });

export default SettingsSectionHeader;
