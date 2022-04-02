import { useTheme } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';

function ListEmptyComponent({ text }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return <Text style={styles.text}>{text}</Text>;
}

const makeStyles = (colors) =>
  StyleSheet.create({
    text: { color: colors.text, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  });

export default ListEmptyComponent;
