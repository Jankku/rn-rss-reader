import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

function SettingsSectionItem({ title, value, link, icon }) {
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
    if (link) openBrowserAsync(link);
  };

  return (
    <Pressable onPress={openLink} style={styles.container}>
      <Ionicons name={icon ?? null} size={24} color={'#000000'} style={styles.icon} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </Pressable>
  );
}

export default SettingsSectionItem;
