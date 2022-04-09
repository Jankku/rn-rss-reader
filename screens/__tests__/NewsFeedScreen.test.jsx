import NewsFeedScreen from '../NewsFeedScreen';
import { render } from '../../utils/testutils';

const data = `<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
<channel>
<language>fi</language>
<title>News</title>
<description>News</description>
<link>https://example.com/</link>
<atom:link href="https://example.com" rel="self" type="application/rss+xml"/>
<category>Tuoreimmat uutiset</category>
<item>
<title>This is a title.</title>
<link>https://example.com</link>
<description>This is a description.</description>
<content:encoded>
Test
</content:encoded>
<pubDate>Fri, 08 Apr 2022 09:19:43 +0300</pubDate>
<category>Category1</category>
<category>Category2</category>
<category>Category3</category>
<guid isPermaLink="false">https://example.com</guid>
</item>
</channel>
</rss>`;

const rssFeed = {
  rss: {
    channel: {
      category: 'Tuoreimmat uutiset',
      description: 'News',
      item: {
        category: ['Category1', 'Category2', 'Category3'],
        description: 'This is a description.',
        encoded: 'This is article content.',
        guid: {
          '#text': 'https://example.com',
          isPermaLink: 'false',
        },
        link: 'https://example.com',
        pubDate: 'Fri, 08 Apr 2022 09:19:43 +0300',
        title: 'This is a title.',
      },
      language: 'fi',
      link: [
        'https://example.com/',
        {
          href: 'https://example.com',
          rel: 'self',
          type: 'application/rss+xml',
        },
      ],
      title: 'News',
    },
    version: '2.0',
  },
};

jest.mock('../../data/FeedController', () => {
  return {
    getFeedById: jest.fn().mockImplementation(() => rssFeed),
  };
});

describe('Test NewsFeedScreen', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <NewsFeedScreen navigation={{ navigate: () => {}, setOptions: () => {} }} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
