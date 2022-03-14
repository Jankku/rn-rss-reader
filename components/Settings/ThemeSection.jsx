import { useContext } from 'react';
import { View, Switch, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SettingsSectionHeader from './SettingsSectionHeader';
import SettingsSectionItem from './SettingsSectionItem';
import { ThemeContext } from '../../context/ThemeContext';

function ThemeSection() {
  const { colors } = useTheme();
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <SettingsSectionHeader title={'Theme'} />
      <SettingsSectionItem>
        <Ionicons name={'sunny'} size={24} color={colors.text} style={{ paddingEnd: 16 }} />
        <View style={{ alignItems: 'baseline' }}>
          <Text style={{ color: colors.text }}>Dark mode {isDark ? 'enabled' : 'disabled'}</Text>
          <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary} />
        </View>
      </SettingsSectionItem>
    </>
  );
}

export default ThemeSection;
