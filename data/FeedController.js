import { YLE_FEEDS_BASE_URL } from '@env';
import { XMLParser } from 'fast-xml-parser';
import { RFC2822ToDateTime } from '../utils/dateutils';

const FeedController = {
  parser: new XMLParser({
    ignoreDeclaration: true,
    ignoreAttributes: false,
    attributeNamePrefix: '',
    removeNSPrefix: true,
  }),

  /**
   * RSS feed response
   */
  feed: {},

  /**
   * @param {string} id Feed ID
   */
  async getFeedById(id) {
    const response = await fetch(
      `${YLE_FEEDS_BASE_URL}/recent.rss?publisherIds=YLE_UUTISET&concepts=${id}`
    );
    const feedText = await response.text();
    const feedObj = this.parser.parse(feedText, true);
    this.feed = feedObj;
    return feedObj;
  },

  /**
   * @param {string} guid - Item ID
   * @returns {object} News item
   */
  findItemById(guid) {
    const item = this.feed.rss.channel.item.filter((item) => item.guid['#text'] === guid)[0];
    if (item.encoded === undefined) return item;

    return this.itemToDisplayItem(item);
  },

  /**
   * @param {object} item - News item
   */
  itemToDisplayItem(item) {
    const copy = { ...item };
    copy.pubDate = RFC2822ToDateTime(copy.pubDate);
    copy.encoded = `<h2>${copy.title}</h2><h4>${copy.description}</h4><p>${copy.pubDate}</p>${copy.encoded}`;
    copy.encoded = String(copy.encoded).split(`src="//`).join('src="https://');
    return copy;
  },
};

export default FeedController;
