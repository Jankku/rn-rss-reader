import ListEmptyComponent from '../ListEmptyComponent';
import { render } from 'testutils';

describe('Test ListEmptyComponent', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<ListEmptyComponent text={'Text'} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
