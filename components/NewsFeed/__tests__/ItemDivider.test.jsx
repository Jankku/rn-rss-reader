import ItemDivider from '../ItemDivider';
import { render } from '@testing-library/react-native';

describe('Test ItemDivider', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<ItemDivider />);
    expect(toJSON()).toMatchSnapshot();
  });
});
