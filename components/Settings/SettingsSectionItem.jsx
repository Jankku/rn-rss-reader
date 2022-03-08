import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

function SettingsSectionItem({ item }) {
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

  const openLink = () => {
    if (item.link) openBrowserAsync(link);
  };

  return (
    <Pressable onPress={openLink} style={styles.container}>
      <Ionicons name={item.icon} size={24} color={colors.text} style={styles.icon} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    </Pressable>
  );
}

export default SettingsSectionItem;
