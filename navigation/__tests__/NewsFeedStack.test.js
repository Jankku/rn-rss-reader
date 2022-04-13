import NewsFeedStack from '../NewsFeedStack';
import { render, waitFor } from 'testutils';

describe('Test NewsFeedStack', () => {
  test('Should render NewsFeed', async () => {
    const navigation = { setOptions: () => {} };
    const { getByText } = render(<NewsFeedStack navigation={navigation} route={'NewsFeed'} />);
    await waitFor(() => expect(getByText('Kotimaa')).toBeDefined());
  });

  test('Should call setOptions to show bottom tab navigation bar', async () => {
    const setOptions = jest.fn();
    const navigation = { setOptions };
    render(<NewsFeedStack navigation={navigation} route={'NewsFeed'} />);
    expect(setOptions).toHaveBeenCalledTimes(1);
  });
});
