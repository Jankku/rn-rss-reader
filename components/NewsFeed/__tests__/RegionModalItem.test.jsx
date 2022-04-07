import RegionModalItem from '../RegionModalItem';
import { render, fireEvent } from '@testing-library/react-native';

describe('Test RegionModalItem', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<RegionModalItem name={'North Ostrobothnia'} onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Should call onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<RegionModalItem name={'North Ostrobothnia'} onPress={onPress} />);
    const item = getByText('North Ostrobothnia');

    fireEvent.press(item);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
