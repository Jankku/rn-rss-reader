import SavedArticleStack from '../SavedArticleStack';
import { render, waitFor } from 'testutils';

describe('Test SavedArticleStack', () => {
  test('Should render SavedArticleFeed', async () => {
    const navigation = { setOptions: () => {} };

    const { getByText } = render(
      <SavedArticleStack navigation={navigation} route={'SavedArticleFeed'} />
    );

    await waitFor(() => expect(getByText('Save some articles')).toBeDefined());
  });

  test('Should call setOptions to show bottom tab navigation bar', async () => {
    const setOptions = jest.fn();
    const navigation = { setOptions };
    render(<SavedArticleStack navigation={navigation} route={'SavedArticleFeed'} />);
    expect(setOptions).toHaveBeenCalledTimes(1);
  });
});
