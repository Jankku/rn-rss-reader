import RegionMenuButton from '../RegionMenuButton';
import { render, fireEvent } from '../../../utils/testutils';

describe('Test RegionMenuButton', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<RegionMenuButton onPress={() => {}} color={'#000'} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Should call onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<RegionMenuButton onPress={onPress} color={'#000'} />);
    const button = getByTestId('RegionMenuButton');

    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
