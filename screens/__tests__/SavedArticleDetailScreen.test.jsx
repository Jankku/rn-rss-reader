import SavedArticleDetailScreen from '../SavedArticleDetailScreen';
import { render } from 'testutils';

describe('Test SavedArticleDetailScreen', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <SavedArticleDetailScreen
        navigation={{ navigate: () => {}, setOptions: () => {} }}
        route={{ params: { guid: 'https://yle.fi/uutiset/3-12345678' } }}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
