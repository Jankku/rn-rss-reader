import { YLE_FEEDS_URL } from '@env';
import { XMLParser } from 'fast-xml-parser';
import data from './data';

const FeedController = {
  parser: new XMLParser({
    ignoreDeclaration: true,
    ignoreAttributes: false,
    attributeNamePrefix: '',
    removeNSPrefix: true,
  }),

  /**
   * RSS feed repsponse
   */
  feed: {},

  /**
   * @param {string} id Feed ID
   */
  async getFeedById(id) {
    if (__DEV__) {
      const feedObj = this.parser.parse(data, true);
      this.feed = feedObj;
      return feedObj;
    }

    const response = await fetch(`${YLE_FEEDS_URL}?publisherIds=YLE_UUTISET&concepts=${id}`);
    const feedText = await response.text();
    const feedObj = this.parser.parse(feedText, true);
    this.feed = feedObj;
    return feedObj;
  },

  /**
   * @param {string} guid Item ID
   * @returns {object} News item
   */
  findItemById(guid) {
    const item = this.feed.rss.channel.item.filter((item) => item.guid['#text'] === guid)[0];

    if (item.encoded === undefined) return item;

    const copy = { ...item };
    copy.encoded = `<h2>${copy.title}</h2><h4>${copy.description}</h4>${copy.encoded}`;
    copy.encoded = String(copy.encoded).split(`src="//`).join('src="https://');
    return copy;
  },
};

export default FeedController;
