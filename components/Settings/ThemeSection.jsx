import { useContext } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SettingsSectionHeader from './SettingsSectionHeader';
import SettingsSectionItem from './SettingsSectionItem';
import { ThemeContext } from '../../context/ThemeContext';

function ThemeSection() {
  const { colors } = useTheme();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const styles = makeStyles(colors);

  return (
    <>
      <SettingsSectionHeader title={'Theme'} />
      <SettingsSectionItem>
        <View style={styles.container}>
          <Ionicons name={'sunny'} size={24} color={colors.text} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Dark mode</Text>
            <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary} />
          </View>
        </View>
      </SettingsSectionItem>
    </>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: { paddingEnd: 16 },
    text: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    textContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
  });

export default ThemeSection;
