import SavedArticlesScreen from '../SavedArticlesScreen';
import { render } from 'testutils';

describe('Test SavedArticlesScreen', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <SavedArticlesScreen navigation={{ navigate: () => {}, setOptions: () => {} }} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
