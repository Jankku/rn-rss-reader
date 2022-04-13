import NewsDetailScreen from '../NewsDetailScreen';
import { render } from 'testutils';

const articleData = {
  category: ['Category1', 'Category2', 'Category3'],
  description: 'This is a description.',
  encoded: 'Test',
  guid: {
    '#text': 'https://example.com',
    isPermaLink: 'false',
  },
  link: 'https://example.com',
  pubDate: 'Fri, 08 Apr 2022 09:19:43 +0300',
  title: 'This is a title.',
};

jest.mock('../../data/FeedController', () => {
  return {
    findItemById: jest.fn().mockImplementation(() => articleData),
  };
});

describe('Test NewsDetailScreen', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <NewsDetailScreen
        navigation={{ navigate: () => {}, setOptions: () => {} }}
        route={{ params: { guid: 'https://yle.fi/uutiset/3-12345678' } }}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
