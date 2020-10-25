import { Feed } from "./feed/Feed";
export default class {
    private feeds;
    constructor();
    /**
     * @description
     * Return feeds list
     * @return {Feed[]} return feeds list
     */
    getFeeds(): Feed[];
    /**
     * @description
     * Add given feed and return feeds list
     * @param {string} feedUrl which represents feed's url
     * @return {Promise<Feed[]> | never} an array which contains all feeds
     */
    addFeed(feedUrl: string): Promise<Feed[]> | never;
    /**
     * @description
     * Add given feeds and return feeds list
     * @param {string[]} feedsUrl which represents feeds url
     * @returns {Promise<Feed[]> | never} an array which contains all feeds
     */
    addFeeds(feedsUrl: string[]): Promise<Feed[]> | never;
    /**
     * @description
     * Removes feed with given title
     * @param {string} title which represents feed to remove
     * @returns {Feed[]} which contains current feed list
     */
    removeFeedByTitle(title: string): Feed[];
}
