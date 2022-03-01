import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

function SettingsSectionHeader({ title }) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
        paddingVertical: 8,
        paddingHorizontal: 16,
      }}
    >
      {title}
    </Text>
  );
}

export default SettingsSectionHeader;
