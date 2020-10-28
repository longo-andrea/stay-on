import {Feed} from "./feed/Feed";

export default class {
  private feeds: Feed[];

  constructor() {
    this.feeds = [];
  }

  /**
   * @description
   * Return feeds list
   * @return {Feed[]} return feeds list
   */
  getFeeds(): Feed[] {
    return this.feeds;
  }

  /**
   * @description
   * Return feeds which contains given title
   * @param {string} title which represents feed's title to search
   */
  getFeedsByTitle(title: string): Feed[] {
    return this.feeds.filter((feed) => feed.getTitle() === title);
  }

  /**
   * @description
   * Add given feed and return feeds list
   * @param {string} feedUrl which represents feed's url
   * @return {Promise<Feed[]> | never} an array which contains all feeds
   */
  async addFeed(feedUrl: string): Promise<Feed[]> | never {
    try {
      await Feed.validateFeed(feedUrl);

      const feed = new Feed(feedUrl);
      await feed.parseFeed();

      this.feeds.push(feed);

      return this.feeds;
    }
    catch(error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description
   * Add given feeds and return feeds list
   * @param {string[]} feedsUrl which represents feeds url
   * @returns {Promise<Feed[]> | never} an array which contains all feeds
   */
  async addFeeds(feedsUrl: string[]): Promise<Feed[]> | never {
    try {
      const feeds = feedsUrl.map(async (feedUrl) => {
        await this.addFeed(feedUrl);
      });

      await Promise.all(feeds);

      return this.feeds;
    } catch(error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description
   * Removes feed with given title
   * @param {string} title which represents feed to remove
   * @returns {Feed[]} which contains current feed list
   */
  removeFeedByTitle(title: string): Feed[] {
    this.feeds = this.feeds.filter((feed) => feed.getTitle() !== title);

    return this.feeds;
  }
};