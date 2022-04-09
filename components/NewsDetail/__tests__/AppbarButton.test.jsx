import AppbarButton from '../AppbarButton';
import { render, fireEvent } from '../../../utils/testutils';

describe('Test AppbarButton', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <AppbarButton icon={'globe'} onPress={() => {}} style={{ marginHorizontal: 5 }} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('Should call onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AppbarButton icon={'globe'} onPress={onPress} style={{ marginHorizontal: 5 }} />
    );
    const button = getByTestId('AppbarButton');

    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
