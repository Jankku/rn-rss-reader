import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, Pressable } from 'react-native';
import { stringOrPlaceholder } from '../../utils/stringutils';

function RegionModalItem({ name, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable android_ripple={{ color: colors.border }} onPress={onPress}>
      <Text
        style={{
          color: colors.text,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        {stringOrPlaceholder(name)}
      </Text>
    </Pressable>
  );
}

export default memo(RegionModalItem);
