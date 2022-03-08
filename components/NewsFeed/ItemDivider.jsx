import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';

function ItemDivider() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
      }}
    ></View>
  );
}

export default memo(ItemDivider);
