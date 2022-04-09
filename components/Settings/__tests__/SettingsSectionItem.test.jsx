import { Text } from 'react-native';
import SettingsSectionItem from '../SettingsSectionItem';
import { render, fireEvent } from '../../../utils/testutils';

describe('Test SettingsSectionItem', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <SettingsSectionItem onPress={() => {}}>
        <Text>Theme</Text>
      </SettingsSectionItem>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Should call onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SettingsSectionItem onPress={onPress}>
        <Text>Theme</Text>
      </SettingsSectionItem>
    );
    const item = getByText('Theme');

    fireEvent.press(item);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
