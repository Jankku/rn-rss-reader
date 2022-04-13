import ItemDivider from '../ItemDivider';
import { render } from 'testutils';

describe('Test ItemDivider', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<ItemDivider />);
    expect(toJSON()).toMatchSnapshot();
  });
});
