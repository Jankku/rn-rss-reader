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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name={'sunny'} size={24} color={colors.text} style={{ paddingEnd: 16 }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
          >
            <Text style={{ color: colors.text }}>Dark mode</Text>
            <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary} />
          </View>
        </View>
      </SettingsSectionItem>
    </>
  );
}

export default ThemeSection;
