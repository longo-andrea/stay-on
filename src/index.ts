import {Feed} from "./feed/Feed";

export default class StayOn {
  private feeds: Feed[];

  constructor() {
    this.feeds = [];
  }

  /**
   * @description
   * Return feeds list
   * @return {Feed[]} return feeds list
   */
  public getFeeds(): Feed[] {
    return this.feeds;
  }

  /**
   * @description
   * Return feeds which contains given title
   * @param {string} title which represents feed's title to search
   */
  public getFeedsByTitle(title: string): Feed[] {
    return this.feeds.filter((feed) => feed.getTitle().includes(title));
  }

  /**
   * @description
   * Add given feed and return feeds list
   * @param {string} feedUrl which represents feed's url
   * @return {Promise<Feed[]> | never} an array which contains all feeds
   */
  public async addFeed(feedUrl: string): Promise<Feed[]> | never {
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
  public async addFeeds(feedsUrl: string[]): Promise<Feed[]> | never {
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
  public removeFeedByTitle(title: string): Feed[] {
    this.feeds = this.feeds.filter((feed) => feed.getTitle() !== title);

    return this.feeds;
  }

  /**
   * @description
   * Returns currend feed list in a stringified form
   * @returns {string} current feed list in a stringified form
   */
  public stringify(): string {
    let stringifiedFeedList = "";

    this.feeds.forEach((feed) => {
      stringifiedFeedList += `${feed.stringifyFeed()},,`;
    });

    return stringifiedFeedList;
  }

  /**
   * @description
   * Builds a feed list from given string
   * @param {string} stringifiedStayOn which represents feed list in stringified a form
   * @returns {Promise<StayOn>} rebuilded feed list
   */
  public static async buildFromString(stringifiedStayOn: string): Promise<StayOn> {
    // split all stringified feeds
    let feedsString = stringifiedStayOn.split(",,");
    feedsString.pop();// remove the last element of parsed string because it's empty

    const rebuildedStayOn = new StayOn();
 
    // split all stringified feeds to get only the url
    feedsString = feedsString.map((feed) => feed.split("url:")[1]);

    await rebuildedStayOn.addFeeds(feedsString);

    return rebuildedStayOn;
  }
};